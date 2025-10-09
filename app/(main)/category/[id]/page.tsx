import React from 'react'

import CategoryImage from '@/public/assets/categories/shirt.png'
import { ProductFilter, ProductPagination, ProductSort } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { ArrowDownUp } from 'lucide-react'
import { ProductGrid } from '@/src/entities/Product'

const Category = () => {
  return (
    <>
      <div
        className="relative mt-24 md:mt-36 flex h-[390px] w-full flex-col justify-end"
        style={{
          backgroundImage: `url(${CategoryImage.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <Typography variant="text_pageTitle">Shirt (21)</Typography>
        </div>
      </div>
      <div className="container my-12 flex justify-between md:my-26">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'SHIRT', href: '/category/shirt' },
          ]}
        />
        <div className="flex gap-4">
          <ProductFilter />
          <div className="flex gap-2">
            <Typography variant="text_main" className="hidden md:inline">SORT BY:</Typography>
            <ArrowDownUp strokeWidth={0.75} className="inline md:hidden" />
            <ProductSort />
          </div>
        </div>
      </div>
      <div className="container mt-8 mb-24">
        <ProductGrid />
        <ProductPagination />
      </div>
    </>
  )
}

export default Category