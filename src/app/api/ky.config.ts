import ky, { type HTTPError } from 'ky'
import { handleStrapiErrorSync } from '@/src/shared/utils/errorHandling'
import type { ProcessedError } from '@/src/shared/types/errors'

// Интерфейс для расширенной ошибки с обработанной информацией
interface ExtendedHTTPError extends HTTPError {
  processedError?: ProcessedError
}

export const api = ky.create({
  prefixUrl: typeof window !== 'undefined' ? '/api' : process.env.API_INTERNAL_URL + '/api',
  credentials: 'include',
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request, options) => {
        if (options.method && ['post', 'put', 'patch'].includes(options.method.toLowerCase())) {
          // Сохраняем существующие заголовки
          const existingHeaders = options.headers instanceof Headers 
            ? options.headers 
            : options.headers 
              ? new Headers(options.headers)
              : new Headers()
          
          // Добавляем Content-Type только если его нет
          if (!existingHeaders.has('Content-Type') && !existingHeaders.has('content-type')) {
            existingHeaders.set('Content-Type', 'application/json')
          }
          
          // Сохраняем обновленные заголовки обратно в options
          options.headers = existingHeaders
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          // Обработка ошибки аутентификации
          // Можно добавить редирект на страницу входа
        }
      },
    ],
    beforeError: [
      (error) => {
        // Обрабатываем ошибки перед их выбрасыванием
        const processedError = handleStrapiErrorSync(error, {
          showToast: false, // Не показываем toast здесь, это будет делаться в компонентах
          logError: true,
        })
        
        // Добавляем обработанную ошибку к оригинальной
        const extendedError = error as ExtendedHTTPError
        extendedError.processedError = processedError
        
        return extendedError
      },
    ],
  },
})