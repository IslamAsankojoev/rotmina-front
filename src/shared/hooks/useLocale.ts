'use client'

import { usePathname } from 'next/navigation'
import { getLocaleFromPath, addLocaleToPath } from '../utils/locale'

/**
 * Хук для получения текущего locale из URL
 */
export function useLocale() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname) || 'en'
  const isRTL = locale === 'he'
  /**
   * Добавляет locale к пути
   */
  const localizePath = (path: string) => {
    return addLocaleToPath(path, locale)
  }

  return {
    locale,
    localizePath,
    isRTL,
  }
}

