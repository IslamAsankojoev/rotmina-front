import { toast } from 'sonner'
import type { 
  StrapiError, 
  ProcessedError, 
  ErrorHandlerOptions,
  ErrorType
} from '../types/errors'
import { ERROR_TYPES } from '../types/errors'

/**
 * Определяет тип ошибки на основе статус кода
 */
export const getErrorType = (status: number): ErrorType => {
  if (status >= 400 && status < 500) {
    switch (status) {
      case 400:
        return ERROR_TYPES.VALIDATION
      case 401:
        return ERROR_TYPES.AUTHENTICATION
      case 403:
        return ERROR_TYPES.AUTHORIZATION
      case 404:
        return ERROR_TYPES.NOT_FOUND
      default:
        return ERROR_TYPES.VALIDATION
    }
  }
  
  if (status >= 500) {
    return ERROR_TYPES.SERVER
  }
  
  return ERROR_TYPES.UNKNOWN
}

/**
 * Извлекает сообщение об ошибке из ответа Strapi
 */
export const extractErrorMessage = (error: StrapiError): string => {
  // Если есть детали валидации, показываем первую ошибку
  if (error.details?.errors && Array.isArray(error.details.errors) && error.details.errors.length > 0) {
    return error.details.errors[0].message
  }
  
  // Если есть детали с полями
  if (error.details && typeof error.details === 'object') {
    const firstError = Object.values(error.details).find(value => 
      typeof value === 'string' || (Array.isArray(value) && value.length > 0)
    )
    
    if (firstError) {
      if (typeof firstError === 'string') {
        return firstError
      }
      if (Array.isArray(firstError) && firstError.length > 0) {
        return String(firstError[0])
      }
    }
  }
  
  // Возвращаем основное сообщение об ошибке
  return error.message || 'An unknown error occurred'
}

/**
 * Обрабатывает ошибку Strapi и возвращает структурированную информацию
 */
export const processStrapiError = async (error: unknown): Promise<ProcessedError> => {
  // Если это уже обработанная ошибка
  if (error && typeof error === 'object' && 'type' in error && 'status' in error) {
    return error as ProcessedError
  }
  
  // Если это ошибка сети
  if (error && typeof error === 'object' && 'name' in error) {
    const errorObj = error as { name: string; message?: string }
    if (errorObj.name === 'NetworkError' || 
        (typeof errorObj.message === 'string' && errorObj.message.includes('fetch'))) {
      return {
        message: 'Network error. Please check your internet connection.',
        status: 0,
        type: ERROR_TYPES.NETWORK,
        originalError: error as StrapiError
      }
    }
  }
  
  // Если это HTTP ошибка от ky/fetch
  if (error && typeof error === 'object' && 'response' in error) {
    const httpError = error as { response: Response; message: string }
    
    try {
      // Пытаемся получить JSON ответ от сервера
      const responseData = await httpError.response.json()
      
      // Если это ошибка Strapi в формате { data: null, error: {...} }
      if (responseData && typeof responseData === 'object' && 'error' in responseData) {
        const strapiError = responseData.error as StrapiError
        
        return {
          message: extractErrorMessage(strapiError),
          status: strapiError.status,
          type: getErrorType(strapiError.status),
          details: strapiError.details,
          originalError: strapiError
        }
      }
    } catch {
      // Если не удалось распарсить JSON, используем HTTP статус
    }
    
    // Если не удалось получить JSON или это не Strapi ошибка
    return {
      message: httpError.message,
      status: httpError.response.status,
      type: getErrorType(httpError.response.status),
      originalError: error as unknown as StrapiError
    }
  }
  
  // Если это ошибка Strapi в прямом формате
  if (error && typeof error === 'object' && ('error' in error || 'status' in error)) {
    const strapiError = ('error' in error ? error.error : error) as StrapiError
    const status = strapiError.status || ('status' in error ? error.status : 500) as number
    
    return {
      message: extractErrorMessage(strapiError),
      status,
      type: getErrorType(status),
      details: strapiError.details,
      originalError: strapiError
    }
  }
  
  // Неизвестная ошибка
  const unknownError = error as StrapiError
  return {
    message: unknownError.message || 'An unknown error occurred',
    status: 500,
    type: ERROR_TYPES.UNKNOWN,
    originalError: unknownError
  }
}

/**
 * Показывает уведомление об ошибке
 */
export const showErrorToast = (error: ProcessedError, fallbackMessage?: string): void => {
  // Показываем только сообщение с сервера, если оно есть
  const serverMessage = error.message
  
  // Если есть сообщение с сервера, показываем его
  if (serverMessage) {
    toast.error(serverMessage)
    return
  }
  
  // Если нет сообщения с сервера, показываем fallback только для определенных типов ошибок
  switch (error.type) {
    case ERROR_TYPES.NETWORK:
      toast.error('Network error. Please check your connection')
      break
    case ERROR_TYPES.SERVER:
      toast.error('Server error. Please try again later')
      break
    default:
      // Для остальных случаев показываем fallback или общее сообщение
      toast.error(fallbackMessage || 'An error occurred')
  }
}

/**
 * Логирует ошибку в консоль
 */
export const logError = (error: ProcessedError, context?: string): void => {
  const logMessage = context ? `[${context}] ${error.message}` : error.message
  
  console.error(logMessage, {
    type: error.type,
    status: error.status,
    details: error.details,
    originalError: error.originalError
  })
}

/**
 * Основная функция для обработки ошибок Strapi
 */
export const handleStrapiError = async (
  error: unknown, 
  options: ErrorHandlerOptions = {}
): Promise<ProcessedError> => {
  const {
    showToast = true,
    logError: shouldLog = true,
    fallbackMessage,
    onError
  } = options
  
  const processedError = await processStrapiError(error)
  
  // Показываем уведомление
  if (showToast) {
    showErrorToast(processedError, fallbackMessage)
  }
  
  // Логируем ошибку
  if (shouldLog) {
    logError(processedError)
  }
  
  // Вызываем пользовательский обработчик
  if (onError) {
    onError(processedError.originalError)
  }
  
  return processedError
}

/**
 * Синхронная версия обработки ошибок для React Query
 */
export const processStrapiErrorSync = (error: unknown): ProcessedError => {
  // Если это уже обработанная ошибка
  if (error && typeof error === 'object' && 'type' in error && 'status' in error) {
    return error as ProcessedError
  }
  
  // Если это ошибка сети
  if (error && typeof error === 'object' && 'name' in error) {
    const errorObj = error as { name: string; message?: string }
    if (errorObj.name === 'NetworkError' || 
        (typeof errorObj.message === 'string' && errorObj.message.includes('fetch'))) {
      return {
        message: 'Network error. Please check your internet connection.',
        status: 0,
        type: ERROR_TYPES.NETWORK,
        originalError: error as StrapiError
      }
    }
  }
  
  // Если это HTTP ошибка от ky/fetch
  if (error && typeof error === 'object' && 'response' in error) {
    const httpError = error as { response: Response; message: string }
    
    // Пытаемся извлечь сообщение из HTTP ошибки
    let message = httpError.message
    
    // Если сообщение содержит "Request failed with status code", попробуем извлечь более полезную информацию
    if (message.includes('Request failed with status code')) {
      const statusMatch = message.match(/status code (\d+)/)
      const status = statusMatch ? parseInt(statusMatch[1]) : httpError.response.status
      
      // Для ошибок валидации (400) показываем более понятное сообщение
      if (status === 400) {
        message = 'Please check the entered data'
      } else if (status === 401) {
        message = 'Invalid login or password'
      } else if (status === 403) {
        message = 'Insufficient permissions to perform the operation'
      } else if (status === 404) {
        message = 'The requested resource was not found'
      } else if (status >= 500) {
        message = 'Server error. Please try again later'
      }
    }
    
    return {
      message,
      status: httpError.response.status,
      type: getErrorType(httpError.response.status),
      originalError: error as unknown as StrapiError
    }
  }
  
  // Если это ошибка Strapi в прямом формате
  if (error && typeof error === 'object' && ('error' in error || 'status' in error)) {
    const strapiError = ('error' in error ? error.error : error) as StrapiError
    const status = strapiError.status || ('status' in error ? error.status : 500) as number
    
    return {
      message: extractErrorMessage(strapiError),
      status,
      type: getErrorType(status),
      details: strapiError.details,
      originalError: strapiError
    }
  }
  
  // Неизвестная ошибка
  const unknownError = error as StrapiError
  return {
    message: unknownError.message || 'An unknown error occurred',
    status: 500,
    type: ERROR_TYPES.UNKNOWN,
    originalError: unknownError
  }
}

/**
 * Синхронная версия основной функции для обработки ошибок Strapi
 */
export const handleStrapiErrorSync = (
  error: unknown, 
  options: ErrorHandlerOptions = {}
): ProcessedError => {
  const {
    showToast = true,
    logError: shouldLog = true,
    fallbackMessage,
    onError
  } = options
  
  const processedError = processStrapiErrorSync(error)
  
  // Показываем уведомление
  if (showToast) {
    showErrorToast(processedError, fallbackMessage)
  }
  
  // Логируем ошибку
  if (shouldLog) {
    logError(processedError)
  }
  
  // Вызываем пользовательский обработчик
  if (onError) {
    onError(processedError.originalError)
  }
  
  return processedError
}

/**
 * Асинхронная функция для извлечения сообщения об ошибке из HTTP ответа
 */
export const extractServerErrorMessage = async (error: unknown): Promise<string | null> => {
  if (error && typeof error === 'object' && 'response' in error) {
    const httpError = error as { response: Response }
    
    try {
      const responseData = await httpError.response.json()
      
      // Если это ошибка Strapi в формате { data: null, error: {...} }
      if (responseData && typeof responseData === 'object' && 'error' in responseData) {
        const strapiError = responseData.error as StrapiError
        return extractErrorMessage(strapiError)
      }
    } catch {
      // Если не удалось распарсить JSON, возвращаем null
    }
  }
  
  return null
}

/**
 * Улучшенная версия обработки ошибок с попыткой извлечения серверного сообщения
 */
export const processStrapiErrorWithServerMessage = async (error: unknown): Promise<ProcessedError> => {
  // Сначала пытаемся извлечь серверное сообщение
  const serverMessage = await extractServerErrorMessage(error)
  
  if (serverMessage) {
    // Если есть серверное сообщение, используем его
    const httpError = error as { response: Response }
    return {
      message: serverMessage,
      status: httpError.response.status,
      type: getErrorType(httpError.response.status),
      originalError: error as unknown as StrapiError
    }
  }
  
  // Если нет серверного сообщения, используем синхронную версию
  return processStrapiErrorSync(error)
}

/**
 * Создает обработчик ошибок для React Query мутаций
 */
export const createErrorHandler = (options: ErrorHandlerOptions = {}) => {
  return (error: unknown) => {
    return handleStrapiErrorSync(error, options)
  }
}

/**
 * Создает асинхронный обработчик ошибок для React Query мутаций с извлечением серверного сообщения
 */
export const createAsyncErrorHandler = (options: ErrorHandlerOptions = {}) => {
  return async (error: unknown) => {
    const processedError = await processStrapiErrorWithServerMessage(error)
    
    const {
      showToast = true,
      logError: shouldLog = true,
      fallbackMessage,
      onError
    } = options
    
    // Показываем уведомление
    if (showToast) {
      showErrorToast(processedError, fallbackMessage)
    }
    
    // Логируем ошибку
    if (shouldLog) {
      logError(processedError)
    }
    
    // Вызываем пользовательский обработчик
    if (onError) {
      onError(processedError.originalError)
    }
    
    return processedError
  }
}

/**
 * Проверяет, является ли ошибка ошибкой валидации
 */
export const isValidationError = (error: ProcessedError): boolean => {
  return error.type === ERROR_TYPES.VALIDATION
}

/**
 * Проверяет, является ли ошибка ошибкой аутентификации
 */
export const isAuthenticationError = (error: ProcessedError): boolean => {
  return error.type === ERROR_TYPES.AUTHENTICATION
}

/**
 * Проверяет, является ли ошибка ошибкой авторизации
 */
export const isAuthorizationError = (error: ProcessedError): boolean => {
  return error.type === ERROR_TYPES.AUTHORIZATION
}

/**
 * Проверяет, является ли ошибка ошибкой "не найдено"
 */
export const isNotFoundError = (error: ProcessedError): boolean => {
  return error.type === ERROR_TYPES.NOT_FOUND
}

/**
 * Проверяет, является ли ошибка серверной ошибкой
 */
export const isServerError = (error: ProcessedError): boolean => {
  return error.type === ERROR_TYPES.SERVER
}

/**
 * Проверяет, является ли ошибка сетевой ошибкой
 */
export const isNetworkError = (error: ProcessedError): boolean => {
  return error.type === ERROR_TYPES.NETWORK
}
