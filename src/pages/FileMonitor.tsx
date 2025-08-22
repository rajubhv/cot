import Layout from '../components/Layout/Layout'
import { RefreshCw, Download, CheckCircle, Clock, AlertTriangle, Loader } from 'lucide-react'
import { mockFileActivity } from '../data/mockData'
import type { FileActivity } from '../types/index'

function StatusBadge({ status }: { status: FileActivity['status'] }) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'On Time':
        return { 
          bg: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        }
      case 'Delayed':
        return { 
          bg: 'bg-orange-100 text-orange-800',
          icon: Clock,
          iconColor: 'text-orange-600'
        }
      case 'Missing':
        return { 
          bg: 'bg-red-100 text-red-800',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        }
      case 'Processing':
        return { 
          bg: 'bg-blue-100 text-blue-800',
          icon: Loader,
          iconColor: 'text-blue-600'
        }
      default:
        return { 
          bg: 'bg-gray-100 text-gray-800',
          icon: AlertTriangle,
          iconColor: 'text-gray-600'
        }
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <div className="flex items-center">
      <Icon className={`h-4 w-4 ${config.iconColor} mr-2`} />
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg}`}>
        {status}
      </span>
    </div>
  )
}

function StatusCard({ title, count, icon: Icon, color }: {
  title: string
  count: number
  icon: any
  color: string
}) {
  return (
    <div className="bg-white border border-secondary-200 rounded-lg p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600">{title}</p>
          <p className="text-2xl font-semibold text-secondary-900">{count}</p>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

export default function FileMonitor() {
  const files = mockFileActivity

  const statusCounts = {
    onTime: files.filter(f => f.status === 'On Time').length,
    delayed: files.filter(f => f.status === 'Delayed').length,
    missing: files.filter(f => f.status === 'Missing').length,
    processing: files.filter(f => f.status === 'Processing').length,
    total: files.length
  }

  return (
    <Layout 
      title="File Monitor"
      subtitle="Real-time monitoring of file arrivals and processing status"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium bg-secondary-100 text-secondary-700">
              Auto Refresh On
            </span>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Now
          </button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatusCard
            title="On Time"
            count={statusCounts.onTime}
            icon={CheckCircle}
            color="text-green-400 bg-green-400/10"
          />
          <StatusCard
            title="Delayed"
            count={statusCounts.delayed}
            icon={Clock}
            color="text-orange-400 bg-orange-400/10"
          />
          <StatusCard
            title="Missing"
            count={statusCounts.missing}
            icon={AlertTriangle}
            color="text-red-400 bg-red-400/10"
          />
          <StatusCard
            title="Processing"
            count={statusCounts.processing}
            icon={Loader}
            color="text-blue-400 bg-blue-400/10"
          />
          <StatusCard
            title="Total Today"
            count={statusCounts.total}
            icon={RefreshCw}
            color="text-purple-400 bg-purple-400/10"
          />
        </div>

        {/* File List */}
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="bg-white border border-secondary-200 rounded-lg p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-secondary-900">{file.fileName}</h3>
                  <p className="text-sm text-secondary-600">
                    {file.client} • {file.vendor} • {file.feedType}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={file.status} />
                  <button className="p-2 text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100 rounded">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 lg:grid-cols-6">
                <div>
                  <p className="text-xs text-secondary-500">Expected</p>
                  <p className="text-sm font-medium text-secondary-900">{file.expected}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary-500">Actual</p>
                  <p className="text-sm font-medium text-secondary-900">
                    {file.actual}
                    {file.delayTime && (
                      <span className="text-red-600 ml-1">
                        ({file.delayTime})
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-secondary-500">Records</p>
                  <p className="text-sm font-medium text-secondary-900">
                    {file.records ? file.records.toLocaleString() : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-secondary-500">Size</p>
                  <p className="text-sm font-medium text-secondary-900">{file.size}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary-500">Status</p>
                  <p className="text-sm font-medium text-secondary-900">{file.status}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary-500">Last Updated</p>
                  <p className="text-sm font-medium text-secondary-900">{file.lastUpdated}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}