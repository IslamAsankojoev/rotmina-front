'use client'

import { useEffect, useMemo, useState } from 'react'

import ConfirmImage from '@/public/order-confirm.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/shadcn/components/ui/dialog'
import { SiteImagesApi } from '@/src/features'
import {
  Typography,
  useDictionary,
  useScreenSize,
} from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'
import Image from 'next/image'

export interface SorryModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function SorryModal({ isOpen, onOpenChange }: SorryModalProps) {
  const [open, setOpen] = useState(false)
  const { data: siteImages } = useQuery({
    queryKey: ['site-images'],
    queryFn: () => SiteImagesApi.getSiteImages(),
  })
  const image = useMemo(
    () => siteImages?.data.order_success_modal?.url || ConfirmImage.src,
    [siteImages],
  )
  const { dictionary } = useDictionary()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .orderConfirm || {
    title: 'Order Confirmed!',
    yourOrder: 'Your order №',
    thankYou:
      'Thank you for choosing Rotmina. A confirmation email is on its way to you your order is being carefully packed and will be shipped soon.',
    exploreMore: 'Explore More',
    payForOrder: 'Pay for order',
  }
  const { md } = useScreenSize()

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="min-h-[600px] rounded-none border-none p-0 sm:max-w-3xl"
      >
        <div
          className={clsx('flex items-center justify-center gap-4 p-10 md:p-0')}
          style={{
            backgroundImage: md ? 'none' : `url(${image})`,
            backgroundSize: md ? 'contain' : 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative hidden h-full md:block md:w-1/2">
            <Image
              src={image}
              alt="Order Confirmation"
              fill
              objectFit="cover"
            />
          </div>
          <div className="relative bg-white p-10 md:h-full md:w-1/2">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Typography variant="text_title" className="text-center">
                Sorry
              </Typography>
              <Typography
                variant="text_main"
                className="text-center font-bold text-[#FF3F3F]"
              >
                Something went wrongYour order cannot be confirmed
              </Typography>
              <Button
                onClick={() => setOpen(false)}
                variant="link"
                className="text-primary uppercase underline"
              >
                TRY AGAIN
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
