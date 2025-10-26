'use client'

import { Typography, useLangCurrancy, useProducts } from '@/src/shared'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface ProductGridProps {
  categoryId?: string
}

export const ProductGrid = ({ categoryId }: ProductGridProps) => {
  const { getPrice, currency } = useLangCurrancy()
  const { data, isLoading, error } = useProducts(categoryId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
      {data?.data.map((product, index) => (
        <Link
          href={`/product/${product.documentId}`}
          key={product.documentId}
          className={clsx(
            'cols-span-6 relative col-span-6 flex w-full flex-col items-center gap-1 md:col-span-4 lg:col-span-3',
            index === 4
              ? 'col-span-12 min-h-[544px] md:col-span-6 md:row-span-2'
              : '',
            index === 9 ? 'md:col-span-4' : '',
            index === 10 ? 'md:col-span-4' : '',
            index === 11 ? 'md:col-span-4' : '',
          )}
        >
          <div className="relative h-[300px] w-full md:h-full md:min-h-[544px]">
            <Image
              src={product?.gallery?.[0]?.url}
              alt={product?.title}
              objectFit="cover"
              fill
            />
          </div>
          <div className="bottom-4 flex w-full justify-between gap-2 px-2">
            <div className="flex-col gap-2 hidden md:flex justify-between w-full">
              <Typography variant="text_main">{product?.title}</Typography>
              <Typography variant="text_main">
                {getPrice(Number(product?.variants[0]?.price.toFixed(2)))} {currency}
              </Typography>
            </div>
            <div className="gap-2 flex md:hidden justify-between w-full">
              <Typography variant="text_mini_footer">{product?.title}</Typography>
              <Typography variant="text_mini_footer">
                {getPrice(Number(product?.variants[0]?.price.toFixed(2)))} {currency}
              </Typography>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
