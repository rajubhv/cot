import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Plus, Edit, Trash2, Settings, Clock, AlertCircle } from 'lucide-react'
import { mockFeedConfigurations } from '../data/mockData'
import type { FeedConfiguration } from '../types/index'

function FeedConfigCard({ config, onEdit, onDelete }: {
  config: FeedConfiguration
  onEdit: (config: FeedConfiguration) => void
  onDelete: (id: string) => void
}) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Paused':
        return 'bg-orange-100 text-orange-800'
      case 'Error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white border border-secondary-200 rounded-lg p-6 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-500">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-secondary-900">
              {config.client} → {config.vendor}
            </h3>
            <p className="text-sm text-secondary-600 mt-1">{config.feedType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(config.status)}`}>
            {config.status}
          </span>
          <button
            onClick={() => onEdit(config)}
            className="p-2 text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100 rounded"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(config.id)}
            className="p-2 text-secondary-500 hover:text-red-600 hover:bg-secondary-100 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center text-secondary-600 mb-1">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">Schedule</span>
          </div>
          <p className="text-sm font-medium text-secondary-900">{config.schedule}</p>
          <p className="text-xs text-secondary-500">{config.timezone}</p>
        </div>
        
        <div>
          <div className="flex items-center text-secondary-600 mb-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Retry Policy</span>
          </div>
          <p className="text-sm font-medium text-secondary-900">{config.retryAttempts} attempts</p>
          <p className="text-xs text-secondary-500">
            {config.alertsEnabled ? 'Alerts: Enabled' : 'Alerts: Disabled'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary-200">
        <div>
          <p className="text-xs text-secondary-500">Last Run</p>
          <p className="text-sm font-medium text-secondary-900">{config.lastRun}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-500">Next Run</p>
          <p className="text-sm font-medium text-secondary-900">{config.nextRun}</p>
        </div>
      </div>
    </div>
  )
}

function AddConfigModal({ isOpen, onClose, onSave }: {
  isOpen: boolean
  onClose: () => void
  onSave: (config: Omit<FeedConfiguration, 'id'>) => void
}) {
  const [formData, setFormData] = useState({
    client: '',
    vendor: '',
    feedType: '',
    schedule: '',
    timezone: 'EST',
    retryAttempts: 3,
    alertsEnabled: true,
    status: 'Active' as 'Active' | 'Paused' | 'Error'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      lastRun: 'Never',
      nextRun: 'Pending activation'
    })
    setFormData({
      client: '',
      vendor: '',
      feedType: '',
      schedule: '',
      timezone: 'EST',
      retryAttempts: 3,
      alertsEnabled: true,
      status: 'Active'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-secondary-900">Add Feed Configuration</h3>
            <button onClick={onClose} className="text-secondary-500 hover:text-secondary-900">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Client</label>
              <select
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select client</option>
                <option value="Acme Corp">Acme Corp</option>
                <option value="TechStart Inc">TechStart Inc</option>
                <option value="Global Systems">Global Systems</option>
                <option value="E-Commerce Ltd">E-Commerce Ltd</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Vendor</label>
              <select
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select vendor</option>
                <option value="DataProvider A">DataProvider A</option>
                <option value="Analytics Pro">Analytics Pro</option>
                <option value="DataStream">DataStream</option>
                <option value="Payment Gateway">Payment Gateway</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Feed Type</label>
              <select
                value={formData.feedType}
                onChange={(e) => setFormData({ ...formData, feedType: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select feed type</option>
                <option value="Daily Sales Report">Daily Sales Report</option>
                <option value="User Events">User Events</option>
                <option value="Inventory Snapshot">Inventory Snapshot</option>
                <option value="Transactions">Transactions</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Schedule</label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., 09:00 EST, Every hour PST"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="EST">Eastern Time (EST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Retry Attempts</label>
              <select
                value={formData.retryAttempts}
                onChange={(e) => setFormData({ ...formData, retryAttempts: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="1">1 attempt</option>
                <option value="2">2 attempts</option>
                <option value="3">3 attempts</option>
                <option value="5">5 attempts</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="alerts"
                checked={formData.alertsEnabled}
                onChange={(e) => setFormData({ ...formData, alertsEnabled: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label htmlFor="alerts" className="ml-2 block text-sm text-secondary-700">
                Enable alerts on delay
              </label>
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
                Create Configuration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function FeedConfig() {
  const [configurations, setConfigurations] = useState<FeedConfiguration[]>(mockFeedConfigurations)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleEdit = (config: FeedConfiguration) => {
    console.log('Edit configuration:', config)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this configuration?')) {
      setConfigurations(configurations.filter(c => c.id !== id))
    }
  }

  const handleAddConfiguration = (newConfig: Omit<FeedConfiguration, 'id'>) => {
    const id = (Math.max(...configurations.map(c => parseInt(c.id))) + 1).toString()
    setConfigurations([...configurations, { ...newConfig, id }])
  }

  return (
    <Layout 
      title="Feed Configuration"
      subtitle="Configure client-vendor feed mappings and schedules"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-secondary-900">Configuration Management</h2>
            <p className="text-secondary-600 mt-1">Manage feed schedules and data pipelines</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Configuration
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {configurations.map((config) => (
            <FeedConfigCard
              key={config.id}
              config={config}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <AddConfigModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddConfiguration}
        />
      </div>
    </Layout>
  )
}