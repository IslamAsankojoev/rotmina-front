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
  useScreenSize,
} from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'

export interface SorryModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  buttonText?: string
}

export function SorryModal({ isOpen, onOpenChange, title = 'Sorry', description = 'Something went wrongYour order cannot be confirmed', buttonText = 'TRY AGAIN' }: SorryModalProps) {
  const [open, setOpen] = useState(false)
  const { data: siteImages } = useQuery({
    queryKey: ['site-images'],
    queryFn: () => SiteImagesApi.getSiteImages(),
  })
  const image = useMemo(
    () => siteImages?.data.order_success_modal?.url || ConfirmImage.src,
    [siteImages],
  )
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
            <img
              src={image as string}
              alt="Order Confirmation"
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
          <div className="relative bg-white p-10 md:h-full md:w-1/2">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Typography variant="text_title" className="text-center">
                {title}
              </Typography>
              <Typography
                variant="text_main"
                className="text-center font-bold text-[#FF3F3F]"
              >
                {description}
              </Typography>
              <Button
                onClick={() => setOpen(false)}
                variant="link"
                className="text-primary uppercase underline"
              >
                {buttonText}
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
