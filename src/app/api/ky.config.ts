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
  hooks: {
    beforeRequest: [
      (request, options) => {
        if (options.method && ['post', 'put', 'patch'].includes(options.method.toLowerCase())) {
          if (!options.headers) {
            options.headers = new Headers()
          }
          
          const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
          if (!headers.has('Content-Type') && !headers.has('content-type')) {
            headers.set('Content-Type', 'application/json')
            options.headers = headers
          }
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