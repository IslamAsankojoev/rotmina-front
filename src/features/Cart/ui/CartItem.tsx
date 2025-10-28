'use client'

import GiftCardImage from '@/public/assets/gift-card-preview.webp'
import PersonalStylistImage from '@/public/assets/personal-stylist.webp'
import { Button } from '@/shadcn/components/ui/button'
import {
  CartItem as CartItemType,
  GiftCardCartItem,
  PersonalStylistCartItem,
  ProductCartItem,
} from '@/src/app/store/cartTypes'
import { Typography, useLangCurrancy } from '@/src/shared'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (itemId: string, newQuantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export const CartItem = ({
  item,
  onQuantityChange,
  onRemoveItem,
}: CartItemProps) => {
  const { getPrice, currency } = useLangCurrancy()

  // Component for displaying product
  const ProductItem = ({ item }: { item: ProductCartItem }) => (
    <div className="relative flex items-center gap-4">
      <div className="relative h-[150px] w-[110px]">
        <Image
          src={item?.variant?.images?.[0]?.url || '/assets/products/shirt.webp'}
          alt={item?.productTitle}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex min-h-[150px] flex-1 flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <Typography variant="text_main" className="font-medium">
            {item?.productTitle}
          </Typography>
          <Typography
            variant="text_main"
            className="text-greyy text-sm uppercase"
          >
            Size:{' '}
            <span className="text-black">{item?.variant?.size?.name}</span>
          </Typography>
          <Typography
            variant="text_main"
            className="text-greyy flex items-center gap-2 text-sm uppercase"
          >
            Color{' '}
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: item?.variant?.color?.hex }}
            ></div>
          </Typography>
        </div>

        {/* Quantity management */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography
              variant="text_main"
              className="text-greyy text-sm uppercase"
            >
              Amount:
            </Typography>
            <div className="flex items-center">
              <Button
                variant="link"
                size="icon"
                onClick={() => onQuantityChange(item?.id, item?.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus size={16} />
              </Button>
              <Typography
                variant="text_main"
                className="min-w-[20px] text-center"
              >
                {item?.quantity}
              </Typography>
              <Button
                variant="link"
                size="icon"
                onClick={() => onQuantityChange(item?.id, item?.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <Typography variant="text_main" className="text-greyy font-medium">
            {getPrice(item?.variant?.price * item?.quantity)} {currency}
          </Typography>
        </div>
      </div>
      <Button
        variant="link"
        size="sm"
        onClick={() => onRemoveItem(item?.id)}
        className="text-greyy absolute top-0 right-0 p-0 hover:text-black"
      >
        Remove
      </Button>
    </div>
  )

  // Component for displaying gift card
  const GiftCardItem = ({ item }: { item: GiftCardCartItem }) => (
    <div className="relative flex items-center gap-2">
      <div className="relative h-[150px] w-[110px]">
        <Image
          src={GiftCardImage}
          alt="Gift Card"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex min-h-[150px] flex-1 flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <Typography variant="text_main" className="font-medium">
            Gift Card
          </Typography>
          {item?.recipientEmail && (
            <Typography variant="text_main" className="text-greyy">
              Address:{' '}
              <span className="text-black">{item?.recipientEmail}</span>
            </Typography>
          )}
          {item?.recipientName && (
            <Typography variant="text_main" className="text-greyy">
              Name: <span className="text-black">{item?.recipientName}</span>
            </Typography>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography
              variant="text_main"
              className="text-greyy text-sm uppercase"
            >
              Amount:
            </Typography>
            <div className="flex items-center">
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus size={16} />
              </Button>
              <Typography
                variant="text_main"
                className="min-w-[20px] text-center"
              >
                {item?.quantity}
              </Typography>
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <Typography variant="text_main" className="text-greyy font-medium">
            {getPrice(item?.price * item?.quantity)} {currency}
          </Typography>
        </div>
      </div>
      <Button
        variant="link"
        size="sm"
        onClick={() => onRemoveItem(item?.id)}
        className="text-greyy absolute top-0 right-0 p-0 hover:text-black"
      >
        Remove
      </Button>
    </div>
  )

  // Component for displaying personal stylist
  const PersonalStylistItem = ({ item }: { item: PersonalStylistCartItem }) => (
    <div className="relative flex gap-4">
      <div className="relative h-[150px] w-[110px] flex-shrink-0">
        <Image
          src={PersonalStylistImage}
          alt="Personal Stylist"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex min-h-[150px] flex-1 flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Typography variant="text_main" className="font-medium">
            Personal Stylist
          </Typography>
          <Typography
            variant="text_main"
            className="text-greyy text-sm uppercase"
          >
            {item?.sessionType === 'virtual' ? 'ONLINE' : 'IN-PERSON'}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Typography
              variant="text_main"
              className="text-greyy text-sm uppercase"
            >
              Amount:
            </Typography>
            <div className="flex items-center">
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity - 1)}
                className="h-8 w-8 p-0"
              >
                <Minus size={16} />
              </Button>
              <Typography
                variant="text_main"
                className="min-w-[20px] text-center"
              >
                {item?.quantity}
              </Typography>
              <Button
                variant="link"
                size="sm"
                onClick={() => onQuantityChange(item?.id, item?.quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <Typography variant="text_main" className="text-greyy font-medium">
            {getPrice(item?.price * item?.quantity)} {currency}
          </Typography>
        </div>
      </div>
      <Button
        variant="link"
        size="sm"
        onClick={() => onRemoveItem(item?.id)}
        className="text-greyy absolute top-0 right-0 p-0 hover:text-black"
      >
        Remove
      </Button>
    </div>
  )

  // Function for rendering cart item
  const renderCartItem = (item: CartItemType) => {
    switch (item?.type) {
      case 'product':
        return <ProductItem item={item} />
      case 'giftcard':
        return <GiftCardItem item={item} />
      case 'personalStylist':
        return <PersonalStylistItem item={item} />
      default:
        return null
    }
  }

  return renderCartItem(item)
}
