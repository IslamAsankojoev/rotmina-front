'use client'

import { useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import { Checkbox } from '@/shadcn/components/ui/checkbox'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { ScrollArea } from '@/shadcn/components/ui/scroll-area'
import { Separator } from '@/shadcn/components/ui/separator'
import { useCartActions, useCartInfo } from '@/src/app'
import { CreateOrderRequest, OrderService, OrderItem } from '@/src/entities/Order'
import { AddressForm, CartItem, PaymentForm, TermsDialog } from '@/src/features'
import { AddressService } from '@/src/features/Address'
import { addressFormSchema, paymentFormSchema } from '@/src/features/Cart/model'
import { Breadcrumbs, Typography, useLangCurrancy } from '@/src/shared'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
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
  const { updateQuantity, removeItem, clearCart } = useCartActions()
  const { getPrice, currency } = useLangCurrancy()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CARD,
  )
  const [termsChecked, setTermsChecked] = useState(true)
  const [termsError, setTermsError] = useState(false)
  const [shippingAddress, setShippingAddress] = useState<string | null>(null)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
  }

  const handleSubmitAddress = (data: z.infer<typeof addressFormSchema>) => {
    const address = `${data.address}`
    if (!!data.address) {
      AddressService.addAddress(address)
      .then((res) => {
        if (res.success) {
          toast.success('Адрес успешно добавлен')
          setCurrentStep(CartSteps.CART_PAYMENTMETHODS)
        } else {
          toast.error(res.message)
        }
      })
       .catch(() => {
         toast.error('Произошла ошибка при добавлении адреса')
       })
    } else {
      setCurrentStep(CartSteps.CART_PAYMENTMETHODS)
    } 
  }

  const handleSubmitPayment = async (
    _data: z.infer<typeof paymentFormSchema>,
  ) => {
    if (!termsChecked) {
      setTermsError(true)
      return
    }
    setTermsError(false)

    if (!shippingAddress) {
      toast.error('Адрес доставки не заполнен')
      return
    }

    if (items.length === 0) {
      toast.error('Корзина пуста')
      return
    }

    setIsCreatingOrder(true)

    try {
      // Преобразуем все товары из корзины в элементы заказа
      const orderItems: OrderItem[] = []
      
      for (const item of items) {
        if (item.type === 'product') {
          orderItems.push({
            id: item.id,
            type: 'product' as const,
            variant: {
              id: item.variant.id,
              documentId: item.variant.documentId,
              sku: item.variant.sku,
              price: item.variant.price,
              stock: item.variant.stock,
              is_active: item.variant.is_active,
              images: item.variant.images || null,
              size: {
                id: item.variant.size.id,
                documentId: item.variant.size.documentId,
                name: item.variant.size.name,
                sort_order: item.variant.size.sort_order,
                slug: item.variant.size.slug,
              },
              color: {
                id: item.variant.color.id,
                documentId: item.variant.color.documentId,
                name: item.variant.color.name,
                code: item.variant.color.code,
                slug: item.variant.color.slug,
                hex: item.variant.color.hex,
              }
            },
            productTitle: item.productTitle,
            productSlug: item.productSlug,
            quantity: item.quantity,
            price: item.price,
          })
        } else if (item.type === 'giftcard') {
          orderItems.push({
            id: item.id,
            type: 'giftcard' as const,
            amount: item.amount,
            recipientEmail: item.recipientEmail,
            recipientName: item.recipientName,
            message: item.message,
            quantity: item.quantity,
            price: item.price,
          })
        } else if (item.type === 'personalStylist') {
          orderItems.push({
            id: item.id,
            type: 'personalStylist' as const,
            sessionType: item.sessionType,
            duration: item.duration,
            quantity: item.quantity,
            price: item.price,
          })
        }
      }

      // Создаем заказ
      const orderData: CreateOrderRequest = {
        payment_method: paymentMethod,
        // payment_details: {
        //   card_number: data.cardNumber,
        //   name_on_card: data.nameOnCard,
        //   expiration_date: data.expirationDate,
        //   cvv: data.cvv,
        // },
        totalPrice,
        payment_status: 'unpaid',
        notes: 'Заказ создан через веб-сайт',
        addressId: shippingAddress,
        items: orderItems,
      }

      await OrderService.createOrder(orderData)

      toast.success('Заказ успешно создан!')

      // Перенаправляем на страницу успеха или истории заказов
      router.push('/account')
    } catch (error) {
      console.error('Ошибка при создании заказа:', error)
      toast.error('Произошла ошибка при создании заказа. Попробуйте еще раз.')
    } finally {
      setIsCreatingOrder(false)
    }
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
            <AddressForm onSubmit={handleSubmitAddress} setShippingAddress={setShippingAddress} />
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
                isLoading={isCreatingOrder}
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
                      <Typography
                        variant="text_mini_footer"
                        className="text-red-500"
                      >
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
