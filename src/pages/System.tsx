import Layout from '../components/Layout/Layout'
import { Server, Cpu, HardDrive, Activity, Clock } from 'lucide-react'

const systemMetrics = [
  { name: 'CPU Usage', value: '45%', icon: Cpu, color: 'text-blue-600' },
  { name: 'Memory', value: '6.2/16 GB', icon: Server, color: 'text-green-600' },
  { name: 'Storage', value: '234/500 GB', icon: HardDrive, color: 'text-yellow-600' },
  { name: 'Active Connections', value: '127', icon: Activity, color: 'text-purple-600' }
]

const recentLogs = [
  { timestamp: '2024-12-22 14:30:15', level: 'INFO', message: 'File processing completed for daily_sales_20241222.csv' },
  { timestamp: '2024-12-22 14:28:42', level: 'WARN', message: 'File delivery delayed for user_events_20241222_1200.json' },
  { timestamp: '2024-12-22 14:25:33', level: 'ERROR', message: 'Connection timeout to DataStream vendor' },
  { timestamp: '2024-12-22 14:20:11', level: 'INFO', message: 'System backup completed successfully' }
]

function MetricCard({ metric }: { metric: any }) {
  const Icon = metric.icon
  
  return (
    <div className="bg-white border border-secondary-200 rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600">{metric.name}</p>
          <p className="text-2xl font-semibold text-secondary-900">{metric.value}</p>
        </div>
        <Icon className={`h-8 w-8 ${metric.color}`} />
      </div>
    </div>
  )
}

function LogEntry({ log }: { log: any }) {
  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-700 bg-red-100'
      case 'WARN':
        return 'text-yellow-700 bg-yellow-100'
      case 'INFO':
        return 'text-blue-700 bg-blue-100'
      default:
        return 'text-secondary-700 bg-secondary-100'
    }
  }

  return (
    <div className="flex items-start space-x-3 py-3 border-b border-secondary-200 last:border-b-0">
      <div className="flex items-center space-x-2 min-w-0 flex-1">
        <Clock className="h-4 w-4 text-secondary-500 flex-shrink-0" />
        <span className="text-xs text-secondary-500 flex-shrink-0">{log.timestamp}</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getLevelStyle(log.level)}`}>
          {log.level}
        </span>
      </div>
      <p className="text-sm text-secondary-700 flex-1">{log.message}</p>
    </div>
  )
}

export default function System() {
  return (
    <Layout 
      title="System"
      subtitle="Monitor system health and performance metrics"
    >
      <div className="space-y-6">
        {/* System Metrics */}
        <div>
          <h2 className="text-lg font-medium text-secondary-900 mb-4">System Metrics</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {systemMetrics.map((metric) => (
              <MetricCard key={metric.name} metric={metric} />
            ))}
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white border border-secondary-200 rounded-lg shadow-soft">
          <div className="px-6 py-4 border-b border-secondary-200">
            <h3 className="text-lg font-medium text-secondary-900">Recent System Logs</h3>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-0">
              {recentLogs.map((log, index) => (
                <LogEntry key={index} log={log} />
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white border border-secondary-200 rounded-lg p-6 shadow-soft">
          <h3 className="text-lg font-medium text-secondary-900 mb-4">Service Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-700">Database Service</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-700">File Processing Engine</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Running
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-700">Alert System</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-700">Backup Service</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                In Progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}