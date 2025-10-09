import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Code, Currency, ExchangeRate } from '../../shared/constants'

interface LangCurrancyStore {
  lang: Code
  currency: Currency
  exchangeRates: ExchangeRate[]
  setLang: (lang: Code) => void
  setCurrency: (currency: Currency) => void
  setExchangeRates: (exchangeRates: ExchangeRate[]) => void
}

export const langCurrancyStore = create<LangCurrancyStore>()(
  persist(
    (set) => ({
      lang: Code.EN,
      currency: Currency.USD,
      exchangeRates: [],
      setLang: (lang) => set({ lang }),
      setCurrency: (currency) => set({ currency }),
      setExchangeRates: (exchangeRates) =>
        set({
          exchangeRates: [
            ...exchangeRates,
            { currency: Currency.ILS, rate: 1 },
          ],
        }),
    }),
    {
      name: 'langCurrancy',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
