import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Sparkles } from 'lucide-react'
import { chatApi } from '../services/api'
import type { Message } from '../types'
import MessageBubble from './MessageBubble'
import WelcomeScreen from './WelcomeScreen'

interface ChatInterfaceProps {
  preferredLanguages: string[]
}

export default function ChatInterface({ preferredLanguages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await chatApi.sendMessage(input.trim(), [], preferredLanguages)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        language: response.language,
        intent: response.intent,
        confidence: response.metadata.detection_confidence,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure the API server is running on http://localhost:8001',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          
          {loading && (
            <div className="flex items-center gap-3 text-neutral-600">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl shadow-sm">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
              </div>
              <div>
                <span className="text-sm font-medium">AI is thinking</span>
                <div className="flex gap-1 mt-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-warm-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="frosted border-t border-white/60 p-4 relative z-10">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message in any language..."
                className="input-field w-full pr-12"
                disabled={loading}
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 pointer-events-none" />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary px-6 flex items-center gap-2 min-w-[120px] justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">Sending</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-neutral-500 font-medium">
              Supports Hausa, Yoruba, Nigerian Pidgin, and English
            </p>
            <div className="flex items-center gap-2">
              <div className="badge badge-primary text-xs">
                🇳🇬 Nigerian Languages
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
