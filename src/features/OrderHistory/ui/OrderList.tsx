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
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import { Typography } from '@/src/shared'
import Image from 'next/image'

export const OrderList = () => {
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
          <TableRow key={order.id} className="w-full">
            <TableCell className="p-0" colSpan={4}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`order-${order.id}`} className="w-full">
                  <AccordionTrigger className="flex w-full items-center justify-between">
                    <Table>
                      <TableBody className="w-full">
                        <TableRow className="w-full uppercase">
                          <TableCell className="w-[200px]">
                            № {order.number}
                          </TableCell>
                          <TableCell className="w-[200px]">{order.date}</TableCell>
                          <TableCell className="w-[200px]">{order.status}</TableCell>
                          <TableCell className="text-right">
                            ${order.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="mb-2 flex flex-col justify-between"
                        >
                          <Image
                            src={item.image.src}
                            alt={item.name}
                            width={190}
                            height={260}
                            objectFit="cover"
                          />
                          <Typography
                            variant="text_main"
                            className="mt-2 flex flex-col gap-2"
                          >
                            <span>{item.name}</span>
                            <span>Size: {item.size}</span>
                            <span>Price: ${item.price.toFixed(2)}</span>
                            <span>Amount: {item.amount}</span>
                            <span>
                              Price: ${(item.price * item.amount).toFixed(2)}
                            </span>
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const products = [
  {
    id: 1,
    name: 'Shirt',
    image: ShirtImage,
    price: 19.99,
    size: 'M',
    total: 39.98,
    amount: 2,
  },
  {
    id: 2,
    name: 'FullShirt',
    image: ShirtImage,
    price: 29.99,
    size: 'L',
    total: 59.98,
    amount: 2,
  },
  {
    id: 3,
    name: 'Shirt',
    image: ShirtImage,
    price: 19.99,
    size: 'S',
    total: 19.99,
    amount: 1,
  },
  {
    id: 4,
    name: 'Shirt',
    image: ShirtImage,
    price: 19.99,
    size: 'XL',
    total: 39.98,
    amount: 2,
  },
]

const orders = [
  {
    id: 1,
    number: '21',
    date: '2023-10-01',
    status: 'Delivered',
    total: 59.98,
    items: products,
  },
  {
    id: 2,
    number: '22',
    date: '2023-10-02',
    status: 'Pending',
    total: 29.99,
    items: products,
  },
  {
    id: 3,
    number: '44',
    date: '2023-10-03',
    status: 'Cancelled',
    total: 19.99,
    items: products,
  },
  {
    id: 4,
    number: '32',
    date: '2023-10-04',
    status: 'Delivered',
    total: 79.96,
    items: products,
  },
]
