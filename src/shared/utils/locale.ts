/**
 * Утилита для работы с локализованными путями
 */

/**
 * Добавляет locale к пути, если его еще нет
 */
export function addLocaleToPath(path: string, locale: string): string {
  // Если путь уже начинается с locale, возвращаем как есть
  if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
    return path
  }
  
  // Если путь начинается с другого locale, заменяем его
  if (path.startsWith('/en/') || path.startsWith('/he/')) {
    const pathWithoutLocale = path.replace(/^\/(en|he)/, '')
    return `/${locale}${pathWithoutLocale || '/'}`
  }
  
  // Добавляем locale к пути
  return `/${locale}${path === '/' ? '' : path}`
}

/**
 * Удаляет locale из пути
 */
export function removeLocaleFromPath(path: string): string {
  return path.replace(/^\/(en|he)/, '') || '/'
}

/**
 * Получает locale из пути
 */
export function getLocaleFromPath(path: string): string | null {
  const match = path.match(/^\/(en|he)(\/|$)/)
  return match ? match[1] : null
}

/**
 * Получает locale на сервере из params, headers или cookies
 */
export async function getServerLocale(
  params?: Promise<{ locale: string }> | { locale: string },
  cookies?: { get: (name: string) => { value: string } | undefined },
  headers?: Headers
): Promise<string> {
  // Пытаемся получить из params
  if (params) {
    const resolvedParams = params instanceof Promise ? await params : params
    if (resolvedParams?.locale && ['en', 'he'].includes(resolvedParams.locale)) {
      return resolvedParams.locale
    }
  }

  // Пытаемся получить из headers (referer или x-url)
  if (headers) {
    const referer = headers.get('referer') || ''
    const url = headers.get('x-url') || ''
    const pathname = referer ? new URL(referer).pathname : url
    const localeFromPath = getLocaleFromPath(pathname)
    if (localeFromPath) {
      return localeFromPath
    }
  }

  // Пытаемся получить из cookies
  if (cookies) {
    const localeCookie = cookies.get('locale')
    if (localeCookie?.value && ['en', 'he'].includes(localeCookie.value)) {
      return localeCookie.value
    }
  }

  // Возвращаем дефолтный
  return 'en'
}

