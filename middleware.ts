import { NextRequest, NextResponse } from 'next/server'

const authRoutes = ['/login', '/signup', '/reset-password']

const protectedRoutes = ['/account', '/cart', '/checkout', '/orders']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isAuthorized = request.cookies.get('Auth')

  if(protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthorized) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(authRoutes.some(route => pathname.startsWith(route)) && isAuthorized) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}

export const config = {
  matcher: [...authRoutes, ...protectedRoutes],
}
