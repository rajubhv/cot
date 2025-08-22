import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Plus, Edit, Trash2, BarChart3, Clock, Database } from 'lucide-react'
import { mockFeedTypes } from '../data/mockData'
import type { FeedType } from '../types/index'

function FeedTypeCard({ feedType, onEdit, onDelete }: {
  feedType: FeedType
  onEdit: (feedType: FeedType) => void
  onDelete: (id: string) => void
}) {
  const getStatusStyle = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-orange-100 text-orange-800'
  }

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'CSV': return 'text-green-600'
      case 'JSON': return 'text-blue-600'
      case 'XML': return 'text-orange-600'
      case 'Excel': return 'text-red-600'
      default: return 'text-secondary-600'
    }
  }

  return (
    <div className="bg-white border border-secondary-200 rounded-lg p-6 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-500">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-secondary-900">{feedType.name}</h3>
            <p className="text-sm text-secondary-600 mt-1">{feedType.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(feedType)}
            className="p-2 text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100 rounded"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(feedType.id)}
            className="p-2 text-secondary-500 hover:text-red-600 hover:bg-secondary-100 rounded"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(feedType.status)}`}>
          {feedType.status}
        </span>
        <span className={`text-sm font-medium ${getFormatColor(feedType.format)}`}>
          {feedType.format}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center mb-1">
            <Clock className="h-4 w-4 text-secondary-500 mr-1" />
            <span className="text-sm font-medium text-secondary-900">{feedType.frequency}</span>
          </div>
          <p className="text-xs text-secondary-500">Frequency</p>
        </div>
        
        <div>
          <div className="flex items-center justify-center mb-1">
            <BarChart3 className="h-4 w-4 text-secondary-500 mr-1" />
            <span className="text-sm font-medium text-secondary-900">{feedType.avgSize}</span>
          </div>
          <p className="text-xs text-secondary-500">Avg Size</p>
        </div>
        
        <div>
          <div className="flex items-center justify-center mb-1">
            <Database className="h-4 w-4 text-secondary-500 mr-1" />
            <span className="text-sm font-medium text-secondary-900">{feedType.activeFeeds}</span>
          </div>
          <p className="text-xs text-secondary-500">Active</p>
        </div>
      </div>
    </div>
  )
}

export default function FeedTypes() {
  const [feedTypes, setFeedTypes] = useState<FeedType[]>(mockFeedTypes)

  const handleEdit = (feedType: FeedType) => {
    console.log('Edit feed type:', feedType)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this feed type?')) {
      setFeedTypes(feedTypes.filter(ft => ft.id !== id))
    }
  }

  return (
    <Layout 
      title="Feed Types"
      subtitle="Define and manage different types of data feeds"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-secondary-900">Feed Type Management</h2>
            <p className="text-secondary-600 mt-1">Configure data feed formats and specifications</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Feed Type
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {feedTypes.map((feedType) => (
            <FeedTypeCard
              key={feedType.id}
              feedType={feedType}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}