import { Menu, Globe, Sparkles, User, LogOut } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onMenuClick: () => void
  user: any
  onLogout: () => void
}

export default function Header({ onMenuClick, user, onLogout }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="frosted border-b border-white/60 shadow-soft sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-105"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-neutral-700" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 animate-gradient">
              <Globe className="w-7 h-7 text-white drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent">
                Wazobia AI
              </h1>
              <p className="text-xs text-neutral-600 font-medium">Nigerian Multilingual Assistant</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-50 to-primary-50 rounded-full border border-accent-200/50 shadow-sm">
            <Sparkles className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-semibold text-accent-700">AI Powered</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full border border-primary-200">
            <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse shadow-glow"></div>
            <span className="text-sm font-semibold text-primary-700">Online</span>
          </div>

          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold">{user.username}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-sm font-semibold text-neutral-900">{user.username}</p>
                    <p className="text-xs text-neutral-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      onLogout()
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
