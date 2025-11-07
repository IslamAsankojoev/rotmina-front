'use server'

import { cookies } from 'next/headers'
import ky from 'ky'

/**
 * Создает экземпляр ky с cookies для использования в Server Components
 */
export function createServerApi() {
  const cookieStore = cookies()
  
  // Форматируем cookies в строку для заголовка Cookie
  const cookiePairs: string[] = []
  cookieStore.getAll().forEach((cookie) => {
    cookiePairs.push(`${cookie.name}=${cookie.value}`)
  })
  const cookieHeader = cookiePairs.join('; ')

  return ky.create({
    prefixUrl: process.env.API_INTERNAL_URL + '/api',
    hooks: {
      beforeRequest: [
        (request, options) => {
          if (!options.headers) {
            options.headers = new Headers()
          }
          
          const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
          
          // Добавляем cookies в заголовок
          if (cookieHeader) {
            headers.set('Cookie', cookieHeader)
          }
          
          // Добавляем Content-Type для POST/PUT/PATCH запросов
          if (options.method && ['post', 'put', 'patch'].includes(options.method.toLowerCase())) {
            if (!headers.has('Content-Type') && !headers.has('content-type')) {
              headers.set('Content-Type', 'application/json')
            }
          }
          
          options.headers = headers
        },
      ],
    },
  })
}

