import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>(['auto'])

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          preferredLanguages={preferredLanguages}
          onLanguageToggle={handleLanguageToggle}
        />
        
        <main className="flex-1 flex flex-col">
          <ChatInterface preferredLanguages={preferredLanguages} />
        </main>
      </div>
    </div>
  )
}

export default App
