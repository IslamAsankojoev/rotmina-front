'use client'

import { useLocale } from '@/src/shared'

import { Category } from '../model'

export const CategoryDescription = ({ category }: { category: Category }) => {
  const { locale } = useLocale()
  return (
    <>
      {locale === 'en'
        ? category?.description || category?.descriptionHE
        : category?.descriptionHE || category?.description}
    </>
  )
}
