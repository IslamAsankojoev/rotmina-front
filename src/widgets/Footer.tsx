'use client'

import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'

import { Typography, useScreenSize } from '../shared'
import { SignUpToNews } from '@/src/features'


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
    <footer className="bg-blackish py-16 pb-12">
      <div className="container flex flex-col justify-between gap-6 md:flex-row">
        <SignUpToNews />
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
          <div className="flex md:justify-between justify-start gap-10 md:gap-6">
            <div>
              <Instagram strokeWidth={1.3} size={md ? 35 : 24} color="white" />
            </div>
            <div>
              <Smartphone
                strokeWidth={1.3}
                size={md ? 35 : 24}
                color="white"
                className='rotate-12'
              />
            </div>
            <div>
              <Facebook strokeWidth={1.3} size={md ? 35 : 24} color="white" />
            </div>
            <div>
              <Mail strokeWidth={1.3} size={md ? 35 : 24} color="white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
