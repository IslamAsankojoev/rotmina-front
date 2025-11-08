'use client'

import React, { Suspense } from 'react'

import { ProductFilter, ProductPagination, ProductSort } from '@/src/features'
import { Breadcrumbs, Typography, useDictionary, useLocale } from '@/src/shared'
import { ArrowDownUp } from 'lucide-react'
import { ProductGrid } from '@/src/entities/Product'

const Shop = () => {
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).shop || {
    home: 'HOME',
    shopBreadcrumb: 'SHOP',
    sortBy: 'SORT BY:',
    loadingFilters: 'Loading filters...',
    loadingProducts: 'Loading products...',
    loadingPagination: 'Loading pagination...',
  }

  return (
    <>
      <div className="container flex justify-between pt-10">
        <Breadcrumbs
          links={[
            { title: t.home, href: localizePath('/') },
            { title: t.shopBreadcrumb, href: localizePath('/shop') },
          ]}
        />
        <Suspense fallback={<div>{t.loadingFilters}</div>}>
          <div className="flex gap-4">
            <ProductFilter />
            <div className="flex gap-2">
              <Typography variant="text_main" className="hidden md:inline">{t.sortBy}</Typography>
              <ArrowDownUp strokeWidth={0.75} className="inline md:hidden" />
              <ProductSort />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="container my-10">
        <Suspense fallback={<div>{t.loadingProducts}</div>}>
          <ProductGrid />
        </Suspense>
        <Suspense fallback={<div>{t.loadingPagination}</div>}>
          <ProductPagination />
        </Suspense>
      </div>
    </>
  )
}

export default Shop
