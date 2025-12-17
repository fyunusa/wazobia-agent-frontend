export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  language?: string
  intent?: string
  confidence?: number
  timestamp: Date
}

export interface ChatResponse {
  response: string
  language: string
  intent: string
  metadata: {
    detection_confidence: number
    relevant_documents?: number
  }
}

export interface LanguageDetection {
  language: string
  confidence: number
  all_scores: {
    [key: string]: number
  }
  is_mixed_language: boolean
}

export interface TranslationRequest {
  text: string
  source_language: string
  target_language: string
}

export interface TranslationResponse {
  original_text: string
  translated_text: string
  source_language: string
  target_language: string
  metadata: {
    translation_method: string
  }
}

export type LanguageCode = 'ha' | 'pcm' | 'yo' | 'en'

export interface LanguageInfo {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
  color: string
}
