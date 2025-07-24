import React from 'react'

import GiftCardImage from '@/public/assets/gift-card.png'
import { GiftCardForm } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import Image from 'next/image'

const GiftCard = () => {
  return (
    <>
      <div className="relative container mt-24 flex w-full flex-col justify-end md:mt-36">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'ABOUT', href: '/about' },
          ]}
        />
      </div>
      <div className="container my-24">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="min-h-full flex-1">
            <div className="flex max-w-96 flex-col">
              <Typography variant="text_title" className="mb-4">
                Gift card
              </Typography>
              <Typography variant="text_main" className="my-4">
                Not sure what to choose?
                <br /> A Gift Card is always a great idea!
                <br /> Let your loved ones pick what they love most.
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
