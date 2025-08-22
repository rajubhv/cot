export interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: 'Active' | 'Inactive'
  activeFeeds: number
  lastActivity: string
}

export interface Vendor {
  id: string
  name: string
  type: string
  status: 'Active' | 'Inactive' | 'Maintenance'
  clients: number
  feedTypes: number
  reliability: number
  lastUpdate: string
}

export interface FeedType {
  id: string
  name: string
  description: string
  format: 'CSV' | 'JSON' | 'XML' | 'Excel'
  status: 'Active' | 'Deprecated'
  frequency: 'Daily' | 'Hourly' | 'Weekly'
  avgSize: string
  activeFeeds: number
}

export interface FeedConfiguration {
  id: string
  client: string
  vendor: string
  feedType: string
  schedule: string
  timezone: string
  retryAttempts: number
  alertsEnabled: boolean
  status: 'Active' | 'Paused' | 'Error'
  lastRun: string
  nextRun: string
}

export interface FileActivity {
  id: string
  fileName: string
  client: string
  vendor: string
  feedType: string
  expected: string
  actual: string
  records: number
  size: string
  status: 'On Time' | 'Delayed' | 'Missing' | 'Processing'
  lastUpdated: string
  delayTime?: string
}

export interface DashboardStats {
  filesToday: number
  onTime: number
  delayed: number
  missing: number
  activeClients: number
  dataVendors: number
  recordsProcessed: string
  todayComparison: string
  deliveryRate: number
  delayedFromYesterday: number
  recordsIncrease: string
}