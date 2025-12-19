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
  SorryModal,
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
  getAddress,
  getOrderItems,
  getShipmentData,
  getShipmentToGoData,
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
    cardHolderId: 'CARD HOLDER ID',
    giftCardAmountExceedsOrderTotal:
      'Gift card amount exceeds order total, please add more items to your order',
    alreadyAppliedGiftCard: 'Already applied gift card',
    shipment: 'Shipment',
    shipmentToGo: 'Shipment ToGo',
    discount: 'Discount',
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
  const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState(false)
  const [openSorryModal, setOpenSorryModal] = useState(false)
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<boolean>(false)
  const [discountPrice, setDiscountPrice] = useState<number>(0)
  const { mutate: applyGiftCardMutation, isPending: isUsingGiftCard } =
    useMutation({
      mutationFn: (code: string) =>
        GiftCardService.applyGiftCard(code, id as string),
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
    if (giftCardData && !giftCardData.is_used) {
      applyGiftCardMutation(debouncedGiftCardCode, {
        onSuccess: () => {
          setAppliedGiftCard(giftCardData)
        },
        onError: (error) => {
          toast.error(error.message)
        },
      })
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
      cardHolderId: lang === Code.EN ? '123456789' : '',
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
    mutationFn: (data: PayServiceCreateRequest) =>
      OrderService.payServiceCreate(data),
  })

  const onSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    try {
      const payData = getPaySettings({
        txn_currency_code: currency || Currency.ILS,
        card_number: data.cardNumber,
        expire_month: Number(data.expirationDate.split('/')[0]),
        expire_year: Number(data.expirationDate.split('/')[1]),
        card_holder_id: data.cardHolderId,
        cvv: data.cvv,
        client: {
          email: user?.data?.email || '',
          address_line_1: order?.data?.shipping_address?.address || '',
          address_line_2: order?.data?.shipping_address?.address || '',
        },
        items: orderItems.map((item) => {
          return {
            code: item.code,
            name: item.name,
            unit_price: getPrice(Number(item.unit_price)),
            type: item.type,
            units_number: item.units_number,
            unit_type: item.unit_type,
            price_type: 'G',
            currency_code: currency,
            to_txn_currency_exchange_rate: 1,
          }
        }),
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

  const renderGiftCardMessage = () => {
    if (appliedDiscountCode) {
      return (
        <Typography variant="text_main" className="text-sm text-green-600">
          {t.alreadyAppliedGiftCard}
        </Typography>
      )
    }
    if (
      giftCardData &&
      Number(giftCardData.amount || 0) > Number(order?.data?.total_amount || 0)
    ) {
      return (
        <Typography variant="text_main" className="text-sm text-red-600">
          {t.giftCardAmountExceedsOrderTotal}
        </Typography>
      )
    }
    if (giftCardData && giftCardData?.is_used) {
      return (
        <Typography variant="text_main" className="text-sm text-red-600">
          {t.giftCardAlreadyUsed}
        </Typography>
      )
    }
    if (giftCardData && !giftCardData?.is_used) {
      return (
        <Typography variant="text_main" className="text-sm text-green-600">
          {t.giftCardExists}
        </Typography>
      )
    }
    if (giftCardError && !isSearchingGiftCard) {
      return (
        <Typography variant="text_main" className="text-sm text-red-600">
          {t.giftCardNotFound}
        </Typography>
      )
    }
    return null
  }

  useEffect(() => {
    if (order?.data?.order_items?.find((item) => item.type === 'discount')) {
      setAppliedDiscountCode(true)
      setDiscountPrice(
        Number(
          order?.data?.order_items?.find((item) => item.type === 'discount')
            ?.price_snapshot || 0,
        ),
      )
    } else {
      setAppliedDiscountCode(false)
      setDiscountPrice(0)
    }
  }, [order])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedGiftCardCode(giftCardCode)
    }, 500)

    return () => clearTimeout(timer)
  }, [giftCardCode])

  useEffect(() => {
    const handleCompletePayment = async (track_id: string) => {
      const address = getAddress(order?.data?.shipping_address?.address || '')

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
            if (
              response.error_code === 0 &&
              response.transaction_result.processor_response_code === '000'
            ) {
              let shipmentTracking = ''
              // Create shipment for Israel
              if (currency === Currency.ILS) {
                const shipmentNumber: string =
                  await OrderService.createShipment(
                    getShipmentData(
                      order as OrderResponseStrapi,
                      user as UseQueryResult<User, Error>,
                      currency || Currency.ILS,
                    ),
                  ).then((response) => response)
                if (shipmentNumber) {
                  if (Number(shipmentNumber) > 0) {
                    shipmentTracking = shipmentNumber
                  } else {
                    toast.success(
                      'We cant deliver your order to this address. Please contact us.',
                    )
                  }
                } else {
                  toast.error('Failed to create shipment')
                }
              }
              // Create shipment for ToGo
              else {
                const shipmentSuccessText: string =
                  await OrderService.createShipmentToGo(
                    getShipmentToGoData(
                      order as OrderResponseStrapi,
                      user as UseQueryResult<User, Error>,
                      currency || Currency.ILS,
                    ),
                  ).then((response) => response)
                if (shipmentSuccessText === 'Shipment created.') {
                  shipmentTracking = ''
                } else {
                  toast.error('Failed to create shipment ToGo')
                }
              }
              // Pay service create
              payServiceCreate(
                {
                  TransactionId: response.transaction_result.transaction_id,
                  orderId: order?.data?.order_number?.toString() as string,
                  clientId: user?.data?.id?.toString() as string,
                  txn_currency_code: currency || Currency.ILS,
                  card_number: '1234',
                  expire_month: '12',
                  expire_year: '12',
                  cvv: '123',
                  clientEmail: user?.data?.email as string,
                  language: lang as Code,
                  items: orderItems.map((item) => ({
                    code: item.code,
                    name: item.name,
                    unit_price: getPrice(item.unit_price),
                    unit_type: item.unit_type,
                    units_number: item.units_number,
                    currency_code: currency,
                    attributes: [],
                  })),
                },
                {
                  onSuccess: (response) => {
                    if (
                      response.statusCode === 200 &&
                      response.value.id !== ''
                    ) {
                      changeOrderStatusToPaidMutation({
                        orderId: order?.data?.documentId || '',
                        shipmentTracking: shipmentTracking,
                      })
                    }
                  },
                },
              )
            } else {
              setOpenSorryModal(true)
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
    } else if (status && status !== 'success') {
      setOpenSorryModal(true)
    }
  }, [
    status,
    track_id,
    order?.data?.documentId,
    user?.data?.id,
    completePayment,
    changeOrderStatusToPaidMutation,
    setOpenSorryModal,
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
                        <Input
                          type="password"
                          placeholder={t.cvv}
                          maxLength={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {currency === Currency.ILS && (
                  <FormField
                    control={form.control}
                    name="cardHolderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={t.cardHolderId} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                  disabled={
                    isPending ||
                    isUsingGiftCard ||
                    isCompletingPayment ||
                    isPayingService
                  }
                >
                  {isPending || isCompletingPayment || isPayingService ? (
                    <Spinner />
                  ) : (
                    t.pay
                  )}
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
                      disabled={!!appliedGiftCard || appliedDiscountCode}
                    />
                    <Button
                      variant="link"
                      className="uppercase"
                      onClick={handleApplyGiftCard}
                      disabled={
                        !giftCardData ||
                        isSearchingGiftCard ||
                        giftCardData?.is_used ||
                        Number(giftCardData?.amount || 0) >
                          Number(order?.data?.total_amount || 0)
                      }
                    >
                      {isSearchingGiftCard ? <Spinner /> : t.apply}
                    </Button>
                  </div>
                  {renderGiftCardMessage()}
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
                  <Typography variant="text_main">{t.includes}</Typography>
                </div>
                {currency === 'ILS' && (
                  <div className="flex w-full items-center justify-between gap-4">
                    <Typography variant="text_main" className="uppercase">
                      {t.vat}
                    </Typography>
                    <Typography variant="text_main">{t.default}</Typography>
                  </div>
                )}
                {discountPrice > 0 && (
                  <div className="flex w-full items-center justify-between gap-4">
                    <Typography variant="text_main" className="uppercase">
                      Discount
                    </Typography>
                    <Typography variant="text_main">
                      {getPrice(discountPrice)} {currency}
                    </Typography>
                  </div>
                )}
                <div className="flex w-full items-center justify-between gap-4">
                  <Typography variant="text_main" className="uppercase">
                    {t.total}
                  </Typography>
                  <Typography variant="text_main">
                    {getPrice(
                      Number(order?.data?.total_amount || 0) - discountPrice,
                    )}{' '}
                    {currency}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SorryModal isOpen={openSorryModal} onOpenChange={setOpenSorryModal} />
      <SuccessPaymentModal
        open={openSuccessPaymentModal}
        onOpenChange={handleCloseSuccessPaymentModal}
      />
    </>
  )
}
