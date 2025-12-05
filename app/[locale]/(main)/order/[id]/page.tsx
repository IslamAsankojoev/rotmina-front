'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import { Checkbox } from '@/shadcn/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/components/ui/form'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { OrderService, PayOrderRequest } from '@/src/entities/Order'
import { GiftCardService, TermsDialog } from '@/src/features'
import { paymentFormSchema } from '@/src/features/Cart/model'
import { GiftCard } from '@/src/features/GiftCard/model/type'
import {
  Breadcrumbs,
  Currency,
  PAYMENT_ERROR_CODES,
  PAYMENT_ERROR_CODES_ENUM,
  Typography,
  useDictionary,
  useLangCurrency,
  useLocale,
  useUser,
} from '@/src/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

enum PaymentMethods {
  CARD = 'card',
  PAYPAL = 'paypal',
  GOOGLE_PAY = 'google_pay',
  APPLE_PAY = 'apple_pay',
  BIT = 'bit',
  BANK = 'bank',
}

export default function OrderPage() {
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .payment || {
    home: 'HOME',
    cartBreadcrumb: 'CART',
    shippingInformation: 'Shipping Information',
    paymentMethods: 'Payment Methods',
    card: 'Card',
    paypal: 'Paypal',
    googlePay: 'Google Pay',
    applePay: 'Apple Pay',
    bit: 'Bit',
    bank: 'Bank',
    nameOnCard: 'NAME ON CARD',
    cardNumber: 'CARD NUMBER',
    telephone: 'TELEPHONE',
    expDate: 'EXP DATE',
    cvv: 'CVV',
    iHaveReadAndAgree: 'I have read and agree to the',
    pay: 'Pay',
    promoCode: 'PROMO CODE',
    apply: 'Apply',
    giftCard: 'GIFT CARD',
    searching: 'Searching...',
    giftCardAlreadyUsed: 'This gift card has already been used',
    giftCardExists: 'Gift is exists and is not used, you can apply it',
    giftCardNotFound: 'Gift card not found',
    subtotal: 'SUBTOTAl',
    delivery: 'DELIVERY',
    includes: 'Includes',
    vat: 'VAT',
    default: 'default',
    total: 'TOTAL',
    paymentSuccessful: 'Payment successful',
    giftCardAppliedSuccess: 'Gift card applied successfully',
    wrongCardNumber: 'Wrong card number',
    wrongExpirationDate: 'Wrong expiration date',
    wrongCvv: 'Wrong CVV',
    expiredCard: 'Expired card',
    giftCardFor: 'Gift card for',
    personalStylist: 'Personal stylist',
    minutes: 'minutes',
    product: 'Product',
    unknownProduct: 'Unknown product',
    minItemPriceError: 'Each item must cost at least 1',
    minPaymentAmountError: 'Minimum payment amount is 1',
    paymentNotAvailable: 'This payment method is not available yet',
  }

  const paymentMethods = [
    {
      id: PaymentMethods.CARD,
      label: t.card,
      image: '/payments/card.png',
    },
    {
      id: PaymentMethods.PAYPAL,
      label: t.cash,
      image: '/payments/paypal.png',
    },
    {
      id: PaymentMethods.GOOGLE_PAY,
      label: t.googlePay,
      image: '/payments/google-pay.png',
    },
    {
      id: PaymentMethods.APPLE_PAY,
      label: t.applePay,
      image: '/payments/apple-pay.png',
    },
    {
      id: PaymentMethods.BIT,
      label: t.bit,
      image: '/payments/bit.png',
    },
    {
      id: PaymentMethods.BANK,
      label: t.bank,
      image: '/payments/bank.png',
    },
  ]

  const { id } = useParams()
  const router = useRouter()
  const { user } = useUser()
  const { data: order } = useQuery({
    queryKey: ['order', id],
    queryFn: () => OrderService.getOrderById(id as string),
  })
  const { getPrice, currency } = useLangCurrency()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CARD,
  )
  const [giftCardCode, setGiftCardCode] = useState('')
  const [debouncedGiftCardCode, setDebouncedGiftCardCode] = useState('')
  const [appliedGiftCard, setAppliedGiftCard] = useState<GiftCard | null>(null)
  const [totalPriceWithGiftCard, setTotalPriceWithGiftCard] = useState(0)
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const [finalAmount, setFinalAmount] = useState(0)

  const { mutate: applyGiftCardMutation, isPending: isUsingGiftCard } =
    useMutation({
      mutationFn: (code: string) => GiftCardService.applyGiftCard(code),
    })


  const { mutate: changeOrderStatusToPaidMutation } =
    useMutation({
      mutationFn: ({ orderId, shipmentTracking }: { orderId: number, shipmentTracking: number }) => OrderService.changeOrderStatusToPaid(orderId, shipmentTracking),
      onSuccess: () => {
        toast.success(t.paymentSuccessful)
        router.push(`/account`)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const {
    data: giftCardData,
    isLoading: isSearchingGiftCard,
    error: giftCardError,
  } = useQuery({
    queryKey: ['giftCard', debouncedGiftCardCode],
    queryFn: () => GiftCardService.getGiftCardByCode(debouncedGiftCardCode),
    enabled: debouncedGiftCardCode.length > 0 && !appliedGiftCard,
    retry: false,
  })

  const handleApplyGiftCard = () => {
    if (giftCardData) {
      setAppliedGiftCard(giftCardData)
      setTotalPriceWithGiftCard(Number(order?.data?.total_amount || 0) - Number(giftCardData?.amount || 0))
    }
  }

  const orderItems =
    order?.data?.order_items?.map((item) => {
      let code: string
      let name: string
      let unit_price: number

      switch (item?.type) {
        case 'giftcard':
          code = `GIFT-${item?.price_snapshot}`
          name = `${t.giftCardFor} ${item.gift_card?.recipientsName}.`
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
          break

        case 'personalStylist':
          code = `STYLIST-${item?.personal_stylist?.minutes}`
          name = `${t.personalStylist} (${item?.personal_stylist?.minutes} ${t.minutes})`
          unit_price = parseFloat(
            item?.personal_stylist?.price?.toString() || '0',
          )
          break

        case 'product':
          code =
            item?.variant?.sku || `PRODUCT-${item?.variant?.id || 'unknown'}`
          name = item.variant?.product?.title || t.product
          unit_price = parseFloat(item?.variant?.price?.toString() || '0')
          break

        default:
          code = `UNKNOWN-${item?.type}`
          name = t.unknownProduct
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
      }

      return {
        code: code,
        name: name,
        unit_price: unit_price,
        unit_type: 1,
        units_number: item?.quantity,
        currency_code: order?.data?.currency_code || Currency.ILS,
        attributes: [] as Array<{ name: string; value: string }>,
      }
    }) || []

  const form = useForm<z.infer<typeof paymentFormSchema>>({
    defaultValues: {
      cardNumber: '',
      nameOnCard: '',
      phone: '',
      expirationDate: '',
      cvv: '',
      terms: false,
    },
    resolver: zodResolver(paymentFormSchema),
  })

  const { mutate: payOrder, isPending } = useMutation({
    mutationFn: (data: PayOrderRequest) => OrderService.payOrder(data),
  })

  const onSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    const discount = appliedGiftCard ? appliedGiftCard.amount : 0

    const itemsWithLowPrice = orderItems.filter((item) => item.unit_price < 1)
    if (itemsWithLowPrice.length > 0) {
      toast.error(
        `${t.minItemPriceError} ${order?.data?.currency_code || 'ILS'}`,
        { position: 'top-center' },
      )
      return
    }

    if (finalAmount < 1) {
      toast.error(
        `${t.minPaymentAmountError} ${order?.data?.currency_code || 'ILS'}`,
        { position: 'top-center' },
      )
      return
    }

    // Распределяем доставку пропорционально стоимости товаров
    const itemsWithDelivery = (() => {
      if (deliveryPrice === 0 || orderItems.length === 0) {
        return orderItems
      }

      // Рассчитываем общую стоимость всех товаров (с учетом количества)
      const totalItemsValue = orderItems.reduce(
        (sum, item) => sum + item.unit_price * item.units_number,
        0,
      )

      if (totalItemsValue === 0) {
        return orderItems
      }

      // Распределяем доставку пропорционально стоимости каждого товара
      // Последнему товару даем остаток, чтобы сумма была точной
      let remainingDelivery = deliveryPrice
      
      return orderItems.map((item, index) => {
        const itemTotalValue = item.unit_price * item.units_number
        let deliveryShare: number
        
        if (index === orderItems.length - 1) {
          // Последнему товару даем остаток, чтобы сумма была точно равна deliveryPrice
          deliveryShare = remainingDelivery
        } else {
          // Рассчитываем долю пропорционально стоимости
          deliveryShare = (itemTotalValue / totalItemsValue) * deliveryPrice
          remainingDelivery -= deliveryShare
        }
        
        // Добавляем долю доставки к цене за единицу
        const unitPriceWithDelivery = item.unit_price + deliveryShare / item.units_number

        return {
          ...item,
          unit_price: Number(unitPriceWithDelivery.toFixed(2)),
        }
      })
    })()

    const addressArray = order?.data?.shipping_address?.address.split('|') || []
    const streetName = addressArray[0] || ''
    const houseNum = addressArray[1] || ''
    const entrance = addressArray[2] || ''
    const floor = addressArray[3] || ''
    const apartment = addressArray[4] || ''

    try {
      const shipmentResponse = await OrderService.createShipment({
        clientId: user?.data?.id || 0,
        orderId: order?.data?.order_number || 0,
        cityName: order?.data?.shipping_address?.city || '',
        streetName,
        houseNum,
        apartment,
        floor,
        entrance,
        telFirst: data.phone || '',
        telSecond: data.phone || '',
        email: user?.data?.email || '',
        productsPrice: Number(order?.data?.total_amount || 0),
        productPriceCurrency: order?.data?.currency_code || Currency.ILS,
        shipmentWeight: 0,
        govina: {
          code: 0,
          sum: 0,
          date: '',
          remarks: '',
        },
        ordererName: 'Rotmina',
        nameTo: user?.data?.username || '',
        cityCode: '100',
        streetCode: '200',
        packsHaloch: '',
      })

      if (shipmentResponse.shipmentNumber) {
        if(shipmentResponse.shipmentNumber > 0) {
          toast.success('We cant deliver your order to this address. Please contact us.')
        } else {
          toast.error('Failed to create shipment')
        }
      } else {
        toast.error('Failed to create shipment')
      }

      const paymentData = {
        orderId: order?.data?.order_number?.toString() || '',
        clientId: user?.data?.id?.toString() || '',
        txn_currency_code: order?.data?.currency_code || 'ILS',
        card_number: data.cardNumber,
        expire_month: data.expirationDate.split('/')[0],
        expire_year: data.expirationDate.split('/')[1],
        cvv: data.cvv,
        discount: discount,
        items: itemsWithDelivery,
      }

      payOrder(paymentData, {
        onSuccess: (response) => {
          if (
            // response.data.transaction_result.processor_response_code === '000'
            true
          ) {
            applyGiftCardMutation(appliedGiftCard?.code || '', {
              onSuccess: () => {
                toast.success(t.giftCardAppliedSuccess)
              },
              onError: (error) => {
                toast.error(error.message)
              },
            })
  
            changeOrderStatusToPaidMutation({ orderId: order?.data?.order_number || 0, shipmentTracking: shipmentResponse.shipmentNumber || 0 })
          } else {
            switch (response.data.transaction_result.processor_response_code) {
              case PAYMENT_ERROR_CODES_ENUM.WRONG_CARD_NUMBER:
                form.setError('cardNumber', {
                  message: t.wrongCardNumber,
                })
                break
              case PAYMENT_ERROR_CODES_ENUM.WRONG_EXPIRATION_DATE:
                form.setError('expirationDate', {
                  message: t.wrongExpirationDate,
                })
                break
              case PAYMENT_ERROR_CODES_ENUM.WRONG_CVV:
                form.setError('cvv', {
                  message: t.wrongCvv,
                })
                break
              case PAYMENT_ERROR_CODES_ENUM.EXPIRED_CARD:
                form.setError('expirationDate', {
                  message: t.expiredCard,
                })
                break
              case PAYMENT_ERROR_CODES_ENUM.REFUSAL:
                toast.error(
                  PAYMENT_ERROR_CODES[
                    response.data.transaction_result.processor_response_code
                  ],
                  { position: 'top-center' },
                )
                break
              default:
                toast.error(
                  PAYMENT_ERROR_CODES[
                    response.data.transaction_result.processor_response_code
                  ],
                  { position: 'top-center' },
                )
                break
            }
          }
        },
        onError: (error) => {
          toast.error(error.message)
        },
      })
    } catch (error: unknown) {
      toast.error(error as string)
    }

    
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedGiftCardCode(giftCardCode)
    }, 500)

    return () => clearTimeout(timer)
  }, [giftCardCode])

  useEffect(() => {
    if (giftCardCode !== appliedGiftCard?.code) {
      setAppliedGiftCard(null)
    }
  }, [giftCardCode, appliedGiftCard?.code])

  useEffect(() => {
    if (currency === 'ILS') {
      if(order?.data?.total_amount && order?.data?.total_amount <= 499){
        setDeliveryPrice(30)
      } else {
        setDeliveryPrice(0)
      }
    } else {
      setDeliveryPrice(165)
    }
  }, [currency, order?.data?.total_amount])

  useEffect(() => {
    setFinalAmount(
      (appliedGiftCard ? totalPriceWithGiftCard : Number(order?.data?.total_amount || 0)) + deliveryPrice,
    )
  }, [appliedGiftCard, totalPriceWithGiftCard, order?.data?.total_amount, deliveryPrice])

  return (
    <>
      <div className="relative container my-10 flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: localizePath('/') },
            { title: t.cartBreadcrumb, href: localizePath('/cart') },
          ]}
        />
        <div className="border-greyy/70 mt-16 flex flex-col justify-between md:flex-row md:border-b">
          <Typography variant="text_main" className="text-greyy uppercase">
            {t.shippingInformation}
          </Typography>
          <Typography
            variant="text_main"
            className="border-b border-black uppercase"
          >
            {t.paymentMethods}
          </Typography>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {paymentMethods.map((method) => {
              const isAvailable = method.id === PaymentMethods.CARD
              return (
                <div
                  key={method.id}
                  className={clsx(
                    'flex h-12 items-center hover:scale-105',
                    isAvailable
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-50',
                    paymentMethod === method.id
                      ? 'grayscale-0'
                      : 'grayscale-100',
                  )}
                  onClick={() => {
                    if (isAvailable) {
                      setPaymentMethod(method.id)
                    } else {
                      toast.error(t.paymentNotAvailable, {
                        position: 'top-center',
                      })
                    }
                  }}
                >
                  <Image
                    src={method.image}
                    alt={method.label}
                    width={100}
                    height={48}
                    className="h-[18px] w-auto object-contain"
                  />
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="nameOnCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.nameOnCard} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.cardNumber} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.telephone} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.expDate} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.cvv} maxLength={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label htmlFor="terms" className="inline">
                          {t.iHaveReadAndAgree} <TermsDialog />
                        </Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="uppercase"
                  variant="default"
                  size="lg"
                  disabled={isPending || isUsingGiftCard}
                >
                  {isPending ? <Spinner /> : t.pay}
                </Button>
              </form>
            </Form>
            <div className="flex flex-col gap-4 p-2 md:p-20">
              <div className="flex items-center gap-4">
                <Input type="text" placeholder={t.promoCode} />
                <Button variant="link" className="uppercase">
                  {t.apply}
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex w-full flex-col gap-2">
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder={t.giftCard}
                      value={giftCardCode}
                      onChange={(e) => setGiftCardCode(e.target.value)}
                      disabled={!!appliedGiftCard}
                    />
                    <Button
                      variant="link"
                      className="uppercase"
                      onClick={handleApplyGiftCard}
                      disabled={
                        !giftCardData ||
                        isSearchingGiftCard ||
                        giftCardData?.is_used
                      }
                    >
                      {isSearchingGiftCard ? <Spinner /> : t.apply}
                    </Button>
                  </div>
                  {isSearchingGiftCard && (
                    <Typography
                      variant="text_main"
                      className="text-sm text-gray-500"
                    >
                      {t.searching}
                    </Typography>
                  )}
                  {giftCardData && giftCardData?.is_used && (
                    <Typography
                      variant="text_main"
                      className="text-sm text-red-600"
                    >
                      {t.giftCardAlreadyUsed}
                    </Typography>
                  )}
                  {giftCardData && !giftCardData?.is_used && (
                    <Typography
                      variant="text_main"
                      className="text-sm text-green-600"
                    >
                      {t.giftCardExists}
                    </Typography>
                  )}
                  {giftCardError && !isSearchingGiftCard && (
                    <Typography
                      variant="text_main"
                      className="text-sm text-red-600"
                    >
                      {t.giftCardNotFound}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="mt-10 flex w-full flex-col items-center gap-4">
                <div className="flex w-full items-center justify-between gap-4">
                  <Typography variant="text_main" className="uppercase">
                    {t.subtotal}
                  </Typography>
                  <Typography variant="text_main">
                    {getPrice(Number(order?.data?.total_amount || 0))} {currency}
                  </Typography>
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                  <Typography variant="text_main" className="uppercase">
                    {t.delivery}
                  </Typography>
                  <Typography variant="text_main">
                    {deliveryPrice === 0
                      ? t.includes
                      : `${getPrice(deliveryPrice)} ${currency}`}
                  </Typography>
                </div>
                {currency === 'ILS' && (
                  <div className="flex w-full items-center justify-between gap-4">
                    <Typography variant="text_main" className="uppercase">
                      {t.vat}
                    </Typography>
                    <Typography variant="text_main">{t.default}</Typography>
                  </div>
                )}
                <div className="flex w-full items-center justify-between gap-4">
                  <Typography variant="text_main" className="uppercase">
                    {t.total}
                  </Typography>
                  <Typography variant="text_main">
                    {getPrice(finalAmount)} {currency}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
