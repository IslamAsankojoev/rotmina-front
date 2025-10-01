import ShirtImage from '@/public/assets/products/shirt.png'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Typography } from '@/src/shared'
import { Order } from '@/src/features/OrderHistory/model/types'
import Image from 'next/image'

interface OrderCardProps {
  order: Order
}

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <TableRow key={order.id} className="w-full">
      <TableCell className="p-0" colSpan={4}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`order-${order.id}`} className="w-full">
            <AccordionTrigger className="flex w-full items-center justify-between cursor-pointer">
              <Table>
                <TableBody className="w-full">
                  <TableRow className="w-full uppercase">
                    <TableCell className="w-[200px]">
                      № {order.number}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {order.order_status}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(order.total_amount / 100).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionTrigger>
            <AccordionContent>
              {order.order_items && order.order_items.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 flex flex-col justify-between"
                    >
                      <Image
                        src={
                          item.variant?.images?.[0]?.url || 
                          item.variant?.product?.gallery?.[0]?.url || 
                          ShirtImage.src
                        }
                        alt={item.title_snapshot}
                        width={190}
                        height={260}
                        objectFit="cover"
                      />
                      <Typography
                        variant="text_main"
                        className="mt-2 flex flex-col gap-2"
                      >
                        <span>{item.title_snapshot}</span>
                        <span>SKU: {item.sku_snapshot}</span>
                        <span>Price: ${item.price_snapshot}</span>
                        <span>Amount: {item.quantity}</span>
                        <span>
                          Total: ${item.subtotal}
                        </span>
                      </Typography>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Typography variant="text_main" className="text-greyy">
                    Детали заказа недоступны
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