'use client'

import { useCallback, useRef } from 'react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Slide = { src: string; alt: string; price?: string }

export default function PanoramaSlider({ slides }: { slides: Slide[] }) {
  const data = slides?.length < 10 ? [...slides, ...slides, ...slides] : slides
  const rafId = useRef<number | null>(null)
  const swiperRef = useRef<import('swiper').Swiper | null>(null)

  const depth = 200
  const rotate = 30

  const applyTransforms = useCallback((swiper: import('swiper').Swiper, immediate = false) => {
    if (!swiper?.slides) return

    const apply = () => {
      const tRad = (rotate * Math.PI) / 180
      const halfAngleSin = Math.sin(tRad / 2)

      for (let i = 0; i < swiper.slides?.length; i += 1) {
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
        slideEl.style.willChange = 'transform'
      }
    }

    if (immediate) {
      apply()
      return
    }

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
    }

    rafId.current = requestAnimationFrame(apply)
  }, [])

  return (
    <div className="panorama-unclip relative w-full" dir="ltr">
      <Swiper
        className="panorama-swiper"
        modules={[Pagination]}
        effect="slide"
        centeredSlides
        loop
        loopAdditionalSlides={1}
        grabCursor
        watchSlidesProgress
        touchEventsTarget="container"
        allowTouchMove={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        slidesPerView={1.5}
        speed={600}
        resistance={true}
        resistanceRatio={0.85}
        followFinger={true}
        breakpoints={{
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setTimeout(() => {
            applyTransforms(swiper, true)
          }, 0)
        }}
        onInit={(swiper) => {
          setTimeout(() => {
            applyTransforms(swiper, true)
          }, 100)
        }}
        onProgress={(swiper) => applyTransforms(swiper)}
        onSetTranslate={(swiper) => applyTransforms(swiper)}
        onSetTransition={(swiper, duration) => {
          swiper.slides.forEach((s: HTMLElement) => {
            s.style.transitionDuration = `${duration}ms`
            s.style.transitionTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          })
        }}
      >
        {data.map((s, i) => (
          <SwiperSlide key={i} className="slide-card">
            <div className="img-wrap h-[360px] md:h-[460px] lg:h-[560px]">
              <img
                src={s.src}
                alt={`Rotmina Product Slider - Image`}
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}