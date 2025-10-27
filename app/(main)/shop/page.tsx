import React, { Suspense } from 'react'

import { ProductFilter, ProductPagination, ProductSort } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { ArrowDownUp } from 'lucide-react'
import { ProductGrid } from '@/src/entities/Product'

const Shop = () => {
  return (
    <>
      <div className="container my-10 flex justify-between md:my-20 pt-10 md:pt-20">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'SHOP', href: '/shop' },
          ]}
        />
        <Suspense fallback={<div>Loading filters...</div>}>
          <div className="flex gap-4">
            <ProductFilter />
            <div className="flex gap-2">
              <Typography variant="text_main" className="hidden md:inline">SORT BY:</Typography>
              <ArrowDownUp strokeWidth={0.75} className="inline md:hidden" />
              <ProductSort />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="container mt-8 mb-24">
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid />
        </Suspense>
        <Suspense fallback={<div>Loading pagination...</div>}>
          <ProductPagination />
        </Suspense>
      </div>
    </>
  )
}

export default Shop
