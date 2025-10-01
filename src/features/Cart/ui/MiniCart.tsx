'use client'

import { useState } from 'react'

import GiftCardImage from '@/public/assets/gift-card.png'
import ShirtImage from '@/public/assets/products/shirt.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/components/ui/popover'
import { ScrollArea } from '@/shadcn/components/ui/scroll-area'
import { Separator } from '@/shadcn/components/ui/separator'
import { Typography } from '@/src/shared'
import { X } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import z from 'zod'

import { giftCardValidationSchema } from '../../GiftCard'

export const MiniCart = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger className='cursor-pointer'>
        <Typography className="uppercase">Cart</Typography>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex h-[770px] w-[540px] max-w-full flex-col justify-between gap-4 overflow-hidden p-8"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Typography variant="text_title">Your cart</Typography>
            <X
              strokeWidth={0.95}
              size={40}
              onClick={() => setOpen(false)}
              className="cursor-pointer"
              color="black"
            />
          </div>
          <ScrollArea className="h-[500px] w-full">
            <div className="flex flex-col overflow-hidden">
              <Separator className="my-4" />
              {cartItems.map((item, index) => {
                if ('recipientsName' in item) {
                  return (
                    <>
                      <div key={index} className="flex items-center gap-4">
                        <div className='relative h-[150px] w-[110px]'>
                          <Image
                            src={item.image as string}
                            alt={item.recipientsName}
                            objectFit="cover"
                            fill
                          />
                        </div>
                        <div className="flex flex-col">
                          <Typography>{item.recipientsName}</Typography>
                          <Typography>{item.amount} USD</Typography>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </>
                  )
                }
                return (
                  <>
                    <div key={index} className="flex items-center gap-4">
                      <Image
                        src={item.image as string}
                        alt={item.name}
                        width={110}
                        height={150}
                        objectFit="cover"
                      />
                      <div className="flex flex-col">
                        <Typography>{item.name}</Typography>
                        <Typography>
                          {item.size} - {item.amount} pcs
                        </Typography>
                        <Typography>{item.price} USD each</Typography>
                        <Typography>Total: {item.total} USD</Typography>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </>
                )
              })}
            </div>
          </ScrollArea>
        </div>
        <Button variant="outline-minimal" className="uppercase">
          proceed to checkout
        </Button>
      </PopoverContent>
    </Popover>
  )
}

type giftCardType = z.infer<typeof giftCardValidationSchema> & {
  image: string | StaticImageData
}
const giftCards: giftCardType[] = [
  {
    recipientsName: 'John Doe',
    recipientsEmail: 'john.doe@example.com',
    yourEmail: 'your.email@example.com',
    yourName: 'Your Name',
    personalMessage: 'Happy Birthday!',
    amount: 50,
    image: GiftCardImage,
  },
]

type productType = {
  id: number
  name: string
  image: string | StaticImageData
  price: number
  size: string
  total: number
  amount: number
}

const products: productType[] = [
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

const cartItems = [...giftCards, ...products]
