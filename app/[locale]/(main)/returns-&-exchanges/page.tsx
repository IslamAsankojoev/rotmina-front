'use client'

import React from 'react'

import ReturnsImage from '@/public/assets/returnsAndExchanges.webp'
import { ReturnForm } from '@/src/features'
import { Typography, useDictionary } from '@/src/shared'
import Image from 'next/image'

const ReturnsAndExchanges = () => {
  const { dictionary } = useDictionary()
  const t = (dictionary as Record<string, Record<string, string>>).returns || {
    title: 'Returns & Exchanges',
  }

  return (
    <>
      <div className="relative container my-4 flex w-full flex-col justify-end" />
      <div className="mb-20 max-w-[1334px] md:container md:my-20">
        <div className="flex flex-col md:flex-row">
          <div className="flex-3 bg-[#EFEFEF] p-4 md:p-14">
            <Typography variant="text_title" className="mb-4 md:text-title text-mobile-title2 italic">
              {t.title}
            </Typography>
            <ReturnForm />
          </div>
          <div className="flex min-h-full flex-2 items-center justify-center">
            <div className="relative h-full min-h-[500px] w-full md:min-h-[600px]">
              <Image
                src={ReturnsImage}
                alt="product-image"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReturnsAndExchanges
