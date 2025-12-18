import axios from 'axios'
import type { 
  ChatResponse, 
  LanguageDetection, 
  TranslationRequest, 
  TranslationResponse 
} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://wazobia-agent-backend-1.onrender.com/'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const chatApi = {
  sendMessage: async (message: string, conversationHistory?: any[], preferredLanguages?: string[]): Promise<ChatResponse> => {
    const token = localStorage.getItem('auth_token')
    const response = await api.post('/chat', {
      message,
      conversation_history: conversationHistory || [],
      preferred_languages: preferredLanguages && !preferredLanguages.includes('auto') ? preferredLanguages : undefined
    }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
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

// Backend health check with timeout
export const checkBackendHealth = async (timeoutMs: number = 10000): Promise<boolean> => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    return response.ok
  } catch (error) {
    return false
  }
}

// Poll backend until it's awake
export const waitForBackend = async (
  maxAttempts: number = 20,
  delayMs: number = 3000
): Promise<boolean> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Checking backend health... Attempt ${attempt}/${maxAttempts}`)
    
    const isHealthy = await checkBackendHealth()
    if (isHealthy) {
      console.log('Backend is healthy!')
      return true
    }
    
    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
  
  return false
}

export const authApi = {
  signup: async (email: string, username: string, password: string) => {
    const response = await api.post('/auth/signup', { email, username, password })
    return response.data
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  logout: async () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      await api.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    }
  },

  getMe: async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return null
    const response = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
}

export const conversationApi = {
  getConversations: async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return []
    const response = await api.get('/conversations/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  },

  getStats: async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return null
    const response = await api.get('/conversations/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  },

  createConversation: async (title: string) => {
    const token = localStorage.getItem('auth_token')
    const response = await api.post('/conversations/', 
      { title },
      { headers: { Authorization: `Bearer ${token}` }}
    )
    return response.data
  },

  getMessages: async (conversationId: number) => {
    const token = localStorage.getItem('auth_token')
    const response = await api.get(`/conversations/${conversationId}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
}

export default api
