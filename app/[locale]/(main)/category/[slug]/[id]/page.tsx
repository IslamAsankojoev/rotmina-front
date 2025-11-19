'use client'

import React from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shadcn/components/ui/tabs'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shadcn/components/ui/toggle-group'
import { useAddToCart, useCartActions } from '@/src/app/store'
import {
  ProductDescription,
  ProductImages,
  ProductService,
  ProductTitle,
  SizeGuideModal,
} from '@/src/entities/Product'
import {
  Product as ProductType,
  ProductVariant,
  Size,
} from '@/src/entities/Product/model/types'
import { Color } from '@/src/entities/Product/model/types'
import { ProductCard } from '@/src/entities/Product/ui/ProductCard'
import { Category, CategoryTitle } from '@/src/features'
import { AuthService } from '@/src/features/Auth/model/api'
import {
  Breadcrumbs,
  Loader,
  Typography,
  useDictionary,
  useLangCurrency,
  useLocale,
  useUser,
} from '@/src/shared'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

const Product = () => {
  const { dictionary } = useDictionary()
  const { localizePath, isRTL } = useLocale()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .productPage || {
    colour: 'Colour',
    size: 'Size',
    sizeGuide: 'Size Guide',
    bust: 'Bust',
    waist: 'Waist',
    hips: 'Hips',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of stock',
    description: 'Description',
    shippingReturn: 'Shipping&Return',
    internationalShipping: 'International Shipping',
    shippingTitle: 'International Shipping',
    shippingSubtitle: 'Shipping',
    shippingText: 'Shipping is available worldwide at a flat rate of 165 ILS, approximately $47–$50 USD. Price may vary depending on exchange rate. Delivery typically takes 7–15 business days.',
    orderProcessingTitle: 'Order Processing',
    orderProcessingText: 'All orders are processed within 1-2 business days. Customers are responsible for providing accurate shipping information to ensure timely delivery. Once the order is confirmed, customers will receive a confirmation email.',
    shippingIsraelTitle: '',
    shippingIsraelText: '',
    shippingCosts: 'Shipping Costs:',
    destination: 'Destination',
    returnsExchanges: 'Returns & Exchanges',
    returnsExchangesTitle: 'Returns & Exchanges',
    returnsExchangesTextBefore: 'If you would like to return an item, please fill out the ',
    returnsExchangesFormLink: 'return form',
    returnsExchangesTextAfter: ' within 14 days of receiving your package. Items that have been used or worn cannot be returned or exchanged. Clothing items may only be exchanged if they still carry their original tags.\n\nOnce the item is received in its original condition, a full refund will be issued, excluding shipping costs. Customers are responsible for return shipping costs unless the item is defective or incorrect.\n\nRefunds are processed within up to 3 business days after the returned item is received and inspected. Customers will be notified via email once the refund has been issued, confirming that the returned item has been accepted and the refund completed. Refunds are issued via the original payment method\n\nPlease note that additional local fees may apply depending on the destination country\'s policies.',
    europeanSurcharge:
      'In the following European countries: Andorra, Austria, Gibraltar, Ireland, Monaco, Greece, and Portugal a 12 $ surcharge applies for shipments weighing 3 kg only. All orders are prepared for shipment within 1–2 business days from my studio in Israel.',
    importantNote:
      'Important: Additional local fees may apply depending on the customs policies of the destination country',
    youMightAlsoLike: 'You might also like',
    home: 'HOME',
  }
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null)
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null)
  const [selectedVariant, setSelectedVariant] =
    React.useState<ProductVariant | null>(null)
  const params = useParams()
  const id = params.id as string
  const { getPrice, currency } = useLangCurrency()
  const { addProductToCart } = useAddToCart()
  const { openCart } = useCartActions()
  const { user } = useUser()
  const router = useRouter()
  const { locale } = useLocale()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductService.getProduct(id),
  })
  const { data: relatedProducts } = useQuery({
    queryKey: ['relatedProducts', id],
    queryFn: () => ProductService.getRelatedProducts(id),
  })

  // Get unique colors from variants
  const colors = React.useMemo(() => {
    if (!data?.data?.variants) return []
    const uniqueColors = new Map()
    data.data.variants.forEach((variant: ProductVariant) => {
      if (!uniqueColors.has(variant?.color?.id)) {
        uniqueColors.set(variant?.color?.id, variant?.color)
      }
    })
    return Array.from(uniqueColors.values())
  }, [data?.data?.variants])

  // Get sizes for selected color
  const availableSizes = React.useMemo(() => {
    if (!selectedColor || !data?.data?.variants) return []

    const colorId = parseInt(selectedColor)
    const sizesForColor = data.data.variants
      ?.filter((variant: ProductVariant) => variant?.color?.id === colorId)
      ?.map((variant: ProductVariant) => variant?.size)

    // Remove duplicate sizes
    const uniqueSizes = new Map()
    sizesForColor?.forEach((size: Size) => {
      if (!uniqueSizes.has(size?.id)) {
        uniqueSizes.set(size?.id, size)
      }
    })
    return Array.from(uniqueSizes.values())
  }, [selectedColor, data?.data?.variants])

  // Get all sizes for display (including unavailable)
  const allSizes = React.useMemo(() => {
    if (!data?.data?.variants) return []
    const uniqueSizes = new Map()
    data.data?.variants?.forEach((variant: ProductVariant) => {
      if (!uniqueSizes.has(variant?.size?.id)) {
        uniqueSizes.set(variant?.size?.id, variant?.size)
      }
    })
    return Array.from(uniqueSizes.values())
  }, [data?.data?.variants])

  // Automatically select first color on load
  React.useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0]?.id?.toString())
    }
  }, [colors, selectedColor])

  // Update selected variant when color or size changes
  const updateSelectedVariant = React.useCallback(
    (colorId: string, sizeId: string) => {
      if (!data?.data?.variants) return

      const variant = data.data?.variants?.find(
        (variant: ProductVariant) =>
          variant?.color?.id === parseInt(colorId) &&
          variant?.size?.id === parseInt(sizeId),
      )

      setSelectedVariant(variant || null)
    },
    [data?.data?.variants],
  )

  // Automatically select first available size when color is selected
  React.useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0]?.id?.toString())
    }
  }, [availableSizes, selectedSize])

  // Update selected variant when color or size changes
  React.useEffect(() => {
    if (selectedColor && selectedSize) {
      updateSelectedVariant(selectedColor, selectedSize)
    }
  }, [selectedColor, selectedSize, updateSelectedVariant])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    // Reset selected size when color changes
    setSelectedSize(null)
    setSelectedVariant(null)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    // Update selected variant when size is selected
    if (selectedColor) {
      updateSelectedVariant(selectedColor, size)
    }
  }

  // Check if size is available for selected color
  const isSizeAvailable = (sizeId: number) => {
    if (!selectedColor) return false
    return availableSizes?.some((size: Size) => size?.id === sizeId)
  }

  // Get price for selected color and size combination
  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant?.price
    }
    return data?.data?.variants?.[0]?.price || 0
  }

  // Add product to cart
  const handleAddToCart = () => {
    if (!selectedVariant || !data?.data) return

    addProductToCart(
      selectedVariant || null,
      data.data?.title,
      data.data?.slug,
      1,
    )

    // Open cart after adding
    openCart()
  }

  const { mutate: addToWishlistProducts } = useMutation({
    mutationFn: AuthService.addToWishlistProducts,
    onSuccess: () => {
      refetch()
    },
  })

  const { mutate: deleteWishlistProducts } = useMutation({
    mutationFn: AuthService.deleteWishlistProducts,
    onSuccess: () => {
      refetch()
    },
  })

  const handleClickWishlist = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductType,
  ) => {
    e.stopPropagation()
    if (!user?.data?.documentId) {
      router.push(localizePath('/login'))
      return
    }
    if (product?.inWishlist) {
      deleteWishlistProducts({ productId: product?.documentId })
    } else {
      addToWishlistProducts({ productId: product?.documentId })
    }
  }

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="relative container my-10 flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: localizePath('/') },
            {
              title: (
                <CategoryTitle category={data?.data?.category as Category} />
              ),
              href: localizePath(`/category/${data?.data?.category?.slug}`),
            },
            {
              title: <ProductTitle product={data?.data as ProductType} />,
              href: localizePath(
                `/category/${data?.data?.category?.slug}/${data?.data?.documentId}`,
              ),
            },
          ]}
        />
      </div>
      <div className="mb-6 block md:hidden">
        <ProductImages
          product={data?.data as ProductType}
          selectedVariant={selectedVariant || (data?.data?.variants?.[0] as ProductVariant)}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-8 md:!flex-row md:gap-12" dir="ltr">
          <div className="hidden flex-1 md:block">
            <ProductImages
              product={data?.data as ProductType}
              selectedVariant={selectedVariant || (data?.data?.variants?.[0] as ProductVariant)}
            />
          </div>
          <div className="relative flex-1 md:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <button
              className="absolute top-2 right-0 flex h-10 w-10 cursor-pointer items-center justify-center p-0"
              onClick={(e) => {
                e.stopPropagation()
                handleClickWishlist(e, data?.data as ProductType)
              }}
            >
              <HeartIcon
                size={25}
                fill={data?.data?.inWishlist ? 'currentColor' : 'none'}
              />
            </button>
            <Typography
              variant="text_pageTitle"
              tag="h1"
              className="text-mobile-title2 md:text-pageTitle"
            >
              <ProductTitle product={data?.data as ProductType} />
            </Typography>
            <Typography variant="text_main">
              {getPrice(getCurrentPrice())} {currency}
            </Typography>
            <Typography variant="text_main" className="mt-4">
              {locale === 'en'
                ? data?.data?.short_description
                : data?.data?.short_descriptionHE}
            </Typography>
            <div className="mt-6 flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <Typography variant="text_main" className="uppercase">
                  {t.colour}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <ToggleGroup
                    type="single"
                    className="flex flex-wrap"
                    value={selectedColor || ''}
                    onValueChange={handleColorChange}
                  >
                    {colors?.map((color: Color) => {
                      return (
                        <ToggleGroupItem
                          key={color?.id}
                          value={color?.id.toString()}
                          className="bg-transparent"
                        >
                          <div
                            className={clsx(
                              'flex h-10 w-10 items-center justify-center rounded-full border-1 transition-all hover:scale-110',
                              selectedColor?.includes(color?.id.toString())
                                ? 'border-black'
                                : 'border-greyy',
                            )}
                          >
                            <div
                              style={{
                                background: `url(${color?.image?.url}) no-repeat center center`,
                                backgroundSize: 'cover',
                              }}
                              className="h-8 w-8 cursor-pointer rounded-full"
                            />
                          </div>
                        </ToggleGroupItem>
                      )
                    })}
                  </ToggleGroup>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <Typography variant="text_main" className="uppercase">
                    {t.size}
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    <ToggleGroup
                      type="single"
                      className="flex flex-wrap"
                      value={selectedSize || ''}
                      onValueChange={handleSizeChange}
                    >
                      {allSizes?.map((size: Size) => {
                        const isAvailable = isSizeAvailable(size?.id)
                        const isSelected = selectedSize === size?.id?.toString()

                        return (
                          <ToggleGroupItem
                            key={size?.id}
                            value={size?.id?.toString()}
                            disabled={!isAvailable}
                            className={clsx(
                              'cursor-pointer',
                              !isAvailable && 'cursor-not-allowed opacity-50',
                            )}
                          >
                            <Typography
                              variant="text_main"
                              className={clsx(
                                'uppercase',
                                isSelected
                                  ? 'text-black'
                                  : isAvailable
                                    ? 'text-greyy'
                                    : 'text-greyy opacity-50',
                              )}
                            >
                              {size?.name}
                            </Typography>
                          </ToggleGroupItem>
                        )
                      })}
                    </ToggleGroup>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <SizeGuideModal />
                  <div className="flex gap-2">
                  <Typography
                      variant="text_main"
                      className="text-greyy uppercase"
                    >
                      {t.bust}: 88
                    </Typography>
                    <Typography
                      variant="text_main"
                      className="text-greyy uppercase"
                    >
                      {t.waist}: 66
                    </Typography>
                    <Typography
                      variant="text_main"
                      className="text-greyy uppercase"
                    >
                      {t.hips}: 95
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline-minimal"
              size="lg"
              className="mt-10 uppercase"
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant?.stock === 0}
            >
              {selectedVariant?.stock === 0 ? t.outOfStock : t.addToCart}
            </Button>
            <Tabs
              defaultValue="description"
              className="my-10"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <TabsList>
                <TabsTrigger
                  value="description"
                  className="cursor-pointer uppercase"
                >
                  <Typography variant="text_main">{t.description}</Typography>
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="cursor-pointer uppercase"
                >
                  <Typography variant="text_main">
                    {t.shippingReturn}
                  </Typography>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <Typography variant="text_main">
                  <ProductDescription product={data?.data as ProductType} />
                </Typography>
              </TabsContent>
              <TabsContent value="shipping">
                <div className="flex flex-col gap-6">
                  {isRTL ? (
                    <>
                      <Typography variant="text_main" className="font-bold">
                        {t.shippingTitle}
                      </Typography>
                      <Typography variant="text_main" className="font-bold">
                        {t.shippingIsraelTitle}
                      </Typography>
                      <Typography variant="text_main" className="whitespace-pre-line">
                        {t.shippingIsraelText}
                      </Typography>
                      <Typography variant="text_main" className="font-bold mt-4">
                        {t.returnsExchangesTitle}
                      </Typography>
                      <Typography variant="text_main" className="whitespace-pre-line">
                        {t.returnsExchangesTextBefore}
                        <Link
                          href={localizePath('/returns-&-exchanges')}
                          className="text-blue-600 underline inline"
                        >
                          {t.returnsExchangesFormLink}
                        </Link>
                        {t.returnsExchangesTextAfter}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="text_main" className="font-bold">
                        {t.shippingTitle}
                      </Typography>
                      <Typography variant="text_main" className="font-bold">
                        {t.shippingSubtitle}
                      </Typography>
                      <Typography variant="text_main" className="whitespace-pre-line">
                        {t.shippingText}
                      </Typography>
                      <Typography variant="text_main" className="font-bold mt-4">
                        {t.orderProcessingTitle}
                      </Typography>
                      <Typography variant="text_main" className="whitespace-pre-line">
                        {t.orderProcessingText}
                      </Typography>
                      <Typography variant="text_main" className="font-bold mt-4">
                        {t.returnsExchangesTitle}
                      </Typography>
                      <Typography variant="text_main" className="whitespace-pre-line">
                        {t.returnsExchangesTextBefore}
                        <Link
                          href={localizePath('/returns-&-exchanges')}
                          className="text-blue-600 underline inline"
                        >
                          {t.returnsExchangesFormLink}
                        </Link>
                        {t.returnsExchangesTextAfter}
                      </Typography>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="my-24 flex flex-col gap-8">
          <Typography variant="text_title" className="italic">
            {t.youMightAlsoLike}
          </Typography>
          <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
            {relatedProducts?.data?.map(
              (product: ProductType, index: number) => (
                <ProductCard
                  product={product as ProductType}
                  index={index + 1}
                  refetchProducts={refetch}
                  key={product?.documentId}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
