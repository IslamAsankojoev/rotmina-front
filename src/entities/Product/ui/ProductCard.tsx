'use client'

import { Button } from '@/shadcn/components/ui/button'
import { AuthService } from '@/src/features/Auth/model/api'
import { Typography, useLangCurrancy } from '@/src/shared'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Product } from '../model'

interface ProductCardProps {
  product: Product
  index: number
  refetchProducts: () => void
}

export const ProductCard = ({ product, index, refetchProducts }: ProductCardProps) => {

  const { getPrice, currency } = useLangCurrancy()
  const router = useRouter()
  const { mutate: addToWishlistProducts } = useMutation({
    mutationFn: AuthService.addToWishlistProducts,
    onSuccess: () => {
      refetchProducts()
    },
  })

  const { mutate: deleteWishlistProducts } = useMutation({
    mutationFn: AuthService.deleteWishlistProducts,
    onSuccess: () => {
      refetchProducts()
    },
  })

  const handleClickWishlist = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product,
  ) => {
    e.stopPropagation()
    if (product.inWishlist) {
      deleteWishlistProducts({ productId: product.documentId })
    } else {
      addToWishlistProducts({ productId: product.documentId })
    }
  }

  const handleClickProduct = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  return (
    <div
      onClick={() => handleClickProduct(product.documentId)}
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
          src={product?.variants[0]?.images?.[0]?.url || product.gallery[0]?.url}
          alt={product?.title}
          objectFit="cover"
          fill
        />
      </div>
      <div className="bottom-4 flex w-full justify-between gap-2 px-2">
        <div className="hidden w-full flex-col justify-between gap-2 md:flex">
          <Typography variant="text_main">{product?.title}</Typography>
          <Typography variant="text_main">
            {getPrice(Number(product?.variants[0]?.price.toFixed(2)))}{' '}
            {currency}
          </Typography>
        </div>
        <div className="flex w-full justify-between gap-2 md:hidden">
          <Typography variant="text_mini_footer">{product?.title}</Typography>
          <Typography variant="text_mini_footer">
            {getPrice(Number(product?.variants[0]?.price.toFixed(2)))}{' '}
            {currency}
          </Typography>
        </div>
      </div>
      <Button
        variant="link"
        size="icon"
        className="absolute top-0 right-0"
        onClick={(e) => handleClickWishlist(e, product)}
      >
        <HeartIcon
          size={32}
          fill={product.inWishlist ? 'currentColor' : 'none'}
        />
      </Button>
    </div>
  )
}
