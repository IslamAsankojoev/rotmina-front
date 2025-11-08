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
import { useCartInfo } from '@/src/app'
import { OrderService, PayOrderRequest } from '@/src/entities/Order'
import { GiftCardService, TermsDialog } from '@/src/features'
import { paymentFormSchema } from '@/src/features/Cart/model'
import { GiftCard } from '@/src/features/GiftCard/model/type'
import {
  Breadcrumbs,
  PAYMENT_ERROR_CODES,
  PAYMENT_ERROR_CODES_ENUM,
  Typography,
  useLangCurrancy,
  useUser,
  useDictionary,
  useLocale,
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
  CASH = 'cash',
}

export default function OrderPage() {
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const t = (dictionary as Record<string, Record<string, string>>).payment || {
    home: 'HOME',
    cartBreadcrumb: 'CART',
    shippingInformation: 'Shipping Information',
    paymentMethods: 'Payment Methods',
    card: 'Card',
    cash: 'Cash',
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
    free: 'Free',
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
  }

  const paymentMethods = [
    {
      id: PaymentMethods.CARD,
      label: t.card,
      image: '/payments/card.png',
    },
    {
      id: PaymentMethods.CASH,
      label: t.cash,
      image: '/payments/card.png',
    },
  ]

  const { id } = useParams()
  const router = useRouter()
  const { user } = useUser()
  const { data: order } = useQuery({
    queryKey: ['order', id],
    queryFn: () => OrderService.getOrderById(id as string),
  })
  const { totalPrice } = useCartInfo()
  const { getPrice, currency } = useLangCurrancy()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CARD,
  )
  const [giftCardCode, setGiftCardCode] = useState('')
  const [debouncedGiftCardCode, setDebouncedGiftCardCode] = useState('')
  const [appliedGiftCard, setAppliedGiftCard] = useState<GiftCard | null>(null)
  const [totalPriceWithGiftCard, setTotalPriceWithGiftCard] = useState(0)

  const { mutate: applyGiftCardMutation, isPending: isUsingGiftCard } =
    useMutation({
      mutationFn: (code: string) => GiftCardService.applyGiftCard(code),
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
      setTotalPriceWithGiftCard(totalPrice - giftCardData?.amount)
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
        currency_code: order?.data?.currency_code || 'ILS',
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
    const paymentData = {
      orderId: order?.data?.id?.toString() || '',
      clientId: user?.data?.id?.toString() || '',
      txn_currency_code: order?.data?.currency_code || 'ILS',
      card_number: data.cardNumber,
      expire_month: data.expirationDate.split('/')[0],
      expire_year: data.expirationDate.split('/')[1],
      cvv: data.cvv,
      items: orderItems,
    }

    payOrder(paymentData, {
      onSuccess: (response) => {
        if (
          response.data.transaction_result.processor_response_code === '000'
        ) {
          applyGiftCardMutation(appliedGiftCard?.code || '', {
            onSuccess: () => {
              toast.success(t.giftCardAppliedSuccess)
            },
            onError: (error) => {
              toast.error(error.message)
            },
          })
          toast.success(t.paymentSuccessful)
          router.push(`/account`)
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
  }

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
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={clsx(
                  'flex cursor-pointer items-center gap-4',
                  paymentMethod === method.id ? 'grayscale-0' : 'grayscale-100',
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
                    {getPrice(totalPrice)} {currency}
                  </Typography>
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                  <Typography variant="text_main" className="uppercase">
                    {t.delivery}
                  </Typography>
                  <Typography variant="text_main">{t.free}</Typography>
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
                    {getPrice(
                      appliedGiftCard ? totalPriceWithGiftCard : totalPrice,
                    )}{' '}
                    {currency}
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
