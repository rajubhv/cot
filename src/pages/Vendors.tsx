import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Plus, Edit, Trash2, Users, FileType, TrendingUp, Clock } from 'lucide-react'
import { mockVendors } from '../data/mockData'
import type { Vendor } from '../types/index'

function VendorCard({ vendor, onEdit, onDelete }: {
  vendor: Vendor
  onEdit: (vendor: Vendor) => void
  onDelete: (id: string) => void
}) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200'
      case 'Maintenance':
        return 'bg-orange-100 text-orange-800 border border-orange-200'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'DATA PROVIDER':
        return 'bg-blue-100 text-blue-800 border border-blue-200'
      case 'PAYMENT':
        return 'bg-green-100 text-green-800 border border-green-200'
      case 'ANALYTICS':
        return 'bg-purple-100 text-purple-800 border border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 98) return 'text-green-400'
    if (reliability >= 95) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="card-hover p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-600 to-secondary-700 shadow-soft">
            <span className="text-lg font-semibold text-white">
              {vendor.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
              {vendor.name}
            </h3>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(vendor.status)}`}>
                {vendor.status}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeStyle(vendor.type)}`}>
                {vendor.type}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(vendor)}
            className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-secondary-100/60 rounded-lg transition-all"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(vendor.id)}
            className="p-2 text-secondary-500 hover:text-danger-600 hover:bg-secondary-100/60 rounded-lg transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-4 w-4 text-primary-400 mr-1" />
            <span className="text-2xl font-bold text-secondary-900">{vendor.clients}</span>
          </div>
          <p className="text-xs text-secondary-500 font-medium">Clients</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <FileType className="h-4 w-4 text-secondary-500 mr-1" />
            <span className="text-2xl font-bold text-secondary-900">{vendor.feedTypes}</span>
          </div>
          <p className="text-xs text-secondary-500 font-medium">Feed Types</p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-secondary-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-secondary-700">
            <TrendingUp className="h-4 w-4 mr-2 text-primary-500" />
            <span className="text-sm font-medium">Reliability</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${getReliabilityColor(vendor.reliability)}`}>
              {vendor.reliability}%
            </span>
            <div className={`h-2 w-16 rounded-full bg-secondary-700`}>
              <div 
                className={`h-full rounded-full ${vendor.reliability >= 98 ? 'bg-success-500' : vendor.reliability >= 95 ? 'bg-warning-500' : 'bg-danger-500'}`}
                style={{ width: `${vendor.reliability}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-secondary-700">
            <Clock className="h-4 w-4 mr-2 text-secondary-500" />
            <span className="text-sm font-medium">Last Update</span>
          </div>
          <span className="text-sm font-semibold text-secondary-900">{vendor.lastUpdate}</span>
        </div>
      </div>
    </div>
  )
}

function AddVendorModal({ isOpen, onClose, onSave }: {
  isOpen: boolean
  onClose: () => void
  onSave: (vendor: Omit<Vendor, 'id'>) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'DATA PROVIDER',
    status: 'Active' as 'Active' | 'Inactive' | 'Maintenance'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      clients: 0,
      feedTypes: 0,
      reliability: 100,
      lastUpdate: 'Just added'
    })
    setFormData({ name: '', type: 'DATA PROVIDER', status: 'Active' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-secondary-900">Add New Vendor</h3>
            <button onClick={onClose} className="text-secondary-500 hover:text-secondary-900">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Vendor name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="DATA PROVIDER">DATA PROVIDER</option>
                <option value="PAYMENT">PAYMENT</option>
                <option value="ANALYTICS">ANALYTICS</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' | 'Maintenance' })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-secondary-600 hover:text-secondary-900 rounded-md hover:bg-secondary-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add Vendor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleEdit = (vendor: Vendor) => {
    console.log('Edit vendor:', vendor)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id))
    }
  }

  const handleAddVendor = (newVendor: Omit<Vendor, 'id'>) => {
    const id = (Math.max(...vendors.map(v => parseInt(v.id))) + 1).toString()
    setVendors([...vendors, { ...newVendor, id }])
  }

  return (
    <Layout 
      title="Vendors"
      subtitle="Manage your data vendors and monitor their performance"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-secondary-900">Vendor Management</h2>
            <p className="text-secondary-600 mt-1">Monitor vendor performance and reliability</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <AddVendorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddVendor}
        />
      </div>
    </Layout>
  )
}