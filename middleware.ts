import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'he']
const defaultLocale = 'en'

const authRoutes = ['/login', '/signup', '/reset-password', '/new-password']

const protectedRoutes = ['/account', '/cart', '/checkout', '/orders', '/wishlist']

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    return locale
  }

  const localeCookie = request.cookies.get('locale')
  if (localeCookie && locales.includes(localeCookie.value)) {
    return localeCookie.value
  }

  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
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

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.(svg|png|jpg|jpeg|gif|webp)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    
    newUrl.search = request.nextUrl.search
    
    const response = NextResponse.redirect(newUrl)
    response.cookies.set('locale', locale, { path: '/' })
    
    return response
  }

  const locale = pathname.split('/')[1]
  
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  response.cookies.set('locale', locale, { path: '/' })

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  
  if(protectedRoutes.some(route => pathWithoutLocale.startsWith(route)) && !isAuthorized) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if(authRoutes.some(route => pathWithoutLocale.startsWith(route)) && isAuthorized) {
    return NextResponse.redirect(new URL(`/${locale}/account`, request.url))
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
