import { Menu, Globe, Sparkles } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
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
        </div>
      </div>
    </header>
  )
}
