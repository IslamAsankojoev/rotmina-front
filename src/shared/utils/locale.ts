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

