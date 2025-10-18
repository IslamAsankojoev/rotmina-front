// Типы ошибок Strapi
export interface StrapiError {
  status: number
  name: string
  message: string
  details?: Record<string, unknown>
}

export interface StrapiErrorResponse {
  data: null
  error: StrapiError
}

// Типы для различных видов ошибок
export interface ValidationError {
  field: string
  message: string
}

export interface StrapiValidationError extends StrapiError {
  details: {
    errors: ValidationError[]
  }
}

// Типы для обработки ошибок
export interface ErrorHandlerOptions {
  showToast?: boolean
  logError?: boolean
  fallbackMessage?: string
  onError?: (error: StrapiError) => void
}

export interface ProcessedError {
  message: string
  status: number
  type: 'validation' | 'authentication' | 'authorization' | 'not_found' | 'server' | 'network' | 'unknown'
  details?: Record<string, unknown>
  originalError: StrapiError
}

// Константы для типов ошибок
export const ERROR_TYPES = {
  VALIDATION: 'validation' as const,
  AUTHENTICATION: 'authentication' as const,
  AUTHORIZATION: 'authorization' as const,
  NOT_FOUND: 'not_found' as const,
  SERVER: 'server' as const,
  NETWORK: 'network' as const,
  UNKNOWN: 'unknown' as const,
} as const

export type ErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES]
