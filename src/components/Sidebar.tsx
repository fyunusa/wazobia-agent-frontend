import { X, Languages, Sparkles, Zap, Shield, MessageCircle, Globe2, Check } from 'lucide-react'
import { LANGUAGES } from '../utils/languages'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  preferredLanguages: string[]
  onLanguageToggle: (langCode: string) => void
}

export default function Sidebar({ isOpen, onClose, preferredLanguages, onLanguageToggle }: SidebarProps) {
  const isAutoMode = preferredLanguages.includes('auto')
  const isMixedMode = !isAutoMode && preferredLanguages.length > 1
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-80 frosted border-r border-white/60 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-warm-200/20 to-primary-200/20 rounded-full blur-3xl"></div>

          {/* Header */}
          <div className="p-5 border-b border-white/60 flex items-center justify-between lg:hidden relative z-10">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <X className="w-5 h-5 text-neutral-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 relative z-10">
            {/* Supported Languages */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <Languages className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                    Preferred Language
                  </h3>
                  {isMixedMode && (
                    <p className="text-xs text-accent-600 font-medium">Mixed mode enabled</p>
                  )}
                </div>
              </div>
              
              {/* Auto Mode */}
              <div
                onClick={() => onLanguageToggle('auto')}
                className={`flex items-center gap-3 p-3.5 rounded-xl backdrop-blur-sm border transition-all duration-300 cursor-pointer mb-2.5 ${
                  isAutoMode
                    ? 'bg-gradient-to-r from-primary-50 to-accent-50 border-primary-300 shadow-md'
                    : 'bg-white/80 border-neutral-200 hover:border-primary-300 hover:shadow-md'
                } group`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🤖</span>
                <div className="flex-1">
                  <p className={`text-sm font-semibold transition-colors ${
                    isAutoMode ? 'text-primary-700' : 'text-neutral-900 group-hover:text-primary-600'
                  }`}>Auto-Detect</p>
                  <p className="text-xs text-neutral-500">Let AI choose the best language</p>
                </div>
                {isAutoMode && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                {Object.values(LANGUAGES).map((lang) => {
                  const isSelected = preferredLanguages.includes(lang.code)
                  return (
                    <div
                      key={lang.code}
                      onClick={() => onLanguageToggle(lang.code)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-primary-50 to-accent-50 border-primary-300 shadow-md'
                          : 'bg-white/80 border-neutral-200 hover:border-primary-300 hover:shadow-md'
                      } group`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold transition-colors ${
                          isSelected ? 'text-primary-700' : 'text-neutral-900 group-hover:text-primary-600'
                        }`}>{lang.name}</p>
                        <p className="text-xs text-neutral-500">{lang.nativeName}</p>
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-accent-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {!isAutoMode && (
                <div className="mt-3 p-3 bg-accent-50/50 border border-accent-200 rounded-xl">
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    💡 <span className="font-semibold">Tip:</span> Select multiple languages for mixed-language conversations (e.g., Yoruba + English)
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-warm-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent-500/30">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                  Features
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Smart Detection</p>
                    <p className="text-xs text-neutral-600">Automatic language recognition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-accent-50 to-warm-50 border border-accent-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <Zap className="w-4 h-4 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Instant Translation</p>
                    <p className="text-xs text-neutral-600">Real-time multilingual support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-warm-50 to-primary-50 border border-warm-100">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <Shield className="w-4 h-4 text-warm-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Cultural Intelligence</p>
                    <p className="text-xs text-neutral-600">Context-aware responses</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="p-4 bg-gradient-to-br from-primary-500 via-accent-500 to-warm-500 rounded-2xl shadow-lg text-white relative overflow-hidden animate-gradient">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <Globe2 className="w-6 h-6 drop-shadow-lg" />
                  <h4 className="text-sm font-bold">
                    About Wazobia AI
                  </h4>
                </div>
                <p className="text-sm leading-relaxed opacity-95">
                  Bridging communication gaps across Nigeria with AI-powered multilingual conversations.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/60 relative z-10">
            <p className="text-xs text-center text-neutral-500 font-medium">
              Powered by <span className="font-bold text-primary-600">Advanced AI</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
