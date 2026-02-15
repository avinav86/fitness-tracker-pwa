import { useState } from 'react'
import TabBar from './TabBar'

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-ios-gray-6 pb-20">
      {/* Main content */}
      <div className="safe-top">
        {typeof children === 'function' ? children({ activeTab, setActiveTab }) : children}
      </div>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default Layout
