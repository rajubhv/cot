import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Vendors from './pages/Vendors'
import FeedTypes from './pages/FeedTypes'
import FeedConfig from './pages/FeedConfig'
import FileMonitor from './pages/FileMonitor'
import Search from './pages/Search'
import Alerts from './pages/Alerts'
import System from './pages/System'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitor" element={<FileMonitor />} />
          <Route path="/search" element={<Search />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/feed-types" element={<FeedTypes />} />
          <Route path="/feed-config" element={<FeedConfig />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/system" element={<System />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
