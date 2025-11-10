'use client'

import { useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import { useAddToCart, useCartActions } from '@/src/app/store'
import { AuthService } from '@/src/features/Auth/model/api'
import {
  Typography,
  useLangCurrency,
  useLocale,
  useScreenSize,
  useUser,
} from '@/src/shared'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { HeartIcon, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Product, ProductVariant } from '../model'
import { ProductTitle } from './ProductTitle'
import { VariantSelectionModal } from './VariantSelectionModal'

interface ProductCardProps {
  product: Product
  index: number
  refetchProducts: () => void
}

export const ProductCard = ({
  product,
  index,
  refetchProducts,
}: ProductCardProps) => {
  const { user } = useUser()
  const [isHovered, setIsHovered] = useState(false)
  const [showVariantModal, setShowVariantModal] = useState(false)
  const { md } = useScreenSize()
  const { getPrice, currency } = useLangCurrency()
  const { localizePath } = useLocale()
  const router = useRouter()
  const { addProductToCart } = useAddToCart()
  const { openCart } = useCartActions()
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
    if (!user?.data?.documentId) {
      router.push(localizePath('/login'))
      return
    }
    e.stopPropagation()
    if (product.inWishlist) {
      deleteWishlistProducts({ productId: product.documentId })
    } else {
      addToWishlistProducts({ productId: product.documentId })
    }
  }

  const handleClickProduct = (
    productId: string,
    categorySlug: string,
    e: React.MouseEvent,
  ) => {
    // Don't navigate if clicking on the add button
    const target = e.target as HTMLElement
    if (target.closest('.add-to-cart-btn')) {
      return
    }
    console.log(localizePath(`/category/${categorySlug}/${productId}`))
    router.push(localizePath(`/category/${categorySlug}/${productId}`))
  }

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowVariantModal(true)
  }

  const handleAddToCart = (variant: ProductVariant) => {
    addProductToCart(variant, product.title, product.slug, 1)
    openCart()
  }

  // Get current image based on hover state and variant
  const getCurrentImage = () => {
    const defaultVariantIndex = 0
    const hoverVariantIndex =
      isHovered && product.variants.length > 1 ? 1 : defaultVariantIndex

    // Priority: variant images -> first variant image -> placeholder
    if (product.variants[hoverVariantIndex]?.images?.[0]?.url) {
      return product.variants[hoverVariantIndex].images[0].url
    }
    if (product.variants?.[0]?.images?.[0]?.url) {
      return product.variants[0].images[0].url
    }
    return ''
  }

  // Get current price
  const currentPrice = product.variants[0]?.price || 0

  return (
    <>
      <div
        onClick={(e) =>
          handleClickProduct(product.documentId, product.category.slug, e)
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        key={product.documentId}
        className={clsx(
          'group cols-span-6 relative col-span-6 flex w-full cursor-pointer flex-col items-center gap-1 md:col-span-4 lg:col-span-3',
          index === 4
            ? 'col-span-12 min-h-[544px] md:col-span-6 md:row-span-2'
            : '',
          index === 9 ? 'md:col-span-4' : '',
          index === 10 ? 'md:col-span-4' : '',
          index === 11 ? 'md:col-span-4' : '',
        )}
      >
        <div className="relative h-[300px] w-full overflow-hidden md:h-full md:min-h-[544px]">
          <Image
            src={getCurrentImage()}
            alt={product?.title}
            objectFit="cover"
            fill
            className="transition-all duration-300"
          />
        </div>

        {/* Add to cart button - appears on hover */}
        <Button
          variant="ghost"
          size="icon"
          className="add-to-cart-btn absolute bottom-10 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:opacity-100 md:bottom-12"
          onClick={handleAddToCartClick}
        >
          <Typography className="text-3xl font-light">
            <Plus size={20} />
          </Typography>
        </Button>

        {/* Product info */}
        <div className="flex w-full justify-between gap-2 px-2">
          <div className="flex w-full justify-between gap-2">
            <Typography
              variant="text_main"
              className="text-mini-footer md:text-main"
            >
              <ProductTitle product={product} />
            </Typography>
            <Typography
              variant="text_main"
              className="text-mini-footer md:text-main"
            >
              {getPrice(Number(currentPrice.toFixed(2)))} {currency}
            </Typography>
          </div>
        </div>

        {/* Wishlist button */}
        <Button
          variant="link"
          size="icon"
          className="absolute top-0 right-0"
          onClick={(e) => handleClickWishlist(e, product)}
        >
          <HeartIcon
            size={md ? 40 : 32}
            fill={product.inWishlist ? 'currentColor' : 'none'}
          />
        </Button>
      </div>

      {/* Variant Selection Modal */}
      <VariantSelectionModal
        product={product}
        open={showVariantModal}
        onOpenChange={setShowVariantModal}
        onAddToCart={handleAddToCart}
      />
    </>
  )
}
