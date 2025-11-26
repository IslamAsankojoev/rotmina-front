'use client'

import { Typography, useDictionary, useProducts } from '@/src/shared'

import { ProductCard } from './ProductCard'

export const dynamic = 'force-dynamic'

export const ProductGrid = () => {
  const { dictionary } = useDictionary()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .common || {
    loading: 'Loading...',
  }
  const { data, isLoading, error, refetchProducts } = useProducts()

  if (isLoading) return <Typography variant="text_main">{t.loading}</Typography>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
      {data?.data.map((product, index) => (
        <ProductCard
          key={product.documentId}
          product={product}
          index={index}
          refetchProducts={refetchProducts}
        />
      ))}
    </div>
  )
}
