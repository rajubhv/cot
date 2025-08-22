import { 
  LayoutDashboard, 
  Activity, 
  Search, 
  Users, 
  Building2, 
  FileType, 
  Settings,
  Bell,
  Monitor
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    section: 'OVERVIEW'
  },
  {
    name: 'File Monitor',
    href: '/monitor',
    icon: Activity,
    section: 'OVERVIEW'
  },
  {
    name: 'Search',
    href: '/search',
    icon: Search,
    section: 'OVERVIEW'
  },
  {
    name: 'Clients',
    href: '/clients',
    icon: Users,
    section: 'MANAGEMENT'
  },
  {
    name: 'Vendors',
    href: '/vendors',
    icon: Building2,
    section: 'MANAGEMENT'
  },
  {
    name: 'Feed Types',
    href: '/feed-types',
    icon: FileType,
    section: 'MANAGEMENT'
  },
  {
    name: 'Feed Config',
    href: '/feed-config',
    icon: Settings,
    section: 'MANAGEMENT'
  },
  {
    name: 'Alerts',
    href: '/alerts',
    icon: Bell,
    section: 'SYSTEM'
  },
  {
    name: 'System',
    href: '/system',
    icon: Monitor,
    section: 'SYSTEM'
  }
]

const sections = ['OVERVIEW', 'MANAGEMENT', 'SYSTEM']

export default function Sidebar() {
  const location = useLocation()
  
  return (
    <div className="flex h-full w-64 flex-col bg-white/95 backdrop-blur-sm border-r border-secondary-200/50 shadow-strong">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-secondary-200/50">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-medium">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-secondary-900">DataWatch</h1>
            <p className="text-xs text-secondary-600 font-medium">Observability Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-6 px-3 py-6">
        {sections.map((section) => (
          <div key={section} className="space-y-3">
            <h3 className="px-3 text-2xs font-semibold text-secondary-600 uppercase tracking-wider">
              {section}
            </h3>
            <div className="space-y-1">
              {navigation
                .filter((item) => item.section === section)
                .map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={clsx(
                        isActive
                          ? 'bg-primary-600/90 text-white shadow-soft border-primary-500/20'
                          : 'text-secondary-700 hover:bg-secondary-100/60 hover:text-secondary-900 border-transparent',
                        'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 border'
                      )}
                    >
                      <item.icon
                        className={clsx(
                          isActive ? 'text-white' : 'text-secondary-500 group-hover:text-secondary-700',
                          'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200'
                        )}
                      />
                      {item.name}
                    </Link>
                  )
                })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}