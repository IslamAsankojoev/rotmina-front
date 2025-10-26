import NatureImage from '@/public/assets/nature.webp'
import SlideImage1 from '@/public/assets/products/28c356bfaea12422fdff078c80ad210d899e1820.webp'
import SlideImage2 from '@/public/assets/products/773b68776a32f6687e77b6124a9960ad5d456cda.webp'
import SlideImage3 from '@/public/assets/products/b5da825c45a4b2233c7e1a6b2541a4c6419c16cc.webp'
import SlideImage4 from '@/public/assets/products/c5ae553f878dd5bf5638bd3bb767794d4a9cef7e.webp'
import SlideImage5 from '@/public/assets/products/e90bf2efd413950c0e86d922d5e451f7ef5d948d.webp'
import RabbitImage from '@/public/assets/rabbit-in-heart.svg'
import LeavesImage from '@/public/assets/two-leaves-inside-a-circle.svg'
import Hero from '@/public/main-hero.webp'
import { Categories, Collections } from '@/src/features'
import { Typography } from '@/src/shared'
import PanoramaSlider from '@/src/widgets/PanoramaSlider'
import Image from 'next/image'
import { Suspense } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

const slides = [
  { src: SlideImage1.src, alt: 'CLOTHES 1', price: 'Price' },
  { src: SlideImage2.src, alt: 'CLOTHES 2', price: 'Price' },
  { src: SlideImage3.src, alt: 'CLOTHES 3', price: 'Price' },
  { src: SlideImage4.src, alt: 'CLOTHES 4', price: 'Price' },
  { src: SlideImage5.src, alt: 'CLOTHES 5', price: 'Price' },
]

export default function Home() {
  return (
    <section>
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
          <div className="inline-flex flex-col items-start justify-start gap-5 self-stretch md:flex-row">
            <div className="inline-flex flex-1 flex-col items-center justify-end">
              <div className="justify-start self-stretch text-stone-900">
                <Typography variant="text_title" className='italic'>Separation</Typography>
              </div>
            </div>
            <div className="inline-flex flex-1 flex-col items-start justify-start">
              <div className="flex flex-col items-center justify-end self-stretch">
                <div className="justify-start self-stretch text-stone-900">
                  <Typography variant="text_main">
                    There comes a moment when the self longs for separation,
                    <br />a healthy space between me and you, me and the other,
                    a dividing line between me and the world, not to escape or
                    disconnect, but to begin to exist.
                    <br />
                    <br />
                    This collection blossomed out of an inner journey, a
                    personal path of separation. In the world of developmental
                    psychology, the separation phase refers to the stage when a
                    child begins to realize that they are not a direct extension
                    of their mother. They have their own emotions, sensations,
                    and desires.
                    <br />
                    <br />
                    It’s a profound, healthy, delicate, and necessary phase, at
                    times unsteady, moving between closeness and detachment,
                    safety and vulnerability, between the need for a bond and
                    the longing for autonomy.
                    <br />
                    <br />
                    This journey found its course through fabric, silhouettes,
                    and lines, into structures that hold the tension between
                    softness and resilience, expansion and containment, shapes
                    that support the body while allowing it to breathe, like the
                    soul, yearning for boundaries, but not confinement, just
                    perfectly whole.
                    <br />
                    <br />
                    This collection tells a story of connected separation, an
                    inner voice seeking to become.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-hidden">
        <PanoramaSlider slides={slides} />
      </div>
      <div className="container mt-24">
        <Typography variant="text_title" className='italic'>
          Rothmina - Between Beauty and Ethics
        </Typography>
      </div>
      <div className="relative my-10 flex h-[400px] w-full items-center justify-center md:my-24 md:h-[620px]">
        <Image
          src={NatureImage}
          fill
          alt="nature"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="relative mb-20 flex w-full items-center justify-center">
        <div className="container">
          <div className="inline-flex flex-col items-start justify-start gap-5 self-stretch md:flex-row">
            <div className="order-2 inline-flex flex-1 items-center gap-10 md:order-1">
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={RabbitImage}
                  width={95}
                  height={95}
                  alt="rabbit-in-hearow"
                />
                <Typography variant="text_mobile_title" className="text-3xl">
                  Cruelty free
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
                  Vegan
                </Typography>
              </div>
            </div>
            <div className="order-1 inline-flex flex-1 flex-col items-start justify-start md:order-2">
              <div className="flex flex-col items-center justify-end self-stretch">
                <div className="justify-start self-stretch text-stone-900">
                  <Typography variant="text_main">
                    Rothmina was born from passion and a deep commitment, and
                    integrity towards animals, nature, and humanity, a
                    reflection of the way I choose to exist in the world.
                    <br />
                    <br />
                    My choices go beyond fashion. They are moral, honoring life,
                    grounded in being nurtured by Mother Earth, and emerging
                    from love.
                    <br />
                    <br />
                    Each detail is crafted with mindful care and intention, free
                    from animal products, born out of thoughtfulness, respect,
                    and deep attention to what connects beauty, compassion, and
                    sustainability.
                    <br />
                    <br />
                    To me, true beauty does not harm and cannot be built at the
                    expense of life. This is how a creation is born, one that
                    embraces the body without harming the soul.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-24 flex flex-col gap-8">
        <Typography variant="text_title" className='italic'>Categories</Typography>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Categories />
      </Suspense>
      <div className="container mt-24 flex flex-col gap-8">
        <Typography variant="text_title" className='italic'>Collections</Typography>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Collections />
      </Suspense>
    </section>
  )
}
