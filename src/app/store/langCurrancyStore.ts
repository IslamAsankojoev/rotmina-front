import { create } from 'zustand'

import { Code, Currency, ExchangeRate } from '../../shared/constants'

export const langCurrancyStore = create<{
  lang: Code
  currency: Currency
  exchangeRates: ExchangeRate[]
  setLang: (lang: Code) => void
  setCurrency: (currency: Currency) => void
  setExchangeRates: (exchangeRates: ExchangeRate[]) => void
}>((set) => ({
  lang: Code.EN,
  currency: Currency.USD,
  exchangeRates: [],
  setLang: (lang) => set({ lang }),
  setCurrency: (currency) => set({ currency }),
  setExchangeRates: (exchangeRates) =>
    set({
      exchangeRates: [...exchangeRates, { currency: Currency.ILS, rate: 1 }],
    }),
}))
