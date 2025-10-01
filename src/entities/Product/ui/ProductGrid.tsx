'use client'

import { Typography } from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { ProductService } from '../model'

export const ProductGrid = () => {
  const params = useSearchParams()
  const page = params.get('page')
  const pageSize = params.get('pageSize')
  const search = params.get('search')
  const colors = params.get('colors')
  const sizes = params.get('sizes')
  const sort = params.get('sort')

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, pageSize, search, colors, sizes, sort],
    queryFn: () => ProductService.getProducts({
      page: page ? parseInt(page) : undefined,
      pageSize: pageSize ? parseInt(pageSize) : undefined,
      search: search ? search : undefined,
      colors: colors ? colors : undefined,
      sizes: sizes ? sizes : undefined,
    }),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
      {data?.data.map((product, index) => (
        <Link
          href={`/product/${product.documentId}`}
          key={product.documentId}
          className={clsx(
            'relative col-span-6 flex h-[300px] w-full flex-col items-center gap-4 border p-4 md:col-span-4 md:h-full md:min-h-[544px] lg:col-span-3',
            index === 4
              ? 'col-span-12 min-h-[544px] md:col-span-6 md:row-span-2'
              : '',
            index === 9 ? 'md:col-span-4' : '',
            index === 10 ? 'md:col-span-4' : '',
            index === 11 ? 'md:col-span-4' : '',
          )}
        >
          <Image
            src={product?.gallery?.[0]?.url}
            alt={product?.title}
            objectFit="cover"
            fill
          />
          <div className="absolute bottom-4 flex w-full justify-between gap-2 px-4">
            <Typography variant="text_main">{product?.title}</Typography>
            <Typography variant="text_main">
              ${product?.variants[0]?.price.toFixed(2)}
            </Typography>
          </div>
        </Link>
      ))}
    </div>
  )
}
