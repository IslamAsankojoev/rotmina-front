import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['/login', '/signup', '/reset-password']

const protectedRoutes = ['/account', '/cart', '/checkout', '/orders', '/wishlist']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const authCookie = request.cookies.get('Auth')
  const token = authCookie?.value

  const needsAuthCheck = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  const verifyToken = async () => {
    if (!token) return false
    try {
      const apiBase = process.env.API_INTERNAL_URL || ''
      const resp = await fetch(`${apiBase}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })
      return resp.ok
    } catch {
      return false
    }
  }

  if (needsAuthCheck) {
    const ok = await verifyToken()
    if (!ok) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (isAuthRoute) {
    const ok = await verifyToken()
    if (ok) {
      return NextResponse.redirect(new URL('/account', request.url))
    }
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
