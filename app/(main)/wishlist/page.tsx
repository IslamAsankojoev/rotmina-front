'use client'

import { Button } from '@/shadcn/components/ui/button'
import { AuthService } from '@/src/features/Auth/model/api'
import { Typography, useLangCurrancy } from '@/src/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function WishlistPage() {
  const { getPrice, currency } = useLangCurrancy()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data, isLoading, error } = useQuery({
    queryKey: ['wishlistProducts'],
    queryFn: AuthService.getWishlistProducts,
  })

  const { mutate: deleteWishlistProducts } = useMutation({
    mutationFn: AuthService.deleteWishlistProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlistProducts'] })
    },
  })

  const handleClickProduct = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="container py-20">
      <div className="text-center">
        <Typography variant="text_title" className="mb-8">
          Wishlist
        </Typography>
        <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
          {data?.data.map((product, index) => (
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
                  src={product?.gallery?.[0]?.url}
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
                  <Typography variant="text_mini_footer">
                    {product?.title}
                  </Typography>
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
                onClick={(e) => {
                  e.stopPropagation()
                  deleteWishlistProducts({ productId: product.documentId })
                }}
              >
                <X size={32} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
