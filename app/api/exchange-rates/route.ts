import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiUrl = process.env.API_PAY_SERVICE
    
    if (!apiUrl) {
      return NextResponse.json(
        { error: 'API_INTERNAL_URL is not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(`${apiUrl}/api/ExchangeRates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      const jsonResponse = NextResponse.json(
        { error: 'Failed to fetch exchange rates' },
        { status: response.status }
      )
      return jsonResponse
    }

    const data = await response.json()
    
    // Обрабатываем ответ - может быть массив или объект с data
    const exchangeRates = Array.isArray(data) 
      ? data 
      : (data as { data?: unknown }).data || data

    if (!exchangeRates) {
      return NextResponse.json(
        { error: 'No exchange rates data received' },
        { status: 500 }
      )
    }

    // Создаем ответ с данными
    const jsonResponse = NextResponse.json(exchangeRates)
    
    // Устанавливаем куки в ответе
    // rates - сохраняем курсы валют
    jsonResponse.cookies.set('rates', JSON.stringify(exchangeRates), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней в секундах
      sameSite: 'lax',
      httpOnly: false, // false чтобы можно было читать на клиенте через js-cookie
    })
    
    // currency - устанавливаем дефолтную валюту ILS
    jsonResponse.cookies.set('currency', 'ILS', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      sameSite: 'lax',
      httpOnly: false,
    })

    return jsonResponse
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

