import React from 'react'

import CategoryImage from '@/public/assets/categories/shirt.png'
import FullShirtImage from '@/public/assets/products/full-shirt-image.jpg'
import ShirtImage from '@/public/assets/products/shirt.png'
import { ProductFilter, ProductPagination, ProductSort } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import clsx from 'clsx'
import { ArrowDownUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
          <Typography variant="text_main" className="flex gap-2">
            <span className="hidden md:inline">SORT BY:</span>
            <ArrowDownUp strokeWidth={0.75} className="inline md:hidden" />
            <ProductSort />
          </Typography>
        </div>
      </div>
      <div className="container mt-8 mb-24">
        <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className={clsx(
                'relative col-span-6 flex h-[300px] w-full flex-col items-center gap-4 border p-4 md:col-span-4 md:h-full md:min-h-[544px] lg:col-span-3',
                product.id === '5'
                  ? 'col-span-12 min-h-[544px] md:col-span-6 md:row-span-2'
                  : '',
                product.id === '10' ? 'md:col-span-4' : '',
                product.id === '11' ? 'md:col-span-4' : '',
                product.id === '12' ? 'md:col-span-4' : '',
              )}
            >
              <Image
                src={product.image.src}
                alt={product.name}
                objectFit="cover"
                fill
              />
              <div className="absolute bottom-4 flex w-full justify-between gap-2 px-4">
                <Typography variant="text_main">{product.name}</Typography>
                <Typography variant="text_main">
                  ${product.price.toFixed(2)}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
        <ProductPagination />
      </div>
    </>
  )
}

export default Category

const products = [
  {
    id: '1',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '2',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '3',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '4',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '5',
    name: 'FullShirt',
    image: FullShirtImage,
    price: 29.99,
  },
  {
    id: '6',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '7',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '8',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '9',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '10',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '11',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '12',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
]
