import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Получаем заголовки из запроса
    const headers: Record<string, string> = {}
    
    // Копируем необходимые заголовки Tranzila
    const appKey = request.headers.get('X-tranzila-api-app-key')
    const requestTime = request.headers.get('X-tranzila-api-request-time')
    const nonce = request.headers.get('X-tranzila-api-nonce')
    const accessToken = request.headers.get('X-tranzila-api-access-token')
    
    if (appKey) headers['X-tranzila-api-app-key'] = appKey
    if (requestTime) headers['X-tranzila-api-request-time'] = requestTime
    if (nonce) headers['X-tranzila-api-nonce'] = nonce
    if (accessToken) headers['X-tranzila-api-access-token'] = accessToken
    
    // Добавляем Content-Type
    headers['Content-Type'] = 'application/json'
    
    const response = await fetch(
      'https://api.tranzila.com/v1/transaction/credit_card/3ds/complete',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }
    )
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Tranzila API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to complete payment', details: errorText },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in tranzilla complete payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

