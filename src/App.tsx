import { useState, useEffect } from 'react'
import ChatInterface from './components/ChatInterface'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BackendWakeupModal from './components/BackendWakeupModal'
import { authApi, waitForBackend } from './services/api'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>(['auto'])
  const [user, setUser] = useState<any>(null)
  const [isBackendWaking, setIsBackendWaking] = useState(true)

  useEffect(() => {
    // Check backend health on mount
    const initializeBackend = async () => {
      const startTime = Date.now()
      const minDisplayTime = 12000 // Show for at least 12 seconds (10-15 range)
      
      const isHealthy = await waitForBackend()
      
      // Calculate remaining time to show the modal
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime)
      
      // Wait for the remaining time before hiding modal
      setTimeout(() => {
        setIsBackendWaking(false)
        
        if (!isHealthy) {
          alert('Unable to connect to backend after multiple attempts. Please try refreshing the page.')
        }
      }, remainingTime)
    }

    initializeBackend()

    // Check if user is logged in
    const userData = localStorage.getItem('user_data')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = async () => {
    await authApi.logout()
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    setUser(null)
  }

  const handleLanguageToggle = (langCode: string) => {
    setPreferredLanguages(prev => {
      // If 'auto' is selected, switch to specific language
      if (prev.includes('auto')) {
        return [langCode]
      }
      
      // Toggle language selection for mixed mode
      if (prev.includes(langCode)) {
        // Don't allow deselecting all languages
        if (prev.length === 1) {
          return ['auto']
        }
        return prev.filter(code => code !== langCode)
      } else {
        return [...prev, langCode]
      }
    })
  }

  return (
    <>
      <BackendWakeupModal isWakingUp={isBackendWaking} />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} user={user} onLogout={handleLogout} />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            preferredLanguages={preferredLanguages}
            onLanguageToggle={handleLanguageToggle}
            user={user}
          />
          
          <main className="flex-1 flex flex-col">
            <ChatInterface preferredLanguages={preferredLanguages} user={user} onUserUpdate={setUser} />
          </main>
        </div>
      </div>
    </>
  )
}

export default App
