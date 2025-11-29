'use client'

import { useLocale } from '@/src/shared'

import { Product } from '../model'

export const ProductTitle = ({ product }: { product: Product }) => {
  const { locale } = useLocale()
  return (
    <>
      {locale === 'en'
        ? product?.title || product?.titleHE
        : product?.titleHE || product?.title}
    </>
  )
}
