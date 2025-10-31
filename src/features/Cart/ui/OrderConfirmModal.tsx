'use client'

import ConfirmImage from '@/public/order-confirm.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/shadcn/components/ui/dialog'
import { OrderResponse } from '@/src/entities/Order'
import { Typography, useScreenSize } from '@/src/shared'
import clsx from 'clsx'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export interface OrderConfirmModalProps {
  order: OrderResponse
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderConfirmModal({
  order,
  open,
  onOpenChange,
}: OrderConfirmModalProps) {
  const { md } = useScreenSize()
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="min-h-[600px] rounded-none border-none p-0 sm:max-w-3xl"
      >
        <div
          className={clsx('flex items-center justify-center gap-4 p-10 md:p-0')}
          style={{
            backgroundImage: md ? 'none' : `url(${ConfirmImage.src})`,
            backgroundSize: md ? 'contain' : 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative hidden h-full md:block md:w-1/2">
            <Image
              src={ConfirmImage.src}
              alt="Order Confirmation"
              fill
              objectFit="cover"
            />
          </div>
          <div className="relative bg-white p-10 md:h-full md:w-1/2">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Typography variant="text_title" className="text-center">
                Order <br /> Confirmed!
              </Typography>
              <Typography variant="text_main" className="text-center font-bold">
                Your order №{order?.data?.id}
              </Typography>
              <Typography variant="text_main" className="text-center">
                Thank you for choosing Rotmina.A confirmation email is on its
                way to you your order is being carefully packed and will be
                shipped soon.
              </Typography>
              <Link href="/shop" className="text-primary uppercase underline">
                Explore More
              </Link>

              <Button
                onClick={() => router.push(`/order/${order?.data?.id}`)}
                className="flex max-w-[800px] items-center justify-center gap-4 uppercase"
              >
                Pay for order
              </Button>
            </div>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="absolute top-4 right-4"
              >
                <X className="size-6" />
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
