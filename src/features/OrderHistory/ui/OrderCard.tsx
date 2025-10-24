'use client'

import GiftCardImage from '@/public/assets/gift-card.png'
import PersonalStylistImage from '@/public/assets/personal-stylist.png'
import ShirtImage from '@/public/assets/products/shirt.png'
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
import { Typography, useLangCurrancy } from '@/src/shared'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { OrderWithPaymentStatus } from './OrderList'

interface OrderCardProps {
  order: OrderWithPaymentStatus
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const { getPrice, currency } = useLangCurrancy()
  const router = useRouter()

  const renderPayButtonOrStatus = () => {
    if (order.paymentStatus?.processor_response_code === '000') {
      return (
        <Typography variant="text_main" className="text-greyy min-w-[40px]">
          Paid
        </Typography>
      )
    }
    return (
      <Button
        variant="default"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          router.push(`/order/${order.documentId}`)
        }}
      >
        Pay
      </Button>
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
                    <TableCell className="w-[200px]">№ {order.id}</TableCell>
                    <TableCell className="w-[200px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {order.order_status}{' '}
                      {order.paymentStatus?.processor_response_code}
                    </TableCell>
                    <TableCell className="text-right">
                      {getPrice(Number(order.total_amount))} {currency}
                    </TableCell>
                    <TableCell className="text-right">
                      {renderPayButtonOrStatus()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionTrigger>
            <AccordionContent>
              {order.order_items && order.order_items.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 flex flex-col justify-between"
                    >
                      <div className="relative h-[260px] w-[190px]">
                        <Image
                          src={getImage(item)}
                          alt={item.title_snapshot}
                          fill
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2 overflow-hidden">
                        <Typography
                          variant="text_mini_footer"
                          className="mt-2 font-bold"
                        >
                          <span>{item.title_snapshot}</span>
                        </Typography>
                        <Typography variant="text_mini_footer">
                          <span className="text-greyy mr-2 uppercase">
                            SKU:
                          </span>
                          {item.sku_snapshot}
                        </Typography>
                        <Typography variant="text_mini_footer">
                          <span className="text-greyy mr-2 uppercase">
                            Price:
                          </span>
                          {getPrice(Number(item.price_snapshot))} {currency}
                        </Typography>
                        <Typography variant="text_mini_footer">
                          <span className="text-greyy mr-2 uppercase">
                            Amount:
                          </span>{' '}
                          {item.quantity}
                        </Typography>
                        <Typography variant="text_mini_footer">
                          <span>
                            <span className="text-greyy mr-2 uppercase">
                              Total:
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
                    Order details are not available
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
