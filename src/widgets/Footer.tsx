'use client'

import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'
import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'
import { Libre_Caslon_Text } from 'next/font/google'

import { Typography, useScreenSize } from '../shared'

const libreCaslonText = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const leftMenu = [
  {
    title: 'My Story',
    href: '/my-story',
  },
  {
    title: 'Shop',
    href: '/shop',
  },
  {
    title: 'Gift Card',
    href: '/gift-card',
  },
  {
    title: 'Personal Stylist',
    href: '/personal-stylist',
  },
]

const rightMenu = [
  {
    title: 'Terms of conditions',
    href: '/terms-of-conditions',
  },
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    title: 'Shipping & Returns',
    href: '/international-shipping',
  },
  {
    title: 'Payment & Delivery',
    href: '/returns-&-exchanges',
  },
]

export const Footer = () => {
  const { md } = useScreenSize()
  return (
    <footer className="bg-blackish py-16">
      <div className="container flex flex-col justify-between gap-6 md:flex-row">
        <div className="flex flex-col gap-10">
          <div className="text-white">
            <div className="inline-flex flex-col items-center justify-center gap-2.5">
              <div
                className={`justify-start ${libreCaslonText.className} text-white`}
              >
                <Typography variant="text_mobile_title2" className="italic">
                  Sign up for updates
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Input placeholder="Email" className="text-white" />
            <Button variant="minimal">SEND</Button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-10 md:w-fit">
          <div className="flex justify-between gap-8">
            <div className="flex flex-col gap-2">
              {leftMenu
                .filter((el) => el.href !== '/personal-stylist')
                .map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-white hover:underline"
                  >
                    <Typography variant="text_mini_footer">
                      {item.title}
                    </Typography>
                  </a>
                ))}
              <a href={'/contact'} className="text-white hover:underline">
                <Typography variant="text_mini_footer">Contact</Typography>
              </a>
            </div>
            <div className="flex flex-col gap-2 text-white">
              {rightMenu.map((item) => (
                <a key={item.title} href={item.href} className="text-white hover:underline">
                  <Typography variant="text_mini_footer">
                    {item.title}
                  </Typography>
                </a>
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div>
              <Instagram strokeWidth={0.75} size={md ? 35 : 24} color="white" />
            </div>
            <div>
              <Smartphone
                strokeWidth={0.75}
                size={md ? 35 : 24}
                color="white"
              />
            </div>
            <div>
              <Facebook strokeWidth={0.75} size={md ? 35 : 24} color="white" />
            </div>
            <div>
              <Mail strokeWidth={0.75} size={md ? 35 : 24} color="white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
