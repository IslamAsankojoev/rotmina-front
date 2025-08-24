import { globalAuthConfig } from './auth-config'

/**
 * Утилиты для работы с куками
 */

/**
 * Безопасно удаляет куки по имени
 * @param name - имя куки для удаления
 * @param path - путь куки (по умолчанию '/')
 * @param domain - домен куки (опционально)
 */
export const deleteCookie = (name: string, path: string = '/', domain?: string): void => {
  if (typeof document === 'undefined') return // Проверяем, что мы в браузере
  
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`
  
  if (domain) {
    cookieString += `; domain=${domain}`
  }
  
  // Добавляем secure и sameSite для безопасности
  if (window.location.protocol === 'https:') {
    cookieString += '; secure'
  }
  
  cookieString += '; samesite=strict'
  
  document.cookie = cookieString
}

/**
 * Удаляет все аутентификационные куки согласно конфигурации
 */
export const clearAuthCookies = (): void => {
  globalAuthConfig.cookiesToClear.forEach(cookieName => {
    deleteCookie(cookieName)
  })
}

/**
 * Удаляет конкретные куки по списку
 * @param cookieNames - массив имен куки для удаления
 */
export const clearSpecificCookies = (cookieNames: string[]): void => {
  cookieNames.forEach(cookieName => {
    deleteCookie(cookieName)
  })
}

/**
 * Проверяет, существует ли кука
 * @param name - имя куки
 * @returns true если кука существует
 */
export const hasCookie = (name: string): boolean => {
  if (typeof document === 'undefined') return false
  
  return document.cookie.split(';').some(cookie => 
    cookie.trim().startsWith(`${name}=`)
  )
}

/**
 * Получает значение куки по имени
 * @param name - имя куки
 * @returns значение куки или null
 */
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const cookie = cookies.find(c => c.trim().startsWith(`${name}=`))
  
  if (cookie) {
    return cookie.split('=')[1]
  }
  
  return null
}

/**
 * Проверяет, есть ли хотя бы одна аутентификационная кука
 * @returns true если есть хотя бы одна аутентификационная кука
 */
export const hasAuthCookie = (): boolean => {
  return globalAuthConfig.cookiesToClear.some(cookieName => hasCookie(cookieName))
}
