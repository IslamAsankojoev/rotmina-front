import { NextResponse } from 'next/server'
import { globalAuthConfig } from '@/src/app/api/auth-config'

function buildClearedResponse() {
  const response = NextResponse.json({ success: true })

  // Очищаем все потенциальные auth-куки из конфигурации
  for (const name of globalAuthConfig.cookiesToClear) {
    response.cookies.set(name, '', {
      expires: new Date(0),
      path: '/',
    })
  }

  return response
}

export async function DELETE() {
  return buildClearedResponse()
}

export async function POST() {
  return buildClearedResponse()
}

export async function GET() {
  return buildClearedResponse()
}


