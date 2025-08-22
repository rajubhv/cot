import type { 
  Client, 
  Vendor, 
  FeedType, 
  FeedConfiguration, 
  FileActivity, 
  DashboardStats 
} from '../types/index.js'

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    activeFeeds: 5,
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    name: 'TechStart Inc',
    email: 'ops@techstart.io',
    phone: '+1 (555) 987-6543',
    status: 'Active',
    activeFeeds: 3,
    lastActivity: '1 day ago'
  },
  {
    id: '3',
    name: 'Global Systems Ltd',
    email: 'data@globalsys.com',
    phone: '+1 (555) 456-7890',
    status: 'Inactive',
    activeFeeds: 0,
    lastActivity: '1 week ago'
  }
]

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'DataProvider Analytics',
    type: 'DATA PROVIDER',
    status: 'Active',
    clients: 8,
    feedTypes: 12,
    reliability: 98.5,
    lastUpdate: '30 minutes ago'
  },
  {
    id: '2',
    name: 'Payment Gateway Pro',
    type: 'PAYMENT',
    status: 'Active',
    clients: 15,
    feedTypes: 3,
    reliability: 99.2,
    lastUpdate: '1 hour ago'
  },
  {
    id: '3',
    name: 'Analytics Stream',
    type: 'ANALYTICS',
    status: 'Maintenance',
    clients: 5,
    feedTypes: 7,
    reliability: 97.1,
    lastUpdate: '4 hours ago'
  },
  {
    id: '4',
    name: 'Legacy Data Systems',
    type: 'OTHER',
    status: 'Inactive',
    clients: 2,
    feedTypes: 2,
    reliability: 89.3,
    lastUpdate: '3 days ago'
  }
]

export const mockFeedTypes: FeedType[] = [
  {
    id: '1',
    name: 'Daily Sales Report',
    description: 'Daily sales transactions and revenue data',
    format: 'CSV',
    status: 'Active',
    frequency: 'Daily',
    avgSize: '2.5 MB',
    activeFeeds: 8
  },
  {
    id: '2',
    name: 'User Activity Events',
    description: 'Real-time user interaction and behavior data',
    format: 'JSON',
    status: 'Active',
    frequency: 'Hourly',
    avgSize: '15.2 MB',
    activeFeeds: 12
  },
  {
    id: '3',
    name: 'Inventory Snapshot',
    description: 'Current inventory levels and product availability',
    format: 'XML',
    status: 'Active',
    frequency: 'Daily',
    avgSize: '5.1 MB',
    activeFeeds: 5
  },
  {
    id: '4',
    name: 'Payment Transactions',
    description: 'Payment processing and transaction records',
    format: 'CSV',
    status: 'Active',
    frequency: 'Daily',
    avgSize: '8.7 MB',
    activeFeeds: 15
  },
  {
    id: '5',
    name: 'Legacy Customer Data',
    description: 'Older customer data format - being phased out',
    format: 'Excel',
    status: 'Deprecated',
    frequency: 'Weekly',
    avgSize: '1.2 MB',
    activeFeeds: 2
  }
]

export const mockFeedConfigurations: FeedConfiguration[] = [
  {
    id: '1',
    client: 'Acme Corp',
    vendor: 'DataProvider A',
    feedType: 'Daily Sales Report',
    schedule: '09:00 EST',
    timezone: 'EST',
    retryAttempts: 3,
    alertsEnabled: true,
    status: 'Active',
    lastRun: 'Today 09:02',
    nextRun: 'Tomorrow 09:00'
  },
  {
    id: '2',
    client: 'TechStart Inc',
    vendor: 'Analytics Pro',
    feedType: 'User Events',
    schedule: 'Every hour PST',
    timezone: 'PST',
    retryAttempts: 2,
    alertsEnabled: true,
    status: 'Active',
    lastRun: '12:00 PM',
    nextRun: '1:00 PM'
  },
  {
    id: '3',
    client: 'Global Systems',
    vendor: 'DataStream',
    feedType: 'Inventory Snapshot',
    schedule: '10:00 UTC',
    timezone: 'UTC',
    retryAttempts: 5,
    alertsEnabled: true,
    status: 'Error',
    lastRun: 'Failed 2h ago',
    nextRun: 'Manual restart required'
  },
  {
    id: '4',
    client: 'E-Commerce Ltd',
    vendor: 'Payment Gateway',
    feedType: 'Transactions',
    schedule: '12:00 EST',
    timezone: 'EST',
    retryAttempts: 1,
    alertsEnabled: false,
    status: 'Paused',
    lastRun: 'Yesterday 12:00',
    nextRun: 'Paused'
  }
]

export const mockFileActivity: FileActivity[] = [
  {
    id: '1',
    fileName: 'daily_sales_20241222.csv',
    client: 'Acme Corp',
    vendor: 'DataProvider A',
    feedType: 'Daily Sales Report',
    expected: '09:00',
    actual: '09:02',
    records: 15234,
    size: '2.3 MB',
    status: 'On Time',
    lastUpdated: '2 minutes ago'
  },
  {
    id: '2',
    fileName: 'user_events_20241222_1200.json',
    client: 'TechStart Inc',
    vendor: 'Analytics Pro',
    feedType: 'User Events',
    expected: '12:00',
    actual: '13:15',
    records: 8901,
    size: '18.7 MB',
    status: 'Delayed',
    lastUpdated: '45 minutes ago',
    delayTime: '1h 15min'
  },
  {
    id: '3',
    fileName: 'inventory_snapshot_20241222.xml',
    client: 'Global Systems',
    vendor: 'DataStream',
    feedType: 'Inventory Snapshot',
    expected: '10:00',
    actual: '-',
    records: 0,
    size: '-',
    status: 'Missing',
    lastUpdated: '2 hours ago',
    delayTime: '2h 30min'
  },
  {
    id: '4',
    fileName: 'transactions_20241222.csv',
    client: 'E-Commerce Ltd',
    vendor: 'Payment Gateway',
    feedType: 'Transactions',
    expected: '12:00',
    actual: '12:00',
    records: 23456,
    size: '8.1 MB',
    status: 'Processing',
    lastUpdated: '30 seconds ago'
  }
]

export const mockDashboardStats: DashboardStats = {
  filesToday: 47,
  onTime: 42,
  delayed: 3,
  missing: 2,
  activeClients: 23,
  dataVendors: 15,
  recordsProcessed: '2.4M',
  todayComparison: '+12%',
  deliveryRate: 89,
  delayedFromYesterday: 1,
  recordsIncrease: '+18%'
}