'use client'

import { useLocale } from '@/src/shared'

import { Category } from '../model'

export const CategoryTitle = ({ category }: { category: Category }) => {
  const { locale } = useLocale()
  return (
    <>
      {locale === 'en'
        ? category?.name || category?.nameHE
        : category?.nameHE || category?.name}
    </>
  )
}
