'use client'

import { useMemo } from 'react'

import ConfirmImage from '@/public/order-confirm.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/shadcn/components/ui/dialog'
import {
  Typography,
  useDictionary,
  useLocale,
  useScreenSize,
} from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { BadgeCheck, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SiteImagesApi } from '../../SiteImages'

export interface SuccessPaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuccessPaymentModal({
  open,
  onOpenChange,
}: SuccessPaymentModalProps) {
  const { data: siteImages } = useQuery({
    queryKey: ['site-images'],
    queryFn: () => SiteImagesApi.getSiteImages(),
  })
  const image = useMemo(
    () => siteImages?.data.order_success_modal?.url || ConfirmImage.src,
    [siteImages],
  )
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .successPayment || {
    title: 'Payment Successful!',
    thankYou:
      'Thank you for choosing Rotmina. Your order is being carefully packed and will be shipped soon.',
    exploreMore: 'Explore More',
  }
  const { md } = useScreenSize()

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
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-0 mb-2">
                <BadgeCheck size={34} strokeWidth={1} className="text-green-700" />
                <Typography
                  variant="text_title"
                  className="text-center font-bold text-green-700 text-3xl"
                >
                  {t.title}
                </Typography>
              </div>
              <Typography variant="text_main" className="text-center">
                {t.thankYou}
              </Typography>
              <Link
                href={localizePath('/shop')}
                className="text-primary uppercase underline"
              >
                {t.exploreMore}
              </Link>
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
