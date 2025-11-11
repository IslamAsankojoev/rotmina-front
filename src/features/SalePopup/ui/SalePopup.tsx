'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/shadcn/components/ui/dialog'
import { Typography, useScreenSize } from '@/src/shared'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { SalePopupService } from '../model'

const STORAGE_KEY = 'sale-popup-shown'

export function SalePopup() {
  const { data } = useQuery({
    queryKey: ['sale-popup'],
    queryFn: () => SalePopupService.getSalePopup(),
  })

  const { md } = useScreenSize()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false)

  // Проверяем, находимся ли мы на главной странице
  const isHomePage = pathname === '/' || pathname.match(/^\/(en|he)\/?$/)

  useEffect(() => {
    if (!data?.data || !isHomePage || hasCheckedStorage) return

    // Проверяем localStorage
    const wasShown = localStorage.getItem(STORAGE_KEY)

    if (wasShown) {
      setHasCheckedStorage(true)
      return
    }

    // Получаем задержку из данных (в секундах, конвертируем в миллисекунды)
    const delay = (data.data.delay || 0) * 1000

    // Устанавливаем таймер для показа после задержки
    const timer = setTimeout(() => {
      setIsOpen(true)
      setHasCheckedStorage(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [data?.data, isHomePage, hasCheckedStorage])

  // Сохраняем в localStorage при закрытии
  const handleClose = () => {
    setIsOpen(false)
  }

  if (!data?.data || !isHomePage || !isOpen || !data?.data?.show) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="min-h-[700px] rounded-none border-none p-0 sm:max-w-3xl md:min-h-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
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
            <Image
              src={data?.data?.image?.url || ''}
              alt={data?.data?.image?.alternativeText || ''}
              fill
              objectFit="cover"
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
