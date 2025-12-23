import React from 'react'

import MyStoryImage from '@/public/assets/my-story.webp'
import { SiteImagesApi } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { addLocaleToPath, getServerLocale } from '@/src/shared/utils/locale'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

const getImage = async () => {
  try {
    const siteImages = await SiteImagesApi.getSiteImages()
    return siteImages.data?.my_story?.url || MyStoryImage.src
  } catch (error) {
    console.error(error)
    return MyStoryImage.src
  }
}

export const metadata: Metadata = {
  title:
    'Rotmina House offers luxury vegan fashion with elegant, refined lines. Explore timeless designer clothing made from premium cruelty-free materials.',
  description:
    'Shop cruelty-free dresses, suits & coats made with premium eco-friendly fabrics. Worldwide shipping.',
  keywords:
    'luxury vegan clothing, luxury fashion brand, ethical fashion brand, luxury women’s fashion New-York, new collection 2025, women’s collection 2025, cruelty-free fashion, designer clothing Italy online, Rotmina designer clothing, Rotmina, שמלת ערב טבעונית יוקרתית משלוח עד הבית, Lucem Project, מותג אופנה רותמינה, premium vegan winter coat for women, sustainable designer clothing',
}

export default async function MyStory({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const image = await getImage()
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const isRTL = locale === 'he'
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .myStory || {
    title: 'My Story',
    home: 'HOME',
    content:
      "Pleased to meet you. I'm Rotmina — my childhood nickname that stayed with me. \n\nI'm a fashion designer and personal stylist. \nAfter many years, I chose to dive into my true self — my authentic nature — opening up to my inner path and returning home to my core essence. \n\nThe path I walk weaves together many worlds: emotion and creative expression, a deep connection to nature and art. A decade ago, I chose veganism as a way of life. The transition felt natural and deeply aligned. Through my personal journey, I've chosen to see what — and who — often goes unseen. \n\nCarrying these insights forward, my movement through the world aims to embody an honest presence and a deep commitment to sustainability in all its layers. I strive for transparency and embrace the complexity and multidimensionality of our existence. \n\n\nEmerging from this space, Rotmina is more than a fashion brand — it's a language, an energetic resonance, a path of consciousness shaped by unity, and an ever-burning desire for depth and aesthetics. \n\nI encourage you to embrace yourself with confidence — to choose a wholeness that radiates both within and without — and to join me on this journey.",
  }

  const contentLines = t.content.split('\n')

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            { title: t.title, href: addLocaleToPath('/my-story', locale) },
          ]}
        />
      </div>
      <h1 className="sr-only">My Story</h1>
      <div className="container">
        <div className="flex flex-col gap-8 md:!flex-row md:gap-12" dir="ltr">
          <div className="flex-1 pt-10">
            <div className="relative h-[500px] w-full md:h-[600px]">
              <img
                src={image}
                alt="product-image"
                style={{ objectFit: 'contain' }}
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="flex-1 md:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <Typography variant="text_title" className="mb-4">
              {t.title}
            </Typography>
            <Typography variant="text_main" className="my-4">
              {contentLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < contentLines.length - 1 && (
                    <>
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </Typography>
            <br />
          </div>
        </div>
      </div>
    </>
  )
}
