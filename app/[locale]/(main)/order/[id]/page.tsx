'use client'

import { useEffect, useRef, useState } from 'react'

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
import {
  CompletePaymentRequest,
  OrderResponseStrapi,
  OrderService,
  PayOrderRequest,
  PayServiceCreateRequest,
} from '@/src/entities/Order'
import { getPaySettings } from '@/src/entities/Order/model/getPaySettings'
import {
  GiftCardService,
  SuccessPaymentModal,
  TermsDialog,
} from '@/src/features'
import { User } from '@/src/features/Auth/model/type'
import { paymentFormSchema } from '@/src/features/Cart/model'
import { GiftCard } from '@/src/features/GiftCard/model/type'
import {
  Breadcrumbs,
  Code,
  Currency,
  PAYMENT_ERROR_CODES,
  Typography,
  useDictionary,
  useLangCurrency,
  useLocale,
  useUser,
} from '@/src/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import {
  getItemsWithDelivery,
  getOrderItems,
  getShipmentData,
} from './utils'

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
  const searchParams = useSearchParams()
  const status: 'success' | 'error' | 'cancel' | null = searchParams.get(
    'status',
  ) as 'success' | 'error' | 'cancel' | null
  const track_id: string | null = searchParams.get('track_id') as string | null
  const router = useRouter()
  const { user } = useUser()
  const { data: order } = useQuery({
    queryKey: ['order', id],
    queryFn: () => OrderService.getOrderById(id as string),
  })
  const { getPrice, currency, lang } = useLangCurrency()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CARD,
  )
  const [giftCardCode, setGiftCardCode] = useState('')
  const [debouncedGiftCardCode, setDebouncedGiftCardCode] = useState('')
  const [appliedGiftCard, setAppliedGiftCard] = useState<GiftCard | null>(null)
  const [totalPriceWithGiftCard, setTotalPriceWithGiftCard] = useState(0)
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const [finalAmount, setFinalAmount] = useState(0)
  const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState(false)

  const { mutate: applyGiftCardMutation, isPending: isUsingGiftCard } =
    useMutation({
      mutationFn: (code: string) => GiftCardService.applyGiftCard(code),
    })

  const { mutate: changeOrderStatusToPaidMutation } = useMutation({
    mutationFn: ({
      orderId,
      shipmentTracking,
    }: {
      orderId: string
      shipmentTracking: string
    }) => OrderService.changeOrderStatusToPaid(orderId, shipmentTracking),
    onSuccess: () => {
      setOpenSuccessPaymentModal(true)
    },
  })

  const completedPaymentRef = useRef<string | null>(null)

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
      setTotalPriceWithGiftCard(
        Number(order?.data?.total_amount || 0) -
          Number(giftCardData?.amount || 0),
      )
    }
  }

  const handleCloseSuccessPaymentModal = async () => {
    
    setOpenSuccessPaymentModal(false)
    router.push(`/account`)
  }

  const orderItems = getOrderItems(
    order as OrderResponseStrapi,
    t as unknown as Record<string, Record<string, string>>,
  )

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
  const { mutate: completePayment, isPending: isCompletingPayment } =
    useMutation({
      mutationFn: (data: CompletePaymentRequest) =>
        OrderService.completePayment(data),
    })

  const { mutate: payServiceCreate, isPending: isPayingService } = useMutation({
    mutationFn: (data: PayServiceCreateRequest) => OrderService.payServiceCreate(data),
  })

  const onSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
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

    const itemsWithDelivery = getItemsWithDelivery(orderItems, deliveryPrice)

    try {
      const payData = getPaySettings({
        txn_currency_code: order?.data?.currency_code || Currency.ILS,
        card_number: data.cardNumber,
        expire_month: Number(data.expirationDate.split('/')[0]),
        expire_year: Number(data.expirationDate.split('/')[1]),
        client: {
          email: user?.data?.email || '',
          address_line_1: order?.data?.shipping_address?.address || '',
          address_line_2: order?.data?.shipping_address?.address || '',
        },
        items: itemsWithDelivery.map((item) => ({
          code: item.code,
          name: item.name,
          unit_price: item.unit_price,
          type: 'I',
          units_number: item.units_number,
          unit_type: item.unit_type,
          price_type: 'G',
          currency_code: item.currency_code,
          to_txn_currency_exchange_rate: 1,
        })),
        auth_3ds_redirect: {
          url: `${process.env.URL}/${lang}/order/${id}`,
          params: [],
        },
      })

      payOrder(payData as PayOrderRequest, {
        onSuccess: async (response) => {
          if (response.error_code === 0) {
            if (
              response.transaction_result &&
              response.transaction_result?.processor_response_code !== '000'
            ) {
              toast.error(
                PAYMENT_ERROR_CODES[
                  response.transaction_result
                    ?.processor_response_code as keyof typeof PAYMENT_ERROR_CODES
                ] || 'Payment failed, please try again',
              )
            } else {
              window.location.href = response['3ds_data'].challengeUrl
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
      if (order?.data?.total_amount && order?.data?.total_amount <= 499) {
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
      (appliedGiftCard
        ? totalPriceWithGiftCard
        : Number(order?.data?.total_amount || 0)) + deliveryPrice,
    )
  }, [
    appliedGiftCard,
    totalPriceWithGiftCard,
    order?.data?.total_amount,
    deliveryPrice,
  ])

  useEffect(() => {
    const handleCompletePayment = async (track_id: string) => {
      if (completedPaymentRef.current === track_id) {
        return
      }
      
      completedPaymentRef.current = track_id
      
      completePayment(
        {
          track_id: track_id,
          terminal_name: 'rotmina',
        },
        {
          onSuccess: async (response) => {
            if(response.error_code === 0){
              payServiceCreate({
                TransactionId: response.transaction_result.transaction_id,
                orderId: order?.data?.order_number?.toString() as string,
                clientId: user?.data?.id?.toString() as string,
                txn_currency_code: order?.data?.currency_code || Currency.ILS,
                card_number: form.getValues('cardNumber'),
                expire_month: form.getValues('expirationDate').split('/')[0],
                expire_year: form.getValues('expirationDate').split('/')[1],
                cvv: form.getValues('cvv'),
                clientEmail: user?.data?.email as string,
                language: lang as Code,
                items: getItemsWithDelivery(orderItems, deliveryPrice).map((item) => ({
                  code: item.code,
                  name: item.name,
                  unit_price: item.unit_price,
                  unit_type: item.unit_type,
                  units_number: item.units_number,
                  currency_code: item.currency_code,
                  attributes: [],
                })),
              })
              const shipmentNumber: string = await OrderService.createShipment(
                getShipmentData(
                  order as OrderResponseStrapi,
                  user as UseQueryResult<User, Error>,
                ),
              ).then((response) => response)
              if (shipmentNumber) {
                if (Number(shipmentNumber) > 0) {
                  changeOrderStatusToPaidMutation({
                    orderId: order?.data?.documentId || '',
                    shipmentTracking: shipmentNumber,
                  })
                } else {
                  toast.success(
                    'We cant deliver your order to this address. Please contact us.',
                  )
                }
              } else {
                toast.error('Failed to create shipment')
              }
            }
          },
          onError: (error) => {
            toast.error(error.message)
            completedPaymentRef.current = null
          },
        },
      )
    }
    
    if (
      status === 'success' &&
      track_id &&
      order?.data?.documentId &&
      user?.data?.id &&
      completedPaymentRef.current !== track_id
    ) {
      handleCompletePayment(track_id)
    }
    if(status === 'cancel'){
      toast.error('Payment canceled')
    }
  }, [
    status,
    track_id,
    order?.data?.documentId,
    user?.data?.id,
    completePayment,
    changeOrderStatusToPaidMutation,
  ])

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
                  <img
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
                  disabled={isPending || isUsingGiftCard || isCompletingPayment || isPayingService}
                >
                  {(isPending || isCompletingPayment || isPayingService) ? <Spinner /> : t.pay}
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
                    {getPrice(Number(order?.data?.total_amount || 0))}{' '}
                    {currency}
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
      <SuccessPaymentModal
        open={openSuccessPaymentModal}
        onOpenChange={handleCloseSuccessPaymentModal}
      />
    </>
  )
}
