'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Typography } from '@/src/shared'
import { OrderCard } from './OrderCard'
import { OrderService } from '@/src/entities/Order'
import { useQuery } from '@tanstack/react-query'
import { Order } from '../model'

export const OrderList = () => {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getMyOrders(),
  })

  if (!orders || orders.data.length === 0) {
    return (
      <div className="text-center py-8">
        <Typography variant="text_main" className="text-greyy">
          У вас пока нет заказов
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.data.map((order) => (
          <OrderCard key={order.id} order={order as Order} />
        ))}
      </TableBody>
    </Table>
  )
}
