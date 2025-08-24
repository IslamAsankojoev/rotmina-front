import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Typography, useUser } from '@/src/shared'
import { OrderCard } from './OrderCard'

export const OrderList = () => {
  const { user } = useUser({ allPopulates: true })
  const orders = user.data?.orders || []

  if (!user.data) {
    return <div>Loading...</div>
  }

  if (orders.length === 0) {
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
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  )
}
