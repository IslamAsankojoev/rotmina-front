import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Code, Currency, ExchangeRate } from '../../shared/constants'

interface LangCurrencyStore {
  lang: Code
  currency: Currency
  exchangeRates: ExchangeRate[]
  allowedCurrencies: Currency[]
  setLang: (lang: Code) => void
  setCurrency: (currency: Currency) => void
  setExchangeRates: (exchangeRates: ExchangeRate[]) => void
  setAllowedCurrencies: (allowedCurrencies: Currency[]) => void
}

export const langCurrencyStore = create<LangCurrencyStore>()(
  persist(
    (set) => ({
      lang: Code.EN,
      currency: Currency.USD,
      exchangeRates: [],
      allowedCurrencies: [Currency.ILS],
      setLang: (lang) => set({ lang }),
      setCurrency: (currency) => set({ currency }),
      setExchangeRates: (exchangeRates) =>
        set({
          exchangeRates: [
            ...exchangeRates,
            { currency: Currency.ILS, rate: 1 },
          ],
        }),
      setAllowedCurrencies: (allowedCurrencies) => set({ allowedCurrencies }),
    }),
    {
      name: 'langCurrancy',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
