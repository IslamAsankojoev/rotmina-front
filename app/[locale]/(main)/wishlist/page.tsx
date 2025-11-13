'use client'

import { Button } from '@/shadcn/components/ui/button'
import { AuthService } from '@/src/features/Auth/model/api'
import { Breadcrumbs, Loader, Typography, useLangCurrency, useDictionary, useLocale } from '@/src/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function WishlistPage() {
  const { getPrice, currency } = useLangCurrency()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  
  const accountT = ((dictionary as unknown) as Record<string, Record<string, string>>).account || {
    home: 'HOME',
  }
  const headerT = ((dictionary as unknown) as Record<string, Record<string, string>>).header || {
    wishlist: 'WISHLIST',
  }
  
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

  const handleClickProduct = (productId: string, categorySlug: string) => {
    router.push(`/category/${categorySlug}/${productId}`)
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="container my-10">
      <div className="text-center">
        <Breadcrumbs
          links={[
            { title: accountT.home, href: localizePath('/') },
            { title: headerT.wishlist, href: localizePath('/wishlist') },
          ]}
        />
        <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 mt-10">
          {data?.data.map((product, index) => (
            <div
              onClick={() => handleClickProduct(product.documentId, product.category.slug)}
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
                  src={product?.variants?.[0]?.images?.[0]?.url || ''}
                  alt={product?.title}
                  objectFit="cover"
                  fill
                />
              </div>
              <div className="bottom-4 flex w-full justify-between gap-2 px-2">
                <div className="hidden w-full justify-between gap-2 md:flex">
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
                variant="default"
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
