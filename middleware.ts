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
  const isApiRoute = pathname.startsWith('/api')
  const isStaticFile = pathname.startsWith('/_next') || 
                       pathname.startsWith('/favicon.ico') ||
                       /\.(svg|png|jpg|jpeg|gif|webp)$/.test(pathname)

  // Пропускаем только статические файлы Next.js
  if (isStaticFile) {
    return NextResponse.next()
  }

  // Определяем locale для всех запросов (включая API)
  let locale: string
  
  // Проверяем, есть ли уже locale в пути (только для не-API роутов)
  if (!isApiRoute) {
    const pathnameHasLocale = locales.some(
      (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
    )

    // Если locale нет в пути, добавляем его (только для страниц)
    if (!pathnameHasLocale) {
      locale = getLocale(request)
      const newUrl = new URL(`/${locale}${pathname}`, request.url)
      
      // Сохраняем locale в cookie
      const response = NextResponse.redirect(newUrl)
      response.cookies.set('locale', locale, { path: '/' })
      
      return response
    }

    // Извлекаем locale из пути
    locale = pathname.split('/')[1]
  } else {
    // Для API-запросов определяем locale из cookie или заголовков
    locale = getLocale(request)
  }

  // Создаем response для всех запросов
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  
  // Устанавливаем cookie с locale для всех запросов
  response.cookies.set('locale', locale, { path: '/' })

  // Проверка защищенных роутов (только для страниц, не для API)
  if (!isApiRoute) {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    if(protectedRoutes.some(route => pathWithoutLocale.startsWith(route)) && !isAuthorized) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }

    if(authRoutes.some(route => pathWithoutLocale.startsWith(route)) && isAuthorized) {
      return NextResponse.redirect(new URL(`/${locale}/account`, request.url))
    }

    // Получаем курсы валют (только для страниц)
    const exchangeRates = await fetch(`http://31.97.79.157:7070/api/ExchangeRates`)
    const exchangeRatesData = await exchangeRates.json()
    
    response.cookies.set('rates', JSON.stringify(exchangeRatesData))
  }
  
  return response
}

export const config = {
  matcher: [
    // Обрабатываем все запросы, кроме статических файлов Next.js
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
