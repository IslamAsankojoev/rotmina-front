import { cookies } from 'next/headers'
import React from 'react'

import MyStoryImage from '@/public/assets/my-story.webp'
import { Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'
import Image from 'next/image'
import { SiteImagesApi } from '@/src/features'

const getImage = async () => {
  try {
    const siteImages = await SiteImagesApi.getSiteImages()
    return siteImages.data?.my_story?.url || MyStoryImage.src
  } catch (error) {
    console.error(error)
    return MyStoryImage.src
  }
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
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1 pt-10">
            <div className="relative h-[500px] w-full md:h-[600px]">
              <Image
                src={image}
                alt="product-image"
                objectFit="contain"
                fill
              />
            </div>
          </div>
          <div className="flex-1 md:p-8">
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
