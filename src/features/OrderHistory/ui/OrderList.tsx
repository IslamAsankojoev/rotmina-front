'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Typography, useUser } from '@/src/shared'
import { OrderCard } from './OrderCard'
import { OrderPaymentStatus, OrderService } from '@/src/entities/Order'
import { useQuery } from '@tanstack/react-query'
import { Order } from '../model'

export interface OrderWithPaymentStatus extends Order {
  paymentStatus: OrderPaymentStatus
}

export const OrderList = () => {
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
          You don&apos;t have any orders yet
        </Typography>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="uppercase">
          <TableHead className="w-[200px] text-greyy">order</TableHead>
          <TableHead className="w-[200px] text-greyy">date</TableHead>
          <TableHead className="w-[200px] text-greyy">status</TableHead>
          <TableHead className='text-right text-greyy'>total cost</TableHead>
          <TableHead className='text-right text-greyy'>actions</TableHead>
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
