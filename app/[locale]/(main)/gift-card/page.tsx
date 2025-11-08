'use client'

import React from 'react'

import GiftCardImage from '@/public/assets/gift-card.webp'
import { GiftCardForm } from '@/src/features'
import { Breadcrumbs, Typography, useDictionary, useLocale } from '@/src/shared'
import Image from 'next/image'

const GiftCard = () => {
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const t = (dictionary as Record<string, Record<string, string>>).giftCard || {
    title: 'Gift card',
    home: 'HOME',
    giftCardBreadcrumb: 'GIFT CARD',
    description: "Not sure what to choose?\nA Gift Card is always a great idea!\nLet your loved ones pick what they love most.",
  }

  const descriptionLines = t.description.split('\n')

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: localizePath('/') },
            { title: t.giftCardBreadcrumb, href: localizePath('/gift-card') },
          ]}
        />
      </div>
      <div className="container my-24">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="min-h-full flex-1">
            <div className="flex max-w-[420px] flex-col">
              <Typography
                variant="text_title"
                className="mb-4 hidden italic md:block"
              >
                {t.title}
              </Typography>
              <Typography
                variant="text_mobile_title"
                className="block italic md:hidden"
              >
                {t.title}
              </Typography>
              <Typography variant="text_main" className="my-4">
                {descriptionLines.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < descriptionLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </Typography>
              <div className="relative h-[250px] w-[420px] max-w-full overflow-hidden rounded-md">
                <Image
                  src={GiftCardImage}
                  alt="product-image"
                  objectFit="cover"
                  fill
                />
              </div>
            </div>
          </div>
          <div className="flex-1 md:p-8">
            <GiftCardForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default GiftCard
