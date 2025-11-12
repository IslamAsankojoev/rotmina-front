'use client'

import { useLocale } from '@/src/shared'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

import { Product } from '../model'

export const ProductDescription = ({ product }: { product: Product }) => {
  const { locale } = useLocale()
  const rightContent =
    locale === 'en'
      ? product.description || product.descriptionHE
      : product.descriptionHE || product.description
  return (
    <>
      <BlocksRenderer content={rightContent} />
    </>
  )
}
