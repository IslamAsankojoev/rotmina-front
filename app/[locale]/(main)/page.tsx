'use client'

import { Suspense } from 'react'

import NatureImage from '@/public/assets/nature.webp'
// import SlideImage1 from '@/public/assets/products/28c356bfaea12422fdff078c80ad210d899e1820.webp'
// import SlideImage2 from '@/public/assets/products/773b68776a32f6687e77b6124a9960ad5d456cda.webp'
// import SlideImage3 from '@/public/assets/products/b5da825c45a4b2233c7e1a6b2541a4c6419c16cc.webp'
// import SlideImage4 from '@/public/assets/products/c5ae553f878dd5bf5638bd3bb767794d4a9cef7e.webp'
// import SlideImage5 from '@/public/assets/products/e90bf2efd413950c0e86d922d5e451f7ef5d948d.webp'
import RabbitImage from '@/public/assets/rabbit-in-heart.svg'
import LeavesImage from '@/public/assets/two-leaves-inside-a-circle.svg'
import Hero from '@/public/main-hero.webp'
import { Categories, Collections, SalePopup } from '@/src/features'
import { Loader, Typography, useDictionary } from '@/src/shared'
import PanoramaSlider from '@/src/widgets/PanoramaSlider'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

// const slides = [
//   { src: SlideImage1.src, alt: 'CLOTHES 1', price: 'Price' },
//   { src: SlideImage2.src, alt: 'CLOTHES 2', price: 'Price' },
//   { src: SlideImage3.src, alt: 'CLOTHES 3', price: 'Price' },
//   { src: SlideImage4.src, alt: 'CLOTHES 4', price: 'Price' },
//   { src: SlideImage5.src, alt: 'CLOTHES 5', price: 'Price' },
// ]

export default function Home() {
  const { dictionary } = useDictionary()
  const homeDict = dictionary as Record<string, unknown>
  const homeSection = homeDict.home as Record<string, unknown>
  const separationDict = (homeSection?.separation as Record<string, string>) || {
    title: 'Separation',
    content: "There comes a moment when the self longs for separation,\na healthy space between me and you, me and the other,\na dividing line between me and the world, not to escape or\ndisconnect, but to begin to exist.\n\nThis collection blossomed out of an inner journey, a\npersonal path of separation. In the world of developmental\npsychology, the separation phase refers to the stage when a\nchild begins to realize that they are not a direct extension\nof their mother. They have their own emotions, sensations,\nand desires.\n\nIt's a profound, healthy, delicate, and necessary phase, at\ntimes unsteady, moving between closeness and detachment,\nsafety and vulnerability, between the need for a bond and\nthe longing for autonomy.\n\nThis journey found its course through fabric, silhouettes,\nand lines, into structures that hold the tension between\nsoftness and resilience, expansion and containment, shapes\nthat support the body while allowing it to breathe, like the\nsoul, yearning for boundaries, but not confinement, just\nperfectly whole.\n\nThis collection tells a story of connected separation, an\ninner voice seeking to become.",
  }
  const t = separationDict
  const homeT = (homeSection as Record<string, string>) || {
    categories: 'Categories',
    collections: 'Collections',
  }

  const contentLines = t.content.split('\n')

  return (
    <section>
      <SalePopup />
      <div className="relative hidden h-screen w-full items-center justify-center md:flex">
        <Image
          src={Hero}
          fill
          objectFit="cover"
          objectPosition="top"
          alt="hero"
        />
      </div>
      <div className="relative flex h-screen w-full items-center justify-center md:hidden">
        <Image
          src={Hero}
          fill
          objectFit="cover"
          objectPosition="80% 0%"
          alt="hero"
        />
      </div>
      <div className="relative flex w-full items-center justify-center py-20">
        <div className="container">
          <div className="inline-flex flex-col items-start justify-start gap-5 self-stretch md:flex-row w-full">
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
                  <Typography variant="text_main">
                    {contentLines.map((line: string, index: number) => (
                      <span key={index}>
                        {line}
                        {index < contentLines.length - 1 && <br />}
                      </span>
                    ))}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <PanoramaSlider />
      </div>
      <div className="container mt-24">
        <Typography variant="text_title" className="italic text-title md:text-mobile-title2">
          {(() => {
            const homeDict = dictionary as Record<string, unknown>
            const ethicsDict = (homeDict.home as Record<string, Record<string, string>>)?.ethics
            return ethicsDict?.title || 'Rothmina - Between Beauty and Ethics'
          })()}
        </Typography>
      </div>
      <div className="relative my-10 flex h-[264px] w-full items-center justify-center md:my-24 md:h-[519px]">
        <Image
          src={NatureImage}
          fill
          alt="nature"
          objectFit="cover"
          objectPosition="40% 0%"
        />
      </div>
      <div className="relative mb-20 flex w-full items-center justify-center">
        <div className="container">
          <div className="inline-flex flex-col items-start justify-start gap-5 self-stretch md:flex-row w-full">
            <div className="order-2 inline-flex flex-1 items-center gap-10 md:order-1">
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={RabbitImage}
                  width={95}
                  height={95}
                  alt="rabbit-in-hearow"
                />
                <Typography variant="text_mobile_title" className="text-3xl">
                  {(() => {
                    const homeDict = dictionary as Record<string, unknown>
                    const ethicsDict = (homeDict.home as Record<string, Record<string, string>>)?.ethics
                    return ethicsDict?.crueltyFree || 'Cruelty free'
                  })()}
                </Typography>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={LeavesImage}
                  width={95}
                  height={95}
                  alt="two-leaves"
                />
                <Typography variant="text_mobile_title" className="text-3xl">
                  {(() => {
                    const homeDict = dictionary as Record<string, unknown>
                    const ethicsDict = (homeDict.home as Record<string, Record<string, string>>)?.ethics
                    return ethicsDict?.vegan || 'Vegan'
                  })()}
                </Typography>
              </div>
            </div>
            <div className="order-1 inline-flex flex-1 flex-col items-start justify-start md:order-2">
              <div className="flex flex-col items-center justify-end self-stretch">
                <div className="justify-start self-stretch text-stone-900">
                  <Typography variant="text_main">
                    {(() => {
                      const homeDict = dictionary as Record<string, unknown>
                      const ethicsDict = (homeDict.home as Record<string, Record<string, string>>)?.ethics
                      const content = ethicsDict?.content || "Rothmina was born from passion and a deep commitment, and\nintegrity towards animals, nature, and humanity, a\nreflection of the way I choose to exist in the world.\n\nMy choices go beyond fashion. They are moral, honoring life,\ngrounded in being nurtured by Mother Earth, and emerging\nfrom love.\n\nEach detail is crafted with mindful care and intention, free\nfrom animal products, born out of thoughtfulness, respect,\nand deep attention to what connects beauty, compassion, and\nsustainability.\n\nTo me, true beauty does not harm and cannot be built at the\nexpense of life. This is how a creation is born, one that\nembraces the body without harming the soul."
                      const contentLines = content.split('\n')
                      return contentLines.map((line: string, index: number) => (
                        <span key={index}>
                          {line}
                          {index < contentLines.length - 1 && <br />}
                        </span>
                      ))
                    })()}
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
