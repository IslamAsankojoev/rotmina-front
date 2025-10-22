'use client'

import GiftCardImage from '@/public/assets/gift-card.png'
import PersonalStylistImage from '@/public/assets/personal-stylist.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  CartItem as CartItemType,
  GiftCardCartItem,
  PersonalStylistCartItem,
  ProductCartItem,
} from '@/src/app/store/cartTypes'
import { Typography, useLangCurrancy } from '@/src/shared'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (itemId: string, newQuantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export const CartItem = ({ item, onQuantityChange, onRemoveItem }: CartItemProps) => {
  const { getPrice, currency } = useLangCurrancy()

  // Компонент для отображения товара
  const ProductItem = ({ item }: { item: ProductCartItem }) => (
    <div className="flex items-center gap-4">
      <div className="relative h-[150px] w-[110px]">
        <Image
          src={item?.variant?.images?.[0]?.url || '/assets/products/shirt.png'}
          alt={item?.productTitle}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Typography variant="text_main" className="font-medium">
          {item?.productTitle}
        </Typography>
        <Typography variant="text_main" className="text-greyy text-sm">
          {item?.variant?.color?.name} - {item?.variant?.size?.name}
        </Typography>
        <Typography variant="text_main" className="text-sm">
          {getPrice(item?.variant?.price)} {currency} each
        </Typography>

        {/* Управление количеством */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item?.id, item?.quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus size={16} />
          </Button>
          <Typography variant="text_main" className="min-w-[20px] text-center">
            {item?.quantity}
          </Typography>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item?.id, item?.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus size={16} />
          </Button>
        </div>

        <Typography variant="text_main" className="font-medium">
          Total: {getPrice(item?.variant?.price * item?.quantity)} {currency}
        </Typography>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemoveItem(item?.id)}
        className="text-greyy h-8 w-8 p-0 hover:text-black"
      >
        <X size={16} />
      </Button>
    </div>
  )

  // Компонент для отображения подарочной карты
  const GiftCardItem = ({ item }: { item: GiftCardCartItem }) => (
    <div className="flex items-center gap-4">
      <div className="relative h-[150px] w-[110px]">
        <Image
          src={GiftCardImage}
          alt="Gift Card"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Typography variant="text_main" className="font-medium">
          Gift Card
        </Typography>
        <Typography variant="text_main" className="text-greyy text-sm">
          Amount: {getPrice(item?.amount)} {currency}
        </Typography>
        {item?.recipientName && (
          <Typography variant="text_main" className="text-sm">
            To: {item?.recipientName}
          </Typography>
        )}
        {item?.recipientEmail && (
          <Typography variant="text_main" className="text-greyy text-sm">
            {item?.recipientEmail}
          </Typography>
        )}
        {item?.message && (
          <Typography variant="text_main" className="text-greyy text-sm">
            &ldquo;{item?.message}&rdquo;
          </Typography>
        )}
        <Typography variant="text_main" className="font-medium">
          Total: {getPrice(item?.amount)} {currency}
        </Typography>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemoveItem(item?.id)}
        className="text-greyy h-8 w-8 p-0 hover:text-black"
      >
        <X size={16} />
      </Button>
    </div>
  )

  // Компонент для отображения персонального стилиста
  const PersonalStylistItem = ({ item }: { item: PersonalStylistCartItem }) => (
    <div className="flex items-center gap-4">
      <div className="relative h-[150px] w-[110px]">
        <Image
          src={PersonalStylistImage}
          alt="Personal Stylist"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Typography variant="text_main" className="font-medium">
          Personal Stylist
        </Typography>
        <Typography variant="text_main" className="text-greyy text-sm">
          {item?.sessionType === 'virtual'
            ? 'Virtual Session'
            : 'In-Person Session'}
        </Typography>
        <Typography variant="text_main" className="text-sm">
          Duration: {item?.duration} minutes
        </Typography>
        {item?.location && (
          <Typography variant="text_main" className="text-greyy text-sm">
            Location: {item?.location}
          </Typography>
        )}
        <Typography variant="text_main" className="font-medium">
          Total: {getPrice(item?.price)} {currency}
        </Typography>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemoveItem(item?.id)}
        className="text-greyy h-8 w-8 p-0 hover:text-black"
      >
        <X size={16} />
      </Button>
    </div>
  )

  // Функция для рендеринга элемента корзины
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
