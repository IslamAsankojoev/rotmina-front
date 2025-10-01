import { create } from 'zustand'
import { Code, Currency } from '../constants'

export const useLangCurrancy = create<{
  lang: Code
  currency: Currency
  setLang: (lang: Code) => void
  setCurrency: (currency: Currency) => void
}>((set) => ({
  lang: Code.EN,
  currency: Currency.USD,
  setLang: (lang) => set({ lang }),
  setCurrency: (currency) => set({ currency }),
}))