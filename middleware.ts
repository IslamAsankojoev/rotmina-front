import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'he']
const defaultLocale = 'en'

const authRoutes = ['/login', '/signup', '/reset-password']

const protectedRoutes = ['/account', '/cart', '/checkout', '/orders', '/wishlist']

// Функция для определения предпочитаемого языка
function getLocale(request: NextRequest): string {
  // Проверяем, есть ли уже locale в пути
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    return locale
  }

  // Проверяем cookie с сохраненным языком
  const localeCookie = request.cookies.get('locale')
  if (localeCookie && locales.includes(localeCookie.value)) {
    return localeCookie.value
  }

  // Определяем язык из заголовка Accept-Language
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    // Простая проверка для he (иврит) и en (английский)
    if (acceptLanguage.includes('he')) {
      return 'he'
    }
    if (acceptLanguage.includes('en')) {
      return 'en'
    }
  }

  return defaultLocale
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isAuthorized = request.cookies.get('Auth')

  // Пропускаем статические файлы и API роуты
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    /\.(svg|png|jpg|jpeg|gif|webp)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Проверяем, есть ли уже locale в пути
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Если locale нет в пути, добавляем его
  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    
    // Сохраняем locale в cookie
    const response = NextResponse.redirect(newUrl)
    response.cookies.set('locale', locale, { path: '/' })
    
    return response
  }

  // Извлекаем locale из пути
  const locale = pathname.split('/')[1]
  
  // Обновляем cookie с locale
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  response.cookies.set('locale', locale, { path: '/' })

  // Проверка защищенных роутов (учитываем locale в пути)
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  
  if(protectedRoutes.some(route => pathWithoutLocale.startsWith(route)) && !isAuthorized) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if(authRoutes.some(route => pathWithoutLocale.startsWith(route)) && isAuthorized) {
    return NextResponse.redirect(new URL(`/${locale}/account`, request.url))
  }

  // Получаем курсы валют
  const exchangeRates = await fetch(`http://31.97.79.157:7070/api/ExchangeRates`)
  const exchangeRatesData = await exchangeRates.json()
  
  response.cookies.set('rates', JSON.stringify(exchangeRatesData))
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
