import { Suspense } from 'react'

import NatureImage from '@/public/assets/nature.webp'
import RabbitImage from '@/public/assets/rabbit-in-heart.svg'
import LeavesImage from '@/public/assets/two-leaves-inside-a-circle.svg'
import Hero from '@/public/rotmina-home.jpg'
import { ProductService } from '@/src/entities/Product'
import { Categories, Collections, SalePopup } from '@/src/features'
import { Loader, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale } from '@/src/shared/utils/locale'
import PanoramaSlider from '@/src/widgets/PanoramaSlider'
import { cookies } from 'next/headers'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const isRTL = locale === 'he'
  const dictionary = await getDictionary(locale as 'en' | 'he')

  const homeDict = dictionary as Record<string, unknown>
  const homeSection = homeDict.home as Record<string, unknown>

  const separationDict = (homeSection?.separation as Record<
    string,
    string
  >) || {
    title: 'Separation',
    content:
      "There comes a moment when the self longs for separation,\na healthy space between me and you, me and the other,\na dividing line between me and the world, not to escape or\ndisconnect, but to begin to exist.\n\nThis collection blossomed out of an inner journey, a\npersonal path of separation. In the world of developmental\npsychology, the separation phase refers to the stage when a\nchild begins to realize that they are not a direct extension\nof their mother. They have their own emotions, sensations,\nand desires.\n\nIt's a profound, healthy, delicate, and necessary phase, at\ntimes unsteady, moving between closeness and detachment,\nsafety and vulnerability, between the need for a bond and\nthe longing for autonomy.\n\nThis journey found its course through fabric, silhouettes,\nand lines, into structures that hold the tension between\nsoftness and resilience, expansion and containment, shapes\nthat support the body while allowing it to breathe, like the\nsoul, yearning for boundaries, but not confinement, just\nperfectly whole.\n\nThis collection tells a story of connected separation, an\ninner voice seeking to become.",
  }

  const ethicsDict = (homeSection?.ethics as Record<string, string>) || {
    title: 'Rothmina - Between Beauty and Ethics',
    content:
      'Rothmina was born from passion and a deep commitment, and\nintegrity towards animals, nature, and humanity, a\nreflection of the way I choose to exist in the world.\n\nMy choices go beyond fashion. They are moral, honoring life,\ngrounded in being nurtured by Mother Earth, and emerging\nfrom love.\n\nEach detail is crafted with mindful care and intention, free\nfrom animal products, born out of thoughtfulness, respect,\nand deep attention to what connects beauty, compassion, and\nsustainability.\n\nTo me, true beauty does not harm and cannot be built at the\nexpense of life. This is how a creation is born, one that\nembraces the body without harming the soul.',
    crueltyFree: 'Cruelty free',
    vegan: 'Vegan',
  }

  const homeT = (homeSection as Record<string, string>) || {
    categories: 'Categories',
    collections: 'Collections',
  }

  const t = separationDict
  const ethicsContentLines = ethicsDict.content.split('\n')

  // Получаем данные для карусели
  const slidesData = await ProductService.getProductSlides()
  const slides =
    slidesData?.data?.map((product) => ({
      src: product?.variants?.[0]?.images?.[0]?.url || '',
      alt: product?.title || '',
      price: product?.variants?.[0]?.price?.toString() || '',
    })) || []

  return (
    <section>
      <SalePopup />
      <div className="relative hidden h-screen w-full items-center justify-center md:flex">
        <img
          src={Hero.src}
          style={{ objectFit: 'cover' }}
          className="w-full h-full"
          alt="hero"
        />
      </div>
      <div className="relative flex h-screen w-full items-center justify-center md:hidden">
        <img
          src={Hero.src}
          style={{ objectFit: 'cover', objectPosition: '70% 0%' }}
          className="w-full h-full"
          alt="hero"
        />
      </div>
      <div className="relative flex w-full items-center justify-center py-20">
        <div className="container">
          <div className="inline-flex w-full flex-col items-start justify-start gap-5 self-stretch md:flex-row">
            <div className="inline-flex flex-1 flex-col items-center justify-end">
              <div className="justify-start self-stretch text-stone-900">
                <Typography variant="text_title" className="italic">
                  {t.title}
                </Typography>
              </div>
            </div>
            <div className="inline-flex flex-1 flex-col items-start justify-start">
              <div className="flex flex-col items-center justify-end self-stretch">
                <div className="justify-start self-stretch text-stone-900">
                  <Typography 
                    variant="text_main" 
                    className="whitespace-pre-line leading-relaxed md:leading-normal"
                  >
                    {t.content}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PanoramaSlider slides={slides} />
      <div className="container mt-24">
        <Typography
          variant="text_title"
          className="text-mobile-title2 md:text-title italic"
        >
          {ethicsDict.title}
        </Typography>
      </div>
      <div className="relative my-10 flex h-[264px] w-full items-center justify-center md:my-24 md:h-[519px]">
        <img
          src={NatureImage.src}
          alt="nature"
          className='w-full h-full'
          style={{ objectFit: 'cover', objectPosition: '0% 20%' }}
        />
      </div>
      <div className="relative mb-20 flex w-full items-center justify-center">
        <div className="container">
          <div
            className="inline-flex w-full flex-col items-start justify-start gap-5 self-stretch md:flex-row"
            dir="ltr"
          >
            <div className="order-2 inline-flex flex-1 items-center gap-10 md:order-1">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-[50px] w-[50px] md:h-[95px] md:w-[95px]">
                  <img
                    src={RabbitImage.src}
                    style={{ objectFit: 'cover' }}
                    alt="rabbit-in-heart"
                    className='w-full h-full'
                  />
                </div>
                <Typography
                  variant="text_mobile_title"
                  className="md:text_mobile_title !text-sm"
                >
                  {ethicsDict.crueltyFree}
                </Typography>
              </div>
              <div className="relative flex flex-col items-center gap-4">
                <div className="relative h-[50px] w-[50px] md:h-[95px] md:w-[95px]">
                  <img
                    src={LeavesImage.src}
                    style={{ objectFit: 'cover' }}
                    alt="two-leaves"
                    className='w-full h-full'
                  />
                </div>
                <Typography
                  variant="text_mobile_title"
                  className="md:text_mobile_title !text-sm"
                >
                  {ethicsDict.vegan}
                </Typography>
              </div>
            </div>
            <div className="order-1 inline-flex flex-1 flex-col items-start justify-start md:order-2">
              <div className="flex flex-col items-center justify-end self-stretch">
                <div
                  className="justify-start self-stretch text-stone-900"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <Typography variant="text_main">
                    {ethicsContentLines.map((line: string, index: number) => (
                      <span key={index}>
                        {line}
                        {index < ethicsContentLines.length - 1 && <br />}
                      </span>
                    ))}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-24 flex flex-col gap-8">
        <Typography
          variant="text_title"
          className="text-mobile-title md:text-title italic"
        >
          {homeT.categories || 'Categories'}
        </Typography>
      </div>
      <Suspense fallback={<Loader />}>
        <Categories />
      </Suspense>
      <div className="container mt-24 flex flex-col gap-8">
        <Typography
          variant="text_title"
          className="text-mobile-title md:text-title italic"
        >
          {homeT.collections || 'Collections'}
        </Typography>
      </div>
      <Suspense fallback={<Loader />}>
        <Collections />
      </Suspense>
    </section>
  )
}
