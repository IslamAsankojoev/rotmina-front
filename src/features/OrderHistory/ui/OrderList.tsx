'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Typography, useUser, useDictionary, useLocale } from '@/src/shared'
import { OrderCard } from './OrderCard'
import { OrderPaymentStatus, OrderService } from '@/src/entities/Order'
import { useQuery } from '@tanstack/react-query'
import { Order } from '../model'
import clsx from 'clsx'

export interface OrderWithPaymentStatus extends Order {
  paymentStatus: OrderPaymentStatus
}

export const OrderList = () => {
  const { dictionary } = useDictionary()
  const { locale } = useLocale()
  const isRTL = locale === 'he'
  const t = (dictionary as Record<string, Record<string, string>>).orderHistory || {
    order: 'order',
    date: 'date',
    status: 'status',
    totalCost: 'total cost',
    actions: 'actions',
    noOrders: "You don't have any orders yet",
  }
  const { user } = useUser()
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getMyOrders(),
  })
  const { data: paymentStatuses } = useQuery({
    queryKey: ['paymentStatuses', user?.data?.id?.toString()],
    queryFn: () => OrderService.getOrderPaymentStatus(user?.data?.id?.toString() || ''),
    enabled: !!user?.data?.id,
  })

  const orderWithPaymentStatus = orders?.data.map((order) => {
    const paymentStatus = paymentStatuses?.find((status) => status.orderId === order.id)
    return {
      ...order,
      paymentStatus: paymentStatus,
    }
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || []

  if (!orders || orders.data.length === 0) {
    return (
      <div className="text-center py-8">
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
          <TableHead className={clsx('w-[200px] text-greyy', isRTL ? 'text-right' : 'text-left')}>{t.order}</TableHead>
          <TableHead className={clsx('w-[200px] text-greyy', isRTL ? 'text-right' : 'text-left')}>{t.date}</TableHead>
          <TableHead className={clsx('w-[200px] text-greyy', isRTL ? 'text-right' : 'text-left')}>{t.status}</TableHead>
          <TableHead className={clsx('text-greyy', isRTL ? 'text-right' : 'text-left')}>{t.totalCost}</TableHead>
          <TableHead className={clsx('text-greyy', isRTL ? 'text-right' : 'text-left')}>{t.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderWithPaymentStatus?.map((order) => (
          <OrderCard key={order.id} order={order as OrderWithPaymentStatus} />
        ))}
      </TableBody>
    </Table>
  )
}
