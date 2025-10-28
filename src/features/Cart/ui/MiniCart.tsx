'use client'

import { Button } from '@/shadcn/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import { ScrollArea } from '@/shadcn/components/ui/scroll-area'
import { Separator } from '@/shadcn/components/ui/separator'
import { useCartActions, useCartInfo } from '@/src/app/store'
import { Typography, useLangCurrancy } from '@/src/shared'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { CartItem } from './CartItem'

export const MiniCart = () => {
  const { getPrice, currency } = useLangCurrancy()
  const { items, totalPrice, isOpen } = useCartInfo()
  const { updateQuantity, removeItem, openCart, closeCart } = useCartActions()
  const router = useRouter()

  const handleOpenChange = () => {
    if (isOpen) {
      closeCart()
    } else {
      openCart()
    }
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger className="cursor-pointer">
        <Typography className="uppercase">Cart</Typography>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex h-screen w-screen max-w-full flex-col gap-4 overflow-hidden p-4 md:max-h-[771px] md:w-[567px] md:p-8"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Typography variant="text_title" className="italic">
              Your cart
            </Typography>
            <X
              strokeWidth={0.95}
              size={40}
              onClick={() => closeCart()}
              className="cursor-pointer"
              color="black"
            />
          </div>
          <ScrollArea className="h-[600px] w-full pr-10 md:h-[400px]">
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
                    <CartItem
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                    />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Total */}
          {items.length > 0 && (
            <div className="text-greyy flex items-center justify-between border-t pt-4">
              <Typography
                variant="text_main"
                className="text-mini-footer md:text-main"
              >
                Subtotal:
              </Typography>
              <Typography
                variant="text_main"
                className="text-mini-footer md:text-main"
              >
                {getPrice(totalPrice)} {currency}
              </Typography>
            </div>
          )}
        </div>
        <Button
          variant="outline-minimal"
          className="uppercase"
          disabled={items.length === 0}
          size="lg"
          onClick={() => {
            router.push('/cart')
            closeCart()
          }}
        >
          proceed to checkout
        </Button>
      </PopoverContent>
    </Popover>
  )
}
