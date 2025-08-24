/**
 * Примеры использования системы аутентификации
 */

import { updateAuthConfig, resetAuthConfig } from './auth-config'
import { clearAuthCookies, hasAuthCookie, getCookie } from './cookie-utils'

// Пример 1: Настройка конфигурации аутентификации
export const setupCustomAuth = () => {
  updateAuthConfig({
    cookiesToClear: ['jwtToken', 'user', 'customAuth'],
    redirectUrl: '/auth/login',
    autoRedirect: true,
    onUnauthorized: () => {
      console.log('Пользователь не авторизован, выполняем дополнительные действия')
      // Здесь можно добавить логику для очистки состояния приложения
      // например, очистить Redux store, localStorage и т.д.
    }
  })
}

// Пример 2: Отключение автоматического перенаправления
export const disableAutoRedirect = () => {
  updateAuthConfig({
    autoRedirect: false
  })
}

// Пример 3: Добавление дополнительных куки для удаления
export const addCustomCookies = () => {
  updateAuthConfig({
    cookiesToClear: ['jwtToken', 'user', 'customCookie1', 'customCookie2']
  })
}

// Пример 4: Ручная очистка куки
export const manualCleanup = () => {
  clearAuthCookies()
  console.log('Все аутентификационные куки удалены')
}

// Пример 5: Проверка состояния аутентификации
export const checkAuthStatus = () => {
  const hasAuth = hasAuthCookie()
  const jwtToken = getCookie('jwtToken')
  
  console.log('Есть ли аутентификационные куки:', hasAuth)
  console.log('JWT токен:', jwtToken ? 'Присутствует' : 'Отсутствует')
  
  return { hasAuth, jwtToken }
}

// Пример 6: Сброс к настройкам по умолчанию
export const resetToDefaults = () => {
  resetAuthConfig()
  console.log('Конфигурация сброшена к значениям по умолчанию')
}

// Пример 7: Настройка для разных окружений
export const setupEnvironmentConfig = (environment: 'dev' | 'staging' | 'prod') => {
  switch (environment) {
    case 'dev':
      updateAuthConfig({
        redirectUrl: '/dev/login',
        onUnauthorized: () => console.log('Dev: пользователь не авторизован')
      })
      break
      
    case 'staging':
      updateAuthConfig({
        redirectUrl: '/staging/auth',
        autoRedirect: false,
        onUnauthorized: () => console.log('Staging: требуется ручная обработка')
      })
      break
      
    case 'prod':
      updateAuthConfig({
        redirectUrl: '/login',
        autoRedirect: true,
        onUnauthorized: () => {
          console.log('Prod: выполняем полную очистку')
          // Дополнительная логика для продакшена
        }
      })
      break
  }
}
