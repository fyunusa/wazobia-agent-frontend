import type { LanguageCode, LanguageInfo } from '../types'

export const LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  ha: {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Hausa',
    flag: '🇳🇬',
    color: '#008751'
  },
  pcm: {
    code: 'pcm',
    name: 'Nigerian Pidgin',
    nativeName: 'Naija',
    flag: '🇳🇬',
    color: '#00a862'
  },
  yo: {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    flag: '🇳🇬',
    color: '#006640'
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    color: '#1e40af'
  }
}

export const getLanguageInfo = (code: string): LanguageInfo => {
  return LANGUAGES[code as LanguageCode] || LANGUAGES.en
}

export const getLanguageColor = (code: string): string => {
  return getLanguageInfo(code).color
}

export const getLanguageFlag = (code: string): string => {
  return getLanguageInfo(code).flag
}
