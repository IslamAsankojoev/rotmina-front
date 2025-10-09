'use client'

import { useState } from 'react'

import GiftCardImage from '@/public/assets/gift-card.png'
import PersonalStylistImage from '@/public/assets/personal-stylist.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import { ScrollArea } from '@/shadcn/components/ui/scroll-area'
import { Separator } from '@/shadcn/components/ui/separator'
import { Typography, useLangCurrancy } from '@/src/shared'
import { useCartInfo, useCartActions } from '@/src/app/store'
import { CartItem, ProductCartItem, GiftCardCartItem, PersonalStylistCartItem } from '@/src/app/store/cartTypes'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'

export const MiniCart = () => {
  const { getPrice, currency } = useLangCurrancy()
  const { items, totalItems, totalPrice, isOpen } = useCartInfo()
  const { updateQuantity, removeItem, openCart, closeCart } = useCartActions()

  const handleOpenChange = () => {
    openCart()
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
  }

  // Компонент для отображения товара
  const ProductItem = ({ item }: { item: ProductCartItem }) => (
    <div className="flex items-center gap-4">
      <div className="relative h-[150px] w-[110px]">
        <Image
          src={item.variant.images[0]?.url || '/assets/products/shirt.png'}
          alt={item.productTitle}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Typography variant="text_main" className="font-medium">
          {item.productTitle}
        </Typography>
        <Typography variant="text_main" className="text-greyy text-sm">
          {item.variant.color.name} - {item.variant.size.name}
        </Typography>
        <Typography variant="text_main" className="text-sm">
          {getPrice(item.variant.price)} {currency} each
        </Typography>
        
        {/* Управление количеством */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus size={16} />
          </Button>
          <Typography variant="text_main" className="min-w-[20px] text-center">
            {item.quantity}
          </Typography>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus size={16} />
          </Button>
        </div>
        
        <Typography variant="text_main" className="font-medium">
          Total: {getPrice(item.variant.price * item.quantity)} {currency}
        </Typography>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleRemoveItem(item.id)}
        className="h-8 w-8 p-0 text-greyy hover:text-black"
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
          Amount: {getPrice(item.amount)} {currency}
        </Typography>
        {item.recipientName && (
          <Typography variant="text_main" className="text-sm">
            To: {item.recipientName}
          </Typography>
        )}
        {item.recipientEmail && (
          <Typography variant="text_main" className="text-greyy text-sm">
            {item.recipientEmail}
          </Typography>
        )}
        {item.message && (
          <Typography variant="text_main" className="text-greyy text-sm">
            &ldquo;{item.message}&rdquo;
          </Typography>
        )}
        <Typography variant="text_main" className="font-medium">
          Total: {getPrice(item.amount)} {currency}
        </Typography>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleRemoveItem(item.id)}
        className="h-8 w-8 p-0 text-greyy hover:text-black"
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
          {item.sessionType === 'virtual' ? 'Virtual Session' : 'In-Person Session'}
        </Typography>
        <Typography variant="text_main" className="text-sm">
          Duration: {item.duration} minutes
        </Typography>
        {item.location && (
          <Typography variant="text_main" className="text-greyy text-sm">
            Location: {item.location}
          </Typography>
        )}
        <Typography variant="text_main" className="font-medium">
          Total: {getPrice(item.price)} {currency}
        </Typography>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleRemoveItem(item.id)}
        className="h-8 w-8 p-0 text-greyy hover:text-black"
      >
        <X size={16} />
      </Button>
    </div>
  )

  // Функция для рендеринга элемента корзины
  const renderCartItem = (item: CartItem) => {
    switch (item.type) {
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

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger className='cursor-pointer'>
        <Typography className="uppercase">Cart</Typography>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex h-[770px] w-[540px] max-w-full flex-col justify-between gap-4 overflow-hidden p-8"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Typography variant="text_title">Your cart ({totalItems})</Typography>
            <X
              strokeWidth={0.95}
              size={40}
              onClick={() => closeCart()}
              className="cursor-pointer"
              color="black"
            />
          </div>
          <ScrollArea className="h-[500px] w-full">
            <div className="flex flex-col overflow-hidden">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Typography variant="text_main" className="text-greyy">
                    Your cart is empty
                  </Typography>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id}>
                    <Separator className="my-4" />
                    {renderCartItem(item)}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          
          {/* Итого */}
          {items.length > 0 && (
            <div className="flex items-center justify-between border-t pt-4">
              <Typography variant="text_title">Total:</Typography>
              <Typography variant="text_title">
                {getPrice(totalPrice)} {currency}
              </Typography>
            </div>
          )}
        </div>
        <Button 
          variant="outline-minimal" 
          className="uppercase"
          disabled={items.length === 0}
        >
          proceed to checkout
        </Button>
      </PopoverContent>
    </Popover>
  )
}

