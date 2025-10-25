import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['/login', '/signup', '/reset-password']

const protectedRoutes = ['/account', '/cart', '/checkout', '/orders']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isAuthorized = request.cookies.get('Auth')

  if(protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthorized) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(authRoutes.some(route => pathname.startsWith(route)) && isAuthorized) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  const exchangeRates = await fetch(`http://31.97.79.157:7070/api/ExchangeRates`)
  const exchangeRatesData = await exchangeRates.json()

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  
  response.cookies.set('rates', JSON.stringify(exchangeRatesData || [{"currency":"GBP","rate":4.3881},{"currency":"CHF","rate":4.138},{"currency":"EUR","rate":3.8206},{"currency":"USD","rate":3.298},{"currency":"AUD","rate":2.1411},{"currency":"CAD","rate":2.3524}]), {
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
