import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Plus, Edit, Trash2, Mail, Phone, Activity, Clock } from 'lucide-react'
import { mockClients } from '../data/mockData'
import type { Client } from '../types/index'

function ClientCard({ client, onEdit, onDelete }: {
  client: Client
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
}) {
  const getStatusStyle = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 border border-green-200'
      : 'bg-gray-100 text-gray-800 border border-gray-200'
  }

  return (
    <div className="card-hover p-6 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-soft">
            <span className="text-lg font-semibold text-white">
              {client.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
              {client.name}
            </h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusStyle(client.status)}`}>
              {client.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(client)}
            className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-secondary-100/60 rounded-lg transition-all"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(client.id)}
            className="p-2 text-secondary-500 hover:text-danger-600 hover:bg-secondary-100/60 rounded-lg transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center text-sm text-secondary-700">
          <Mail className="h-4 w-4 mr-3 text-secondary-500" />
          {client.email}
        </div>
        <div className="flex items-center text-sm text-secondary-700">
          <Phone className="h-4 w-4 mr-3 text-secondary-500" />
          {client.phone}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-secondary-700/50">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className="h-4 w-4 mr-1 text-primary-400" />
              <span className="text-2xl font-bold text-secondary-900">{client.activeFeeds}</span>
            </div>
            <p className="text-xs text-secondary-500 font-medium">Active Feeds</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 mr-1 text-secondary-400" />
              <span className="text-sm font-semibold text-secondary-700">{client.lastActivity}</span>
            </div>
            <p className="text-xs text-secondary-500 font-medium">Last Activity</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddClientModal({ isOpen, onClose, onSave }: {
  isOpen: boolean
  onClose: () => void
  onSave: (client: Omit<Client, 'id'>) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active' as 'Active' | 'Inactive'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      activeFeeds: 0,
      lastActivity: 'Just added'
    })
    setFormData({ name: '', email: '', phone: '', status: 'Active' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-secondary-900">Add New Client</h3>
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
                placeholder="Client name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="client@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleEdit = (client: Client) => {
    console.log('Edit client:', client)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== id))
    }
  }

  const handleAddClient = (newClient: Omit<Client, 'id'>) => {
    const id = (Math.max(...clients.map(c => parseInt(c.id))) + 1).toString()
    setClients([...clients, { ...newClient, id }])
  }

  return (
    <Layout 
      title="Clients"
      subtitle="Manage your data clients and their configurations"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-secondary-900">Client Management</h2>
            <p className="text-secondary-600 mt-1">Monitor and configure your data clients</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <AddClientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddClient}
        />
      </div>
    </Layout>
  )
}