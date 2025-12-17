import axios from 'axios'
import type { 
  ChatResponse, 
  LanguageDetection, 
  TranslationRequest, 
  TranslationResponse 
} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const chatApi = {
  sendMessage: async (message: string, conversationHistory?: any[], preferredLanguages?: string[]): Promise<ChatResponse> => {
    const response = await api.post('/chat', {
      message,
      conversation_history: conversationHistory || [],
      preferred_languages: preferredLanguages && !preferredLanguages.includes('auto') ? preferredLanguages : undefined
    })
    return response.data
  },

  detectLanguage: async (text: string): Promise<LanguageDetection> => {
    const response = await api.post('/detect-language', { text })
    return response.data
  },

  translate: async (data: TranslationRequest): Promise<TranslationResponse> => {
    const response = await api.post('/translate', data)
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/stats')
    return response.data
  },

  healthCheck: async () => {
    const response = await api.get('/health')
    return response.data
  }
}

export default api
