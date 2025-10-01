'use client'

import React from 'react'

import MyStoryImage from '@/public/assets/my-story.png'
import { Breadcrumbs, Typography } from '@/src/shared'
import Image from 'next/image'

const MyStory = () => {
  return (
    <>
      <div className="relative container mt-24 flex w-full flex-col justify-end md:mt-36">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'My Story', href: '/my-story' },
          ]}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1 pt-10">
            <div className="relative h-[500px] w-full md:h-[600px]">
              <Image
                src={MyStoryImage}
                alt="product-image"
                objectFit="contain"
                fill
              />
            </div>
          </div>
          <div className="flex-1 md:p-8">
            <Typography variant="text_title" className="mb-4">
              My Story
            </Typography>
            <Typography variant="text_main" className="my-4">
              Pleased to meet you. I&apos;m Rotmina — my childhood nickname that
              stayed with me. <br /> <br />
              I&apos;m a fashion designer and personal stylist. <br />
              After many years, I chose to dive into my true self — my authentic
              nature — opening up to my inner path and returning home to my core
              essence. <br /> <br />
              The path I walk weaves together many worlds: emotion and creative
              expression, a deep connection to nature and art. A decade ago, I
              chose veganism as a way of life. The transition felt natural and
              deeply aligned. Through my personal journey, I’ve chosen to see
              what — and who — often goes unseen. <br /> <br />
              Carrying these insights forward, my movement through the world
              aims to embody an honest presence and a deep commitment to
              sustainability in all its layers. I strive for transparency and
              embrace the complexity and multidimensionality of our existence.{' '}
              <br /> <br />
              <br />
              Emerging from this space, Rotmina is more than a fashion brand —
              it’s a language, an energetic resonance, a path of consciousness
              shaped by unity, and an ever-burning desire for depth and
              aesthetics. <br /> <br />I encourage you to embrace yourself with
              confidence — to choose a wholeness that radiates both within and
              without — and to join me on this journey.
            </Typography>
            <br />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyStory
