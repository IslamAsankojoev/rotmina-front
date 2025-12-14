'use client'

import { useEffect } from 'react'

import { langCurrencyStore } from '@/src/app'
import { parse } from 'cookie'

import { Code, Currency } from '../constants'

export const useLangCurrency = () => {
  const {
    lang,
    currency,
    exchangeRates,
    allowedCurrencies,
    setLang,
    setCurrency,
    setExchangeRates,
    setAllowedCurrencies,
  } = langCurrencyStore()

  const getPrice = (price: number | undefined) => {
    if (!price) return 0
    const exchangeRate = exchangeRates.find(
      (rate) => rate.currency === currency,
    )
    return Number((price / (exchangeRate?.rate || 1)).toFixed(0))
  }

  const convertToILS = (price: number) => {
    if (!price) return 0
    const exchangeRate = exchangeRates.find(
      (rate) => rate.currency === currency,
    )
    return price * (exchangeRate?.rate || 1)
  }

  useEffect(() => {
    const cookies = parse(document.cookie)
    if (cookies.rates) {
      try {
        const ratesData = [
          ...JSON.parse(cookies.rates),
          { currency: Currency.ILS, rate: 1 },
        ]
        setExchangeRates(ratesData)
        if (lang === Code.HE) {
          setCurrency(Currency.ILS)
          setAllowedCurrencies([Currency.ILS])
        } else {
          setCurrency(Currency.USD)
          setAllowedCurrencies([
            Currency.GBP,
            Currency.CHF,
            Currency.EUR,
            Currency.USD,
            Currency.AUD,
            Currency.CAD,
          ])
        }
      } catch {
        setAllowedCurrencies([Currency.ILS])
      }
    }
  }, [setExchangeRates, setAllowedCurrencies, lang, setCurrency])

  return {
    lang,
    currency,
    exchangeRates,
    allowedCurrencies,
    setLang,
    setCurrency,
    setExchangeRates,
    setAllowedCurrencies,
    getPrice,
    convertToILS,
  }
}
