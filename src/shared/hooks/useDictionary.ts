'use client'

import { useLocale } from './useLocale'
import { useMemo } from 'react'

// Импортируем словари статически
import enDictionary from '../../../locales/en.json'
import heDictionary from '../../../locales/he.json'

type Dictionary = typeof enDictionary

const dictionaries: Record<'en' | 'he', Dictionary> = {
  en: enDictionary,
  he: heDictionary,
}

export function useDictionary() {
  const { locale } = useLocale()
  
  const dictionary = useMemo(() => {
    return dictionaries[locale as 'en' | 'he'] || dictionaries.en
  }, [locale])

  return { dictionary }
}

