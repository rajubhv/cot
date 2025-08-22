import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Search as SearchIcon, Filter, Calendar, Download, CheckCircle, AlertCircle } from 'lucide-react'

const mockSearchResults = [
  {
    id: '1',
    fileName: 'daily_sales_20241222_090200.csv',
    client: 'Acme Corp',
    vendor: 'DataProvider A',
    feedType: 'Daily Sales Report',
    date: '2024-12-22 09:02',
    size: '2.3 MB',
    records: 15234,
    status: 'success'
  },
  {
    id: '2',
    fileName: 'user_events_20241222_080000.json',
    client: 'TechStart Inc',
    vendor: 'Analytics Pro',
    feedType: 'User Activity Events',
    date: '2024-12-22 08:00',
    size: '18.7 MB',
    records: 89012,
    status: 'success'
  },
  {
    id: '3',
    fileName: 'inventory_20241221_100000.xml',
    client: 'Global Systems',
    vendor: 'DataStream',
    feedType: 'Inventory Snapshot',
    date: '2024-12-21 10:00',
    size: '5.4 MB',
    records: 3456,
    status: 'error'
  }
]

function StatusBadge({ status }: { status: string }) {
  const config = status === 'success' 
    ? { bg: 'bg-green-100 text-green-800', icon: CheckCircle, color: 'text-green-600' }
    : { bg: 'bg-red-100 text-red-800', icon: AlertCircle, color: 'text-red-600' }
  
  const Icon = config.icon

  return (
    <div className="flex items-center">
      <Icon className={`h-4 w-4 ${config.color} mr-1`} />
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg}`}>
        {status}
      </span>
    </div>
  )
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState('All Clients')
  const [selectedVendor, setSelectedVendor] = useState('All Vendors')
  const [results] = useState(mockSearchResults)

  return (
    <Layout 
      title="Search Data Files"
      subtitle="Search and analyze historical file data across all clients and vendors"
    >
      <div className="space-y-6">
        {/* Search Filters */}
        <div className="bg-white border border-secondary-200 rounded-lg p-6 shadow-soft">
          <div className="flex items-center space-x-2 mb-4">
            <SearchIcon className="h-5 w-5 text-secondary-500" />
            <h3 className="text-lg font-medium text-secondary-900">Search Filters</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search by filename, client, vendor...
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-secondary-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Search files..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Client
              </label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option>All Clients</option>
                <option>Acme Corp</option>
                <option>TechStart Inc</option>
                <option>Global Systems</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Vendor
              </label>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-secondary-300 rounded-md text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option>All Vendors</option>
                <option>DataProvider A</option>
                <option>Analytics Pro</option>
                <option>DataStream</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-3 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </button>
            </div>
            
            <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="bg-white border border-secondary-200 rounded-lg shadow-soft">
          <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-secondary-900">
              Search Results ({results.length} files found)
            </h3>
            <button className="inline-flex items-center px-3 py-2 bg-secondary-100 text-secondary-700 text-sm font-medium rounded-md hover:bg-secondary-200">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Records
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-secondary-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{result.fileName}</p>
                        <p className="text-xs text-secondary-500">{result.feedType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {result.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {result.vendor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {result.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {result.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                      {result.records.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={result.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-700">
                        <Download className="h-4 w-4" />
                      </button>
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