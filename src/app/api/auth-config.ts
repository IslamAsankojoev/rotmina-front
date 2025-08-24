/**
 * Конфигурация аутентификации для API
 */

export interface AuthConfig {
  // Куки для удаления при ошибке 401
  cookiesToClear: string[]
  
  // URL для перенаправления при ошибке 401
  redirectUrl: string
  
  // Автоматически перенаправлять при ошибке 401
  autoRedirect: boolean
  
  // Дополнительные действия при ошибке 401
  onUnauthorized?: () => void
}

export const defaultAuthConfig: AuthConfig = {
  cookiesToClear: [
    'jwtToken',
    'user',
    'auth',
    'token',
    'session',
    'refreshToken',
    'Auth',
    'Auth.sig',
  ],
  redirectUrl: '/login',
  autoRedirect: true,
}

/**
 * Глобальная конфигурация аутентификации
 */
export let globalAuthConfig: AuthConfig = { ...defaultAuthConfig }

/**
 * Обновляет глобальную конфигурацию аутентификации
 */
export const updateAuthConfig = (config: Partial<AuthConfig>): void => {
  globalAuthConfig = { ...globalAuthConfig, ...config }
}

/**
 * Сбрасывает конфигурацию к значениям по умолчанию
 */
export const resetAuthConfig = (): void => {
  globalAuthConfig = { ...defaultAuthConfig }
}
