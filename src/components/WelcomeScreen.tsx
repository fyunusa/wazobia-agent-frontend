import { MessageSquare, Globe, Zap, Shield, Sparkles, Languages, TrendingUp } from 'lucide-react'

export default function WelcomeScreen() {
  const examples = [
    { lang: 'Yoruba', text: 'Báwo ni?', translation: 'How are you?', flag: '🇳🇬', color: 'from-accent-500 to-accent-600' },
    { lang: 'Hausa', text: 'Sannu, yaya kake?', translation: 'Hello, how are you?', flag: '🇳🇬', color: 'from-primary-500 to-primary-600' },
    { lang: 'Pidgin', text: 'How far? Wetin dey happen?', translation: 'How are you? What\'s happening?', flag: '🇳🇬', color: 'from-warm-500 to-warm-600' },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-warm-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Logo and Title */}
      <div className="mb-10 relative z-10">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-accent-500 to-primary-600 rounded-3xl animate-gradient shadow-glow-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="w-12 h-12 text-white drop-shadow-2xl animate-pulse-slow" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-warm-400 to-warm-600 rounded-full border-3 border-white shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4 text-white m-0.5" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="gradient-text">Welcome to Wazobia AI</span>
        </h2>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Your intelligent Nigerian multilingual assistant powered by advanced AI. 
          <br className="hidden sm:block" />
          <span className="font-semibold text-primary-600">Chat seamlessly</span> in Hausa, Yoruba, Pidgin, or English!
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 max-w-4xl relative z-10">
        <div className="card-gradient p-6 hover:scale-105 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/50 transition-all">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-neutral-900 mb-2 text-lg">Natural Conversations</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Chat naturally in your preferred Nigerian language with context-aware responses
          </p>
        </div>

        <div className="card-gradient p-6 hover:scale-105 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-500/30 group-hover:shadow-xl group-hover:shadow-accent-500/50 transition-all">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-neutral-900 mb-2 text-lg">Instant Translation</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Seamlessly translate between all supported languages with high accuracy
          </p>
        </div>

        <div className="card-gradient p-6 hover:scale-105 transition-all duration-300 group">
          <div className="w-12 h-12 bg-gradient-to-br from-warm-500 to-warm-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-warm-500/30 group-hover:shadow-xl group-hover:shadow-warm-500/50 transition-all">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-neutral-900 mb-2 text-lg">Cultural Intelligence</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Deep understanding of Nigerian cultural nuances, idioms, and context
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-10 relative z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-neutral-200">
          <Languages className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-semibold text-neutral-700">4 Languages</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-neutral-200">
          <TrendingUp className="w-4 h-4 text-accent-600" />
          <span className="text-sm font-semibold text-neutral-700">98% Accuracy</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-neutral-200">
          <Sparkles className="w-4 h-4 text-warm-600" />
          <span className="text-sm font-semibold text-neutral-700">AI Powered</span>
        </div>
      </div>

      {/* Example Messages */}
      <div className="max-w-3xl mx-auto relative z-10">
        <p className="text-sm font-bold text-neutral-700 mb-5 uppercase tracking-wider flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-600" />
          Try these examples
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <button
              key={index}
              className="card hover:shadow-xl transition-all duration-300 cursor-pointer text-left group overflow-hidden relative"
              onClick={() => {
                console.log('Send example:', example.text)
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${example.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{example.flag}</span>
                  <span className={`badge bg-gradient-to-r ${example.color} text-white font-semibold shadow-sm`}>
                    {example.lang}
                  </span>
                </div>
                <p className="text-base font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  "{example.text}"
                </p>
                <p className="text-sm text-neutral-500">
                  {example.translation}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 relative z-10">
        <div className="flex items-center gap-2 text-neutral-500 animate-pulse-slow">
          <span className="text-sm font-medium">Start by typing a message below</span>
          <span className="text-2xl">👇</span>
        </div>
      </div>
    </div>
  )
}
