import { User, Bot, Languages, X, Sparkles, Tag } from 'lucide-react'
import { useState } from 'react'
import type { Message } from '../types'
import { getLanguageInfo } from '../utils/languages'
import { chatApi } from '../services/api'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const languageInfo = message.language ? getLanguageInfo(message.language) : null
  const [showTranslateOptions, setShowTranslateOptions] = useState(false)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [translatedLang, setTranslatedLang] = useState<string | null>(null)
  const [translating, setTranslating] = useState(false)

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇬🇧', gradient: 'from-primary-500 to-primary-600' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', gradient: 'from-accent-500 to-accent-600' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬', gradient: 'from-warm-500 to-warm-600' },
    { code: 'pcm', name: 'Pidgin', flag: '🇳🇬', gradient: 'from-primary-400 to-accent-500' }
  ]

  const handleTranslate = async (targetLang: string) => {
    setTranslating(true)
    setShowTranslateOptions(false)
    
    try {
      const response = await chatApi.translate({
        text: message.content,
        source_language: message.language || 'en',
        target_language: targetLang
      })
      
      setTranslatedText(response.translated_text)
      setTranslatedLang(targetLang)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Translation failed. Please try again.')
    } finally {
      setTranslating(false)
    }
  }

  const clearTranslation = () => {
    setTranslatedText(null)
    setTranslatedLang(null)
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-4 duration-300`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg
        ${isUser 
          ? 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 shadow-primary-500/30' 
          : 'bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 shadow-accent-500/30 animate-gradient'
        }
      `}>
        {isUser ? (
          <User className="w-5 h-5 text-white drop-shadow-lg" />
        ) : (
          <Bot className="w-5 h-5 text-white drop-shadow-lg" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-2xl ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div className={`
          rounded-2xl px-5 py-3.5 shadow-soft transition-all duration-300 hover:shadow-md
          ${isUser 
            ? 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white shadow-primary-500/20' 
            : 'bg-white/90 backdrop-blur-sm border border-neutral-200 text-neutral-900'
          }
        `}>
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
          
          {/* Translation Result */}
          {translatedText && translatedLang && (
            <div className={`mt-3 pt-3 ${isUser ? 'border-t border-white/20' : 'border-t border-neutral-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Languages className={`w-3.5 h-3.5 ${isUser ? 'text-white/70' : 'text-primary-600'}`} />
                  <span className={`text-xs font-semibold ${isUser ? 'text-white/90' : 'text-neutral-600'}`}>
                    {availableLanguages.find(l => l.code === translatedLang)?.flag} {availableLanguages.find(l => l.code === translatedLang)?.name}
                  </span>
                </div>
                <button
                  onClick={clearTranslation}
                  className={`${isUser ? 'text-white/60 hover:text-white/90' : 'text-neutral-400 hover:text-neutral-600'} transition-colors p-1 rounded-lg hover:bg-white/10`}
                  title="Clear translation"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className={`text-sm leading-relaxed italic ${isUser ? 'text-white/95' : 'text-neutral-700'}`}>
                {translatedText}
              </p>
            </div>
          )}
        </div>

        {/* Translate Button (only for assistant messages) */}
        {!isUser && !translating && (
          <div className="relative">
            <button
              onClick={() => setShowTranslateOptions(!showTranslateOptions)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-primary-600 hover:text-primary-700 bg-white/80 backdrop-blur-sm hover:bg-white border border-primary-200 hover:border-primary-300 rounded-xl transition-all duration-300 hover:shadow-md group"
            >
              <Languages className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Translate</span>
            </button>

            {/* Language Options Dropdown */}
            {showTranslateOptions && (
              <div className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-neutral-200 py-2 z-10 min-w-[160px] animate-in fade-in slide-in-from-top-2 duration-200">
                {availableLanguages
                  .filter(lang => lang.code !== message.language)
                  .map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleTranslate(lang.code)}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 flex items-center gap-3 transition-all duration-200 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                      <span className="text-neutral-700 font-medium group-hover:text-primary-700">{lang.name}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}

        {translating && (
          <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-primary-200 shadow-sm">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium text-neutral-600">Translating...</span>
          </div>
        )}

        {/* Metadata */}
        <div className={`flex items-center gap-2 text-xs ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-neutral-500 font-medium">
            {message.timestamp.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>

          {languageInfo && (
            <>
              <span className="text-gray-300">•</span>
              <div 
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: `${languageInfo.color}15`,
                  color: languageInfo.color 
                }}
              >
                <span>{languageInfo.flag}</span>
                <span className="font-medium">{languageInfo.name}</span>
              </div>
            </>
          )}

          {message.intent && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1 text-gray-500">
                <Tag className="w-3 h-3" />
                <span className="capitalize">{message.intent}</span>
              </div>
            </>
          )}

          {message.confidence !== undefined && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                {Math.round(message.confidence * 100)}% confident
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
