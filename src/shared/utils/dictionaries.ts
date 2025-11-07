import 'server-only'

type Locale = 'en' | 'he'

const dictionaries = {
  en: () => import('../../../locales/en.json').then((module) => module.default),
  he: () => import('../../../locales/he.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}

