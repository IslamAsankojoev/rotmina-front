'use client'

import { useCallback } from 'react'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Slide = { src: string; alt: string; price?: string }

export default function PanoramaSlider({ slides }: { slides: Slide[] }) {
  const data = slides.length < 10 ? [...slides, ...slides, ...slides] : slides

  const depth = 200
  const rotate = 30

  const applyTransforms = useCallback((swiper: import('swiper').Swiper) => {
    if (!swiper?.slides) return

    const tRad = (rotate * Math.PI) / 180
    const halfAngleSin = Math.sin(tRad / 2)

    for (let i = 0; i < swiper.slides.length; i += 1) {
      const slideEl = swiper.slides[i] as HTMLElement & { progress: number }
      const progress = slideEl.progress ?? 0
      const c = swiper.slidesSizesGrid?.[i] ?? slideEl.offsetWidth ?? 0

      const slidesPerView =
        typeof swiper.params.slidesPerView === 'number'
          ? swiper.params.slidesPerView
          : parseFloat(String(swiper.params.slidesPerView)) || 1
      const offset = swiper.params.centeredSlides
        ? 0
        : (slidesPerView - 1) * 0.5
      const l = progress + offset

      const f = 1 - Math.cos((l * rotate * Math.PI) / 180)
      const translateX = l * (c / 3) * f
      const translateZ = ((c * 0.5) / halfAngleSin) * f - depth
      const rotateY = l * rotate

      slideEl.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`
    }
  }, [])

  return (
    <div className="panorama-unclip relative overflow-hidden">
      <Swiper
        className="panorama-swiper"
        modules={[Pagination]}
        effect="slide"
        centeredSlides
        loop
        loopAdditionalSlides={1}
        grabCursor
        watchSlidesProgress
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        slidesPerView={1.5}
        breakpoints={{
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 4 },
        }}
        onProgress={applyTransforms}
        onSetTranslate={applyTransforms}
        onSetTransition={(swiper, duration) => {
          swiper.slides.forEach((s: HTMLElement) => {
            s.style.transitionDuration = `${duration}ms`
          })
        }}
      >
        {data.map((s, i) => (
          <SwiperSlide key={i} className="slide-card">
            <div className="img-wrap h-[360px] md:h-[460px] lg:h-[560px]">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                style={{ objectFit: 'cover' }}
                priority={i < 6}
              />
            </div>
            <div className="meta">
              <span className="title">{s.alt}</span>
              {s.price && <span className="price">{s.price}</span>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
