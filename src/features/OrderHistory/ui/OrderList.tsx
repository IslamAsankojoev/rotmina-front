'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import {
  OrderListResponse,
  OrderPaymentStatus,
  OrderService,
} from '@/src/entities/Order'
import { Typography, useDictionary, useLocale } from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

import { Order } from '../model'
import { OrderCard } from './OrderCard'

export interface OrderWithPaymentStatus extends Order {
  paymentStatus: OrderPaymentStatus
}

export const OrderList = () => {
  const { dictionary } = useDictionary()
  const { locale } = useLocale()
  const isRTL = locale === 'he'
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .orderHistory || {
    order: 'order',
    date: 'date',
    status: 'status',
    totalCost: 'total cost',
    actions: 'actions',
    noOrders: "You don't have any orders yet",
  }
  const { data: orders } = useQuery<OrderListResponse | undefined>({
    queryKey: ['orders'],
    queryFn: () => OrderService.getMyOrders(),
  })

  if (!orders || orders.data.length === 0) {
    return (
      <div className="py-8 text-center">
        <Typography variant="text_main" className="text-greyy">
          {t.noOrders}
        </Typography>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="uppercase">
          <TableHead
            className={clsx(
              'text-greyy w-[200px]',
              isRTL ? 'text-right' : 'text-left',
            )}
          >
            {t.order}
          </TableHead>
          <TableHead
            className={clsx(
              'text-greyy w-[200px]',
              isRTL ? 'text-right' : 'text-left',
            )}
          >
            {t.date}
          </TableHead>
          <TableHead
            className={clsx(
              'text-greyy w-[200px]',
              isRTL ? 'text-right' : 'text-left',
            )}
          >
            {t.status}
          </TableHead>
          <TableHead
            className={clsx('text-greyy', isRTL ? 'text-right' : 'text-left')}
          >
            {t.totalCost}
          </TableHead>
          <TableHead
            className={clsx('text-greyy', isRTL ? 'text-right' : 'text-left')}
          >
            {t.actions}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.data?.map((order) => (
          <OrderCard key={order.order_number} order={order} />
        ))}
      </TableBody>
    </Table>
  )
}
