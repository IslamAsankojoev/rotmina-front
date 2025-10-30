'use client'

import { useEffect } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import { ScrollArea } from '@/shadcn/components/ui/scroll-area'
import { Separator } from '@/shadcn/components/ui/separator'
import { Sheet, SheetContent } from '@/shadcn/components/ui/sheet'
import { useCartActions, useCartInfo } from '@/src/app/store'
import { Typography, useLangCurrancy, useScreenSize } from '@/src/shared'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

import { CartItem } from './CartItem'

export const MiniCart = () => {
  const { getPrice, currency } = useLangCurrancy()
  const { items, totalPrice, isOpen } = useCartInfo()
  const { updateQuantity, removeItem, openCart, closeCart } = useCartActions()
  const { md } = useScreenSize()
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop overlay - rendered in portal */}
      {isOpen &&
        typeof window !== 'undefined' &&
        md &&
        createPortal(
          <div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-xs"
            onClick={closeCart}
          />,
          document.body,
        )}

      {md ? (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger className="cursor-pointer">
            <Typography className="uppercase">Cart</Typography>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-[9999] flex w-screen max-w-full flex-col gap-4 overflow-hidden p-4 md:max-h-[771px] md:w-[567px] md:p-8"
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
              <ScrollArea className="h-[400px] w-full pr-10 md:h-[400px]">
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
      ) : (
        <>
          <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent
              side="full-right"
              className="p-4"
              showCloseButton={false}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Typography variant="text_title" className="italic">
                    Your cart
                  </Typography>
                  <X
                    strokeWidth={0.95}
                    size={40}
                    onClick={() => handleOpenChange()}
                    className="cursor-pointer"
                    color="black"
                  />
                </div>
                <ScrollArea className="h-[400px] w-full pr-10 md:h-[400px]">
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
                  handleOpenChange()
                }}
              >
                proceed to checkout
              </Button>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  )
}
