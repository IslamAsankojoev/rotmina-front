'use client'

import { useState } from 'react'

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
import { TermsDialog } from '@/src/features'
import { paymentFormSchema } from '@/src/features/Cart/model'
import {
  Breadcrumbs,
  PAYMENT_ERROR_CODES,
  PAYMENT_ERROR_CODES_ENUM,
  Typography,
  useLangCurrancy,
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

export default function OrderPage() {
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
  const orderItems =
    order?.data?.order_items?.map((item) => {
      let code: string
      let name: string
      let unit_price: number

      switch (item?.type) {
        case 'giftcard':
          code = `GIFT-${item?.price_snapshot}`
          name = `Gift card for ${item.gift_card?.recipientsName}.`
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
          break

        case 'personalStylist':
          code = `STYLIST-${item?.personal_stylist?.minutes}`
          name = `Personal stylist (${item?.personal_stylist?.minutes} minutes)`
          unit_price = parseFloat(
            item?.personal_stylist?.price?.toString() || '0',
          )
          break

        case 'product':
          code =
            item?.variant?.sku || `PRODUCT-${item?.variant?.id || 'unknown'}`
          name = item.variant?.product?.title || 'Product'
          unit_price = parseFloat(item?.variant?.price?.toString() || '0')
          break

        default:
          code = `UNKNOWN-${item?.type}`
          name = 'Unknown product'
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
      cardNumber: '4012888811110001',
      nameOnCard: 'John Doe',
      phone: '+1234567890',
      expirationDate: '12/25',
      cvv: '123',
      terms: true,
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
          toast.success('Payment successful')
          router.push(`/account`)
        } else {
          switch (response.data.transaction_result.processor_response_code) {
            case PAYMENT_ERROR_CODES_ENUM.WRONG_CARD_NUMBER:
              form.setError('cardNumber', {
                message: 'Wrong card number',
              })
              break
            case PAYMENT_ERROR_CODES_ENUM.WRONG_EXPIRATION_DATE:
              form.setError('expirationDate', {
                message: 'Wrong expiration date',
              })
              break
            case PAYMENT_ERROR_CODES_ENUM.WRONG_CVV:
              form.setError('cvv', {
                message: 'Wrong CVV',
              })
              break
            case PAYMENT_ERROR_CODES_ENUM.EXPIRED_CARD:
              form.setError('expirationDate', {
                message: 'Expired card',
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
            { title: 'HOME', href: '/' },
            { title: 'CART', href: '/cart' },
          ]}
        />
        <div className="border-greyy/70 mt-16 flex justify-between border-b">
          <Typography variant="text_main" className="uppercase">
            Shipping Information
          </Typography>
          <Typography variant="text_main" className="uppercase">
            Payment Methods
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
                        <Input placeholder="NAME ON CARD" {...field} />
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
                        <Input placeholder="CARD NUMBER" {...field} />
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
                        <Input placeholder="TELEPHONE" {...field} />
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
                        <Input placeholder="EXP DATE" {...field} />
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
                        <Input placeholder="CVV" maxLength={3} {...field} />
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
                        <Label htmlFor="terms">
                          I have read and agree to the
                          <TermsDialog />
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
                  disabled={isPending}
                >
                  {isPending ? <Spinner /> : 'Pay'}
                </Button>
              </form>
            </Form>
            <div className="flex flex-col gap-4 p-10 md:p-20">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
