import React from 'react'

import CategoryImage from '@/public/assets/categories/shirt.png'
import { ProductFilter } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'

const Category = () => {
  return (
    <>
      <div
        className="relative mt-36 flex h-[390px] w-full flex-col justify-end"
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
      <div className="container flex justify-between my-26">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'SHIRT', href: '/category/shirt' },
          ]}
        />
        <div className="flex gap-4">
          <ProductFilter />
          <Typography variant="text_main">SORT BY:</Typography>
        </div>
      </div>
    </>
  )
}

export default Category
