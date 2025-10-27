'use client'

import { useProducts } from '@/src/shared'

import { ProductCard } from './ProductCard'

export const dynamic = 'force-dynamic'

interface ProductGridProps {
  categoryId?: string
}

export const ProductGrid = ({ categoryId }: ProductGridProps) => {
  const { data, isLoading, error, refetchProducts } = useProducts(categoryId)

  if (isLoading) return <div>Loading...</div>
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
