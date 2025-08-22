import { Search, Bell, User, Menu } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white/50 backdrop-blur-sm border-b border-secondary-200/50 px-6 py-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors">
            <Menu className="h-5 w-5 text-secondary-600" />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-secondary-900 tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2.5 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100/60 transition-all duration-200">
            <Search className="h-5 w-5" />
          </button>
          
          <button className="relative p-2.5 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100/60 transition-all duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-danger-500 rounded-full flex items-center justify-center shadow-medium">
              <span className="text-2xs text-white font-semibold">3</span>
            </span>
          </button>
          
          <div className="ml-2 pl-2 border-l border-secondary-300">
            <button className="flex items-center space-x-2 p-2 text-secondary-700 hover:text-secondary-900 rounded-lg hover:bg-secondary-100/60 transition-all duration-200">
              <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-secondary-600">admin@datawatch.com</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}