import { cookies } from 'next/headers'

import ReturnsImage from '@/public/assets/returnsAndExchanges.webp'
import { ReturnForm } from '@/src/features'
import { Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale } from '@/src/shared/utils/locale'
import Image from 'next/image'
import { SiteImagesApi } from '@/src/features'

const getImage = async () => {
  try {
    const siteImages = await SiteImagesApi.getSiteImages()
    return siteImages.data?.return_exchange?.url || ReturnsImage.src
  } catch (error) {
    console.error(error)
    return ReturnsImage.src
  }
}

export default async function ReturnsAndExchanges({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const image = await getImage()
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .returns || {
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
                src={image}
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
