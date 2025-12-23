'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog'
import { Typography, useScreenSize } from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'

import { SalePopupService } from '../model'

const STORAGE_KEY = 'sale-popup-shown'

export function SalePopup() {
  const { data } = useQuery({
    queryKey: ['sale-popup'],
    queryFn: () => SalePopupService.getSalePopup(),
  })

  const { md } = useScreenSize()
  const [isOpen, setIsOpen] = useState(false)
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false)

  useEffect(() => {
    if (!data?.data || hasCheckedStorage) return

    const wasShown = localStorage.getItem(STORAGE_KEY)

    if (wasShown) {
      setHasCheckedStorage(true)
      return
    }

    const delay = (data.data.delay || 0) * 1000

    const timer = setTimeout(() => {
      setIsOpen(true)
      setHasCheckedStorage(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [data?.data, hasCheckedStorage])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!data?.data || !isOpen || !data?.data?.show) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="h-full max-h-full max-w-full rounded-none border-none p-0 sm:max-w-3xl md:max-h-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">
            {data?.data?.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Rotmina Sale Popup
          </DialogDescription>
        </DialogHeader>
        <div
          className={clsx('flex items-center justify-center gap-4 p-8 md:p-0')}
          style={{
            backgroundImage: md
              ? 'none'
              : `url(${data?.data?.image?.url || ''})`,
            backgroundSize: md ? 'contain' : 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative hidden h-full md:block md:w-1/2">
            <img
              src={data?.data?.image?.url || ''}
              alt={`Rotmina Sale Popup - Image`}
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
          <div className="relative bg-white p-6 py-20 md:h-full md:w-1/2">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Typography variant="text_title" className="text-center italic">
                {data?.data?.title}
              </Typography>
              <Typography variant="text_main" className="text-center">
                {data?.data?.description}
              </Typography>
              <Typography variant="text_main" className="mt-8 text-center">
                <a
                  href={data?.data?.link}
                  className="text-primary uppercase underline"
                >
                  {data?.data?.link_text}
                </a>
              </Typography>
            </div>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleClose}
                autoFocus={false}
              >
                <X className="size-8" />
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
