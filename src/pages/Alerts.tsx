import Layout from '../components/Layout/Layout'
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react'

const mockAlerts = [
  {
    id: '1',
    type: 'error',
    title: 'File delivery failed',
    message: 'inventory_snapshot_20241222.xml from Global Systems has failed after 5 retry attempts',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'warning',
    title: 'File delayed',
    message: 'user_events_20241222_1200.json from TechStart Inc is 1h 15min delayed',
    timestamp: '45 minutes ago'
  },
  {
    id: '3',
    type: 'success',
    title: 'File processed successfully',
    message: 'daily_sales_20241222.csv from Acme Corp processed successfully with 15,234 records',
    timestamp: '2 minutes ago'
  }
]

function AlertCard({ alert }: { alert: any }) {
  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'error':
        return { 
          icon: AlertTriangle, 
          iconColor: 'text-red-600', 
          bg: 'bg-red-50 border-red-200' 
        }
      case 'warning':
        return { 
          icon: AlertTriangle, 
          iconColor: 'text-orange-600', 
          bg: 'bg-orange-50 border-orange-200' 
        }
      case 'success':
        return { 
          icon: CheckCircle, 
          iconColor: 'text-green-600', 
          bg: 'bg-green-50 border-green-200' 
        }
      default:
        return { 
          icon: Info, 
          iconColor: 'text-blue-600', 
          bg: 'bg-blue-50 border-blue-200' 
        }
    }
  }

  const config = getAlertConfig(alert.type)
  const Icon = config.icon

  return (
    <div className={`border rounded-lg p-4 shadow-soft ${config.bg}`}>
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${config.iconColor} mt-0.5`} />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-secondary-900">{alert.title}</h3>
          <p className="text-sm text-secondary-700 mt-1">{alert.message}</p>
          <p className="text-xs text-secondary-500 mt-2">{alert.timestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default function Alerts() {
  return (
    <Layout 
      title="Alerts"
      subtitle="Monitor system alerts and notifications"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-secondary-900">System Alerts</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-secondary-600">3 active alerts</span>
            <button className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded hover:bg-secondary-200">
              Mark All Read
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </Layout>
  )
}