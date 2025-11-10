'use client'

import { useLocale } from '@/src/shared'

import { Product } from '../model'

export const ProductDescription = ({ product }: { product: Product }) => {
  const { locale } = useLocale()
  return (
    <>
      {locale === 'en'
        ? product.description || product.descriptionHE
        : product.descriptionHE || product.description}
    </>
  )
}
