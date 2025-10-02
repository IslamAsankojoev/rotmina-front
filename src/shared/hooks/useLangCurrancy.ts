'use client'

import { useEffect } from 'react'

import { langCurrancyStore } from '@/src/app'
import { parse } from 'cookie'

export const useLangCurrancy = () => {
  const {
    lang,
    currency,
    exchangeRates,
    setLang,
    setCurrency,
    setExchangeRates,
  } = langCurrancyStore()

  const getPrice = (price: number | undefined) => {
    if (!price) return 0
    const exchangeRate = exchangeRates.find((rate) => rate.currency === currency)
    return (price * (exchangeRate?.rate || 1)).toFixed(0)
  }

  useEffect(() => {
    const cookies = parse(document.cookie)
    if (cookies.rates) {
      try {
        const ratesData = JSON.parse(cookies.rates)
        setExchangeRates(ratesData)
      } catch (error) {
        console.error('Error parsing rates cookie:', error)
      }
    }
  }, [setExchangeRates])

  return {
    lang,
    currency,
    exchangeRates,
    setLang,
    setCurrency,
    setExchangeRates,
    getPrice,
  }
}