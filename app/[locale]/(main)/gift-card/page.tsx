import { cookies } from 'next/headers'
import React from 'react'

import GiftCardImage from '@/public/assets/gift.png'
import { GiftCardForm } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'

export default async function GiftCard({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .giftCard || {
    title: 'Gift card',
    home: 'HOME',
    giftCardBreadcrumb: 'GIFT CARD',
    description:
      "Not sure what to choose?\nA Gift Card is always a great idea!\nLet your loved ones pick what they love most.",
  }

  const descriptionLines = t.description.split('\n')

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            {
              title: t.giftCardBreadcrumb,
              href: addLocaleToPath('/gift-card', locale),
            },
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
                <img
                  src={GiftCardImage.src}
                  alt="product-image"
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full"
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
