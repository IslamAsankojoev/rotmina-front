'use client'

import React from 'react'

import PersonalStylistImage from '@/public/assets/personal-stylist.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shadcn/components/ui/tabs'
import { useAddPersonalStylist, useCartActions } from '@/src/app/store'
import {
  Breadcrumbs,
  PERSONAL_STYLIST_PRICES,
  Typography,
  VIRTUAL_SESSION,
  useLangCurrancy,
} from '@/src/shared'
import clsx from 'clsx'
import Image from 'next/image'

const PersonalStylist = () => {
  const { getPrice, currency } = useLangCurrancy()
  const [selectedProduct, setSelectedProduct] = React.useState<number | null>(
    null,
  )

  const [sessionType, setSessionType] = React.useState<'virtual' | 'in-person'>(
    'virtual',
  )

  const { addStylistToCart } = useAddPersonalStylist()
  const { openCart } = useCartActions()

  const handleProductSelect = (productId: number) => {
    setSelectedProduct(productId)
  }

  const handleAddToCart = () => {
    if (sessionType === 'virtual') {
      addStylistToCart(
        'virtual',
        VIRTUAL_SESSION.durationInMinutes,
        VIRTUAL_SESSION.price,
      )
    } else if (selectedProduct) {
      const durations = PERSONAL_STYLIST_PRICES.map(
        (item) => item.durationInMinutes,
      )
      const prices = PERSONAL_STYLIST_PRICES.map((item) => item.price)
      const duration = durations[selectedProduct - 1] || 120
      const price = prices[selectedProduct - 1] || 250
      addStylistToCart('in-person', duration, price)
    }

    openCart()
  }

  return (
    <>
      <div className="relative container mt-24 flex w-full flex-col justify-end md:mt-36">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'PersonalStylist', href: '/personal-stylist' },
          ]}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1 pt-10">
            <div className="relative h-[500px] w-full md:h-[600px]">
              <Image
                src={PersonalStylistImage}
                alt="product-image"
                objectFit="cover"
                fill
              />
            </div>
          </div>
          <div className="flex-1 md:p-8">
            <Typography variant="text_title" className="mb-4">
              Personal stylist
            </Typography>
            <Typography variant="text_main" className="my-4">
              A personal path of defining your appearance and building a
              wardrobe tailored to your lifestyle, your values, and your
              personal needs. <br />
              Together, we will craft a thoughtfully curated wardrobe that
              reflects you, your lifestyle, your silhouette, and what genuinely
              supports you in your everyday life.No fleeting trends that speak a
              foreign language, and no striving to fit into something that pulls
              you away from who you truly are. <br />
              The path we embrace together is an invitation to listen to
              yourself, to your presence, to what feels true and genuine with
              you, focusing on what brings you comfort and confidence in your
              appearance. <br />
              My approach emphasizes sustainability, quality over quantity, and
              mindful choices that respect the environment. My goal is not to
              create a look, but to build, together, an appearance that feels
              whole, comfortable, and true to who you are today.During our time
              together, we will craft an appearance that reflects your true
              essence, you will gain clear insights and practical tools to
              realize what truly works for you, enabling you to craft an
              authentic appearance that will support you in the long run. <br />
              From that space, when you choose an outfit in alignment with your
              essence, it becomes more than just what you wear, it becomes a
              gentle foundation that holds you. Allowing you to simply be,
              without effort.
            </Typography>
            <br />
            <Typography variant="text_title">Meeting Overview</Typography>
            <Typography variant="text_main">
              <span className="font-bold">We will begin by</span> exploring what
              already exists, your current wardrobe and personal expression,
              together we will explore the choices you have made so far,
              identifying what truly reflects your unique signature and what no
              longer resonates. You will gain valuable tools for making
              intentional, confident decisions moving forward, we’ll refine your
              wardrobe, removing what no longer serves you, leaving only those
              items that are truly empowering and aligns with your true self.
              <br />
              <span className="font-bold">In the next step </span> we’ll explore
              fabric types, flattering color palettes based on your skin tone,
              silhouettes and design lines that enhance your proportions. We’ll
              discover how to create successful combinations using your existing
              wardrobe, from there we’ll dive into finer details - from
              well-fitted lingerie to the right hem length for your proportions
              - will define what’s missing in order to complete your wardrobe in
              a way that truly meets your needs.
              <br />
              <span className="font-bold">Bringing It All Together</span> we’ll
              define the present what fits any occasion, how to wear and carry
              an item with intention, which cuts complement your silhouette, and
              how to make refined choices that reveal the essence of what you
              wish to express. You’ll gain empowering practical clarity to
              express yourself with confidence and coherence in a way that feels
              genuine, resonant, and aligned with your true authentic self.
            </Typography>
            <br />
            <Typography variant="text_title">Virtual Meeting</Typography>
            <Typography variant="text_main">
              A tailored and informative meeting is another way to refine
              yourself - whether you have an important meeting, a significant
              event, a job interview, a key presentation or simply an immediate
              need to refresh and feel centered and present. <br /> During our
              meeting, we will define your vision in a comfortable space,
              exploring the context and message you wish to express, and create
              a smart, accurate appearance that reflects you - your true self.{' '}
              <br /> At the end of our meeting, we will craft a complete
              wardrobe suited to the occasion, including all the essential
              elements: clothing, shoes, and accessories that will support your
              confidence, reflecting the essence you seek to express and allow
              your presence to shine . <br /> At the heart of my goal lies the
              desire to guide you toward feeling whole, confident and empowered
              - radiating that energy wherever you go.
            </Typography>
            <Tabs
              defaultValue="online"
              className="mt-10"
              onValueChange={(value) =>
                setSessionType(value as 'virtual' | 'in-person')
              }
            >
              <TabsList>
                <TabsTrigger value="online" className="uppercase">
                  Online
                </TabsTrigger>
                <TabsTrigger value="at-your-home" className="uppercase">
                  At your home
                </TabsTrigger>
              </TabsList>
              <TabsContent value="online">
                <Typography variant="text_main">
                  <span className="font-bold">Duration:</span>{' '}
                  {VIRTUAL_SESSION.duration}
                </Typography>
                <Typography variant="text_main" className="mt-2">
                  <span className="font-bold">Price:</span>{' '}
                  {getPrice(VIRTUAL_SESSION.price)} {currency}
                </Typography>
              </TabsContent>
              <TabsContent value="at-your-home">
                <div className="flex max-w-[600px] flex-wrap gap-6 bg-[#EFEFEF] p-4">
                  {PERSONAL_STYLIST_PRICES.map((item, index) => (
                    <div
                      key={index}
                      className={clsx(
                        'flex cursor-pointer flex-col items-center justify-center',
                        selectedProduct === item.id
                          ? 'text-black'
                          : 'text-greyy',
                      )}
                      onClick={() => handleProductSelect(item.id)}
                    >
                      <Typography variant="text_main">
                        {item.duration}
                      </Typography>
                      <Typography variant="text_main">
                        {getPrice(item.price)} {currency}
                      </Typography>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <Button
              variant="outline-minimal"
              size="lg"
              className="my-10 uppercase"
              onClick={handleAddToCart}
              disabled={sessionType === 'in-person' && !selectedProduct}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalStylist
