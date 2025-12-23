'use client'

import ConfirmImage from '@/public/order-confirm.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog'
import { OrderResponse } from '@/src/entities/Order'
import {
  Typography,
  useDictionary,
  useLocale,
  useScreenSize,
} from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { SiteImagesApi } from '../../SiteImages'
import { useMemo } from 'react'

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
  const { data: siteImages } = useQuery({
    queryKey: ['site-images'],
    queryFn: () => SiteImagesApi.getSiteImages(),
  })
  const image = useMemo(() => siteImages?.data.order_success_modal?.url || ConfirmImage.src, [siteImages])
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
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
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader className="sr-only">
        <DialogTitle className="sr-only">
          {t.title}
        </DialogTitle>
      </DialogHeader>
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
            <img
              src={image}
              alt="Rotmina Order Confirmation - Image"
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
          <div className="relative bg-white p-10 md:h-full md:w-1/2">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Typography variant="text_title" className="text-center">
                {t.title.split(' ').map((word, index, array) => (
                  <span key={index}>
                    {word}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </Typography>
              <Typography variant="text_main" className="text-center font-bold">
                {t.yourOrder}{' '}
                {order?.data?.order_number}
              </Typography>
              <Typography variant="text_main" className="text-center text-balance">
                {t.thankYou}
              </Typography>
              <Link
                href={localizePath('/shop')}
                className="text-primary uppercase underline"
              >
                {t.exploreMore}
              </Link>

              <Button
                onClick={() => router.push(`/order/${order?.data?.documentId}`)}
                className="flex max-w-[800px] items-center justify-center gap-4 uppercase"
              >
                {t.payForOrder}
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
