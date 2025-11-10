'use client'

import { useState } from 'react'

import GiftCardImage from '@/public/assets/gift-card-preview.webp'
import PersonalStylistImage from '@/public/assets/personal-stylist.webp'
import ShirtImage from '@/public/assets/products/shirt.webp'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion'
import { Button } from '@/shadcn/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shadcn/components/ui/table'
import { OrderItem } from '@/src/features/OrderHistory/model/types'
import {
  Typography,
  useDictionary,
  useLangCurrency,
  useLocale,
} from '@/src/shared'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { OrderDeleteModal } from '../..'
import { OrderWithPaymentStatus } from './OrderList'

interface OrderCardProps {
  order: OrderWithPaymentStatus
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const { dictionary } = useDictionary()
  const { isRTL } = useLocale()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>)
    .orderHistory || {
    paid: 'Paid',
    pay: 'Pay',
    sku: 'SKU:',
    price: 'Price:',
    amount: 'Amount:',
    total: 'Total:',
    orderDetailsNotAvailable: 'Order details are not available',
    delivered: 'Delivered',
    canceled: 'Canceled',
    pending: 'Pending',
    processing: 'Processing',
  }
  const { getPrice, currency } = useLangCurrency()
  const router = useRouter()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const getStatusTranslation = (status: string) => {
    const statusMap: Record<string, string> = {
      delivered: t.delivered,
      canceled: t.canceled,
      pending: t.pending,
      processing: t.processing,
      נמסר: t.delivered,
      בוטל: t.canceled,
    }
    return statusMap[status.toLowerCase()] || status
  }

  const renderPayButtonOrStatus = () => {
    if (order.paymentStatus?.processor_response_code === '000') {
      return (
        <Typography variant="text_main" className="text-greyy min-w-[40px]">
          {t.paid}
        </Typography>
      )
    }
    return (
      <div className="flex gap-1">
        <Button
          variant="default"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/order/${order.documentId}`)
          }}
        >
          {t.pay}
        </Button>
        <OrderDeleteModal
          open={openDeleteModal}
          onOpenChange={setOpenDeleteModal}
          orderId={order.documentId}
        />
      </div>
    )
  }

  const getImage = (item: OrderItem) => {
    if (item.type === 'product') {
      return item.variant?.images?.[0]?.url || ShirtImage.src
    }
    if (item.type === 'giftcard') return GiftCardImage.src
    if (item.type === 'personalStylist') return PersonalStylistImage.src
    return ShirtImage.src
  }

  return (
    <TableRow key={order.id} className="w-full">
      <TableCell className="p-0" colSpan={5}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`order-${order.id}`} className="w-full">
            <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between">
              <Table>
                <TableBody className="w-full">
                  <TableRow className="w-full uppercase">
                    <TableCell
                      className={clsx(
                        'w-[200px]',
                        isRTL ? 'text-right' : 'text-left',
                      )}
                    >
                      № {order.id}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        'w-[200px]',
                        isRTL ? 'text-right' : 'text-left',
                      )}
                    >
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        'w-[200px]',
                        isRTL ? 'text-right' : 'text-left',
                      )}
                    >
                      {getStatusTranslation(order.order_status)}
                    </TableCell>
                    <TableCell className={isRTL ? 'text-right' : 'text-left'}>
                      {getPrice(Number(order.total_amount))} {currency}
                    </TableCell>
                    <TableCell className={isRTL ? 'text-right' : 'text-left'}>
                      {renderPayButtonOrStatus()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionTrigger>
            <AccordionContent>
              {order.order_items && order.order_items.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 flex flex-col justify-between"
                    >
                      <div className="relative h-[260px] w-full">
                        <Image
                          src={getImage(item)}
                          alt={item.title_snapshot}
                          fill
                          objectFit="cover"
                        />
                      </div>
                      <div
                        className={clsx(
                          'flex flex-col gap-2 overflow-hidden',
                          isRTL ? 'text-right' : 'text-left',
                        )}
                      >
                        <Typography
                          variant="text_mini_footer"
                          className={clsx(
                            'mt-2 font-bold',
                            isRTL ? 'text-right' : 'text-left',
                          )}
                        >
                          <span>{item.title_snapshot}</span>
                        </Typography>
                        <Typography
                          variant="text_mini_footer"
                          className={isRTL ? 'text-right' : 'text-left'}
                        >
                          <span
                            className={clsx(
                              'text-greyy uppercase',
                              isRTL ? 'ml-2' : 'mr-2',
                            )}
                          >
                            {t.sku}
                          </span>
                          {item.sku_snapshot}
                        </Typography>
                        <Typography
                          variant="text_mini_footer"
                          className={isRTL ? 'text-right' : 'text-left'}
                        >
                          <span
                            className={clsx(
                              'text-greyy uppercase',
                              isRTL ? 'ml-2' : 'mr-2',
                            )}
                          >
                            {t.price}
                          </span>
                          {getPrice(Number(item.price_snapshot))} {currency}
                        </Typography>
                        <Typography
                          variant="text_mini_footer"
                          className={isRTL ? 'text-right' : 'text-left'}
                        >
                          <span
                            className={clsx(
                              'text-greyy uppercase',
                              isRTL ? 'ml-2' : 'mr-2',
                            )}
                          >
                            {t.amount}
                          </span>{' '}
                          {item.quantity}
                        </Typography>
                        <Typography
                          variant="text_mini_footer"
                          className={isRTL ? 'text-right' : 'text-left'}
                        >
                          <span>
                            <span
                              className={clsx(
                                'text-greyy uppercase',
                                isRTL ? 'ml-2' : 'mr-2',
                              )}
                            >
                              {t.total}
                            </span>{' '}
                            {getPrice(item.subtotal)} {currency}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center">
                  <Typography variant="text_main" className="text-greyy">
                    {t.orderDetailsNotAvailable}
                  </Typography>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TableCell>
    </TableRow>
  )
}
