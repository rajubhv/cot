import Layout from '../components/Layout/Layout'
import { File, CheckCircle, Clock, AlertTriangle, Users, Database, TrendingUp } from 'lucide-react'
import { mockDashboardStats, mockFileActivity } from '../data/mockData'
import type { FileActivity } from '../types/index'

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend 
}: {
  title: string
  value: string | number
  subtitle: string
  icon: any
  trend?: string
}) {
  const getIconColor = (title: string) => {
    switch (title.toLowerCase()) {
      case 'files today':
        return 'text-primary-400 bg-primary-400/10'
      case 'on time':
        return 'text-success-400 bg-success-400/10'
      case 'delayed':
        return 'text-warning-400 bg-warning-400/10'
      case 'missing':
        return 'text-danger-400 bg-danger-400/10'
      case 'active clients':
        return 'text-primary-400 bg-primary-400/10'
      case 'data vendors':
        return 'text-secondary-400 bg-secondary-400/10'
      case 'records processed':
        return 'text-primary-500 bg-primary-500/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  const iconColorClass = getIconColor(title)
  
  return (
    <div className="card-hover p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-semibold text-secondary-900">{value}</p>
            {trend && (
              <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {trend}
              </span>
            )}
          </div>
          <p className="text-xs text-secondary-500 mt-1">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-3 ${iconColorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: FileActivity['status'] }) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'On Time':
        return 'status-success'
      case 'Delayed':
        return 'status-warning'
      case 'Missing':
        return 'status-danger'
      case 'Processing':
        return 'status-info'
      default:
        return 'status-neutral'
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
      {status}
    </span>
  )
}

export default function Dashboard() {
  const stats = mockDashboardStats
  const recentActivity = mockFileActivity.slice(0, 4)

  return (
    <Layout 
      title="Data Observability Dashboard"
      subtitle="Monitor your data pipelines and file delivery status in real-time"
    >
      <div className="space-y-6">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Files Today"
            value={stats.filesToday}
            subtitle={`${stats.todayComparison} vs yesterday`}
            icon={File}
            trend={stats.todayComparison}
          />
          <StatCard
            title="On Time"
            value={stats.onTime}
            subtitle={`${stats.deliveryRate}% delivery rate`}
            icon={CheckCircle}
          />
          <StatCard
            title="Delayed"
            value={stats.delayed}
            subtitle={`+${stats.delayedFromYesterday} from yesterday`}
            icon={Clock}
            trend={`+${stats.delayedFromYesterday}`}
          />
          <StatCard
            title="Missing"
            value={stats.missing}
            subtitle="requires attention"
            icon={AlertTriangle}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <StatCard
            title="Active Clients"
            value={stats.activeClients}
            subtitle="+2 this month"
            icon={Users}
            trend="+2"
          />
          <StatCard
            title="Data Vendors"
            value={stats.dataVendors}
            subtitle="stable integrated"
            icon={Database}
          />
          <StatCard
            title="Records Processed"
            value={stats.recordsProcessed}
            subtitle={`${stats.recordsIncrease} this week`}
            icon={TrendingUp}
            trend={stats.recordsIncrease}
          />
        </div>

        {/* Recent File Activity */}
        <div className="card">
          <div className="px-6 py-4 border-b border-secondary-200/50">
            <h2 className="text-lg font-semibold text-secondary-900">Recent File Activity</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Feed Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Expected
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Actual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Records
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                      {activity.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {activity.vendor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {activity.feedType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {activity.expected}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {activity.actual}
                      {activity.delayTime && (
                        <div className="text-xs text-red-600">
                          ({activity.delayTime})
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {activity.records.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={activity.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}