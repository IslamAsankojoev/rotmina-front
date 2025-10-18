'use client'

import { useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import { Checkbox } from '@/shadcn/components/ui/checkbox'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { ScrollArea } from '@/shadcn/components/ui/scroll-area'
import { Separator } from '@/shadcn/components/ui/separator'
import { useCartActions, useCartInfo } from '@/src/app'
import { AddressForm, CartItem, PaymentForm, TermsDialog } from '@/src/features'
import { addressFormSchema, paymentFormSchema } from '@/src/features/Cart/model'
import { Breadcrumbs, Typography, useLangCurrancy } from '@/src/shared'
import clsx from 'clsx'
import Image from 'next/image'
import z from 'zod'

enum CartSteps {
  CART_SHIPPINGINFO = 1,
  CART_PAYMENTMETHODS = 2,
}

enum PaymentMethods {
  CARD = 'card',
  CASH = 'cash',
}

const paymentMethods = [
  {
    id: PaymentMethods.CARD,
    label: 'Card',
    image: '/payments/card.png',
  },
  {
    id: PaymentMethods.CASH,
    label: 'Cash',
    image: '/payments/card.png',
  },
]

export default function CartPage() {
  const [currentStep, setCurrentStep] = useState(CartSteps.CART_SHIPPINGINFO)
  const { items, totalItems, totalPrice } = useCartInfo()
  const { updateQuantity, removeItem } = useCartActions()
  const { getPrice, currency } = useLangCurrancy()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CARD,
  )
  const [termsChecked, setTermsChecked] = useState(false)
  const [termsError, setTermsError] = useState(false)
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
  }

  const handleSubmitAddress = (data: z.infer<typeof addressFormSchema>) => {
    console.log('Form submitted:', data)
    setCurrentStep(CartSteps.CART_PAYMENTMETHODS)
  }

  const handleSubmitPayment = (data: z.infer<typeof paymentFormSchema>) => {
    console.log('Form submitted:', data)
    if (!termsChecked) {
      setTermsError(true)
      return
    }
    setTermsError(false)
  }

  return (
    <>
      <div className="relative container mt-24 mb-10 flex w-full flex-col justify-end md:mt-36">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'CART', href: '/cart' },
          ]}
        />
        <div className="border-greyy/70 mt-16 flex justify-between border-b">
          <Typography
            variant="text_main"
            className={clsx(
              currentStep === CartSteps.CART_SHIPPINGINFO &&
                'border-blackish border-b',
              'uppercase',
            )}
          >
            Shipping Information
          </Typography>
          <Typography
            variant="text_main"
            className={clsx(
              currentStep === CartSteps.CART_PAYMENTMETHODS &&
                'border-blackish border-b',
              'uppercase',
            )}
          >
            Payment Methods
          </Typography>
        </div>
        {currentStep === CartSteps.CART_SHIPPINGINFO && (
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            <AddressForm onSubmit={handleSubmitAddress} />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pt-8">
                  <Typography variant="text_title">
                    Your cart ({totalItems})
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="text_main" className="uppercase">
                    subtotal
                  </Typography>
                  <Typography variant="text_main">
                    {getPrice(totalPrice)} {currency}
                  </Typography>
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
              </div>
            </div>
          </div>
        )}

        {currentStep === CartSteps.CART_PAYMENTMETHODS && (
          <div className="mt-10 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={clsx(
                    'flex cursor-pointer items-center gap-4',
                    paymentMethod === method.id
                      ? 'grayscale-0'
                      : 'grayscale-100',
                  )}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <Image
                    src={method.image}
                    alt={method.label}
                    width={120}
                    height={120}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
              <PaymentForm
                onSubmit={handleSubmitPayment}
              />
              <div className="flex flex-col gap-4 p-20">
                <div className="flex items-center gap-4">
                  <Input type="text" placeholder="PROMO CODE" />
                  <Button variant="link" className="uppercase">
                    Apply
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Input type="text" placeholder="GIFT CARD" />
                  <Button variant="link" className="uppercase">
                    Apply
                  </Button>
                </div>
                <div className="mt-10 flex w-full flex-col items-center gap-4">
                  <div className="flex w-full items-center justify-between gap-4">
                    <Typography variant="text_main" className="uppercase">
                      SUBTOTAl
                    </Typography>
                    <Typography variant="text_main">
                      {getPrice(totalPrice)} {currency}
                    </Typography>
                  </div>
                  <div className="flex w-full items-center justify-between gap-4">
                    <Typography variant="text_main" className="uppercase">
                      DELIVERY
                    </Typography>
                    <Typography variant="text_main">Free</Typography>
                  </div>
                  <div className="flex w-full items-center justify-between gap-4">
                    <Typography variant="text_main" className="uppercase">
                      DISCOUNT
                    </Typography>
                    <Typography variant="text_main">-10%</Typography>
                  </div>
                  <div className="flex w-full items-center justify-between gap-4">
                    <Typography variant="text_main" className="uppercase">
                      TOTAL
                    </Typography>
                    <Typography variant="text_main">
                      {getPrice(totalPrice)} {currency}
                    </Typography>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="mt-10 flex items-center gap-2">
                      <Checkbox
                        id="terms"
                        checked={termsChecked}
                        onCheckedChange={(checked) =>
                          setTermsChecked(Boolean(checked))
                        }
                      />
                      <Typography
                        variant="text_main"
                        className="text-nowrap uppercase"
                      >
                        <Label htmlFor="terms">
                          I have read and agree to the
                          <TermsDialog />
                        </Label>
                      </Typography>
                    </div>
                    {termsError && (
                      <Typography variant="text_mini_footer" className="text-red-500">
                        You must agree to the terms and conditions
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
