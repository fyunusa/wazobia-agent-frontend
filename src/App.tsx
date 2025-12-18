import { useState, useEffect } from 'react'
import ChatInterface from './components/ChatInterface'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BackendWakeupModal from './components/BackendWakeupModal'
import AuthModal from './components/AuthModal'
import AdminDashboard from './components/AdminDashboard'
import { authApi, waitForBackend } from './services/api'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>(['auto'])
  const [user, setUser] = useState<any>(null)
  const [isBackendWaking, setIsBackendWaking] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showAdminDashboard, setShowAdminDashboard] = useState(false)

  useEffect(() => {
    // Check backend health on mount
    const initializeBackend = async () => {
      const startTime = Date.now()
      // Random display time between 10-60 seconds for variety
      const minDisplayTime = Math.floor(Math.random() * (60000 - 10000 + 1)) + 10000
      console.log(`Loading modal will display for ${minDisplayTime / 1000} seconds`)
      
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
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear local storage and user state
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      setUser(null)
      setShowAdminDashboard(false)
    }
  }

  const handleAuthSuccess = (userData: any, token: string) => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user_data', JSON.stringify(userData))
    setUser(userData)
    setShowAuthModal(false)
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
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          user={user} 
          onLogout={handleLogout}
          onSignInClick={() => setShowAuthModal(true)}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            preferredLanguages={preferredLanguages}
            onLanguageToggle={handleLanguageToggle}
            user={user}
          />
          
          <main className="flex-1 flex flex-col">
            {/* Admin Dashboard Toggle */}
            {user?.is_admin && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">👑</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Admin Access</p>
                    <p className="text-white/80 text-xs">You have admin privileges</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAdminDashboard(!showAdminDashboard)}
                  className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {showAdminDashboard ? 'Back to Chat' : 'View Dashboard'}
                </button>
              </div>
            )}
            
            {showAdminDashboard && user?.is_admin ? (
              <AdminDashboard />
            ) : (
              <ChatInterface preferredLanguages={preferredLanguages} user={user} onUserUpdate={setUser} />
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default App
