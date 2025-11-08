'use client'

import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'

import { Typography, useScreenSize, useDictionary, useLocale } from '../shared'
import { SignUpToNews } from '@/src/features'


const getLeftMenu = (t: {
  myStory: string
  shop: string
  giftCard: string
  personalStylist: string
}) => [
  {
    title: t.myStory,
    href: '/my-story',
  },
  {
    title: t.shop,
    href: '/shop',
  },
  {
    title: t.giftCard,
    href: '/gift-card',
  },
  {
    title: t.personalStylist,
    href: '/personal-stylist',
  },
]

const getRightMenu = (t: {
  termsOfUse: string
  privacyPolicy: string
  shippingAndReturns: string
  paymentAndDelivery: string
}) => [
  {
    title: t.termsOfUse,
    href: '/terms-of-conditions',
  },
  {
    title: t.privacyPolicy,
    href: '/privacy-policy',
  },
  {
    title: t.shippingAndReturns,
    href: '/international-shipping',
  },
  {
    title: t.paymentAndDelivery,
    href: '/returns-&-exchanges',
  },
]

export const Footer = () => {
  const { md } = useScreenSize()
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const headerT = ((dictionary as unknown) as Record<string, Record<string, string>>).header || {
    myStory: 'My Story',
    shop: 'Shop',
    giftCard: 'Gift Card',
    personalStylist: 'Personal Stylist',
  }
  const footerT = ((dictionary as unknown) as Record<string, Record<string, string>>).footer || {
    contact: 'Contact',
    termsOfUse: 'Terms of conditions',
    privacyPolicy: 'Privacy Policy',
    shippingAndReturns: 'Shipping & Returns',
    paymentAndDelivery: 'Payment & Delivery',
  }
  const leftMenu = getLeftMenu(headerT as {
    myStory: string
    shop: string
    giftCard: string
    personalStylist: string
  })
  const rightMenu = getRightMenu(footerT as {
    termsOfUse: string
    privacyPolicy: string
    shippingAndReturns: string
    paymentAndDelivery: string
  })
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
                    href={localizePath(item.href)}
                    className="text-white hover:underline"
                  >
                    <Typography variant="text_mini_footer">
                      {item.title}
                    </Typography>
                  </a>
                ))}
              <a href={localizePath('/contact')} className="text-white hover:underline">
                <Typography variant="text_mini_footer">{footerT.contact}</Typography>
              </a>
            </div>
            <div className="flex flex-col gap-2 text-white">
              {rightMenu.map((item) => (
                <a key={item.title} href={localizePath(item.href)} className="text-white hover:underline">
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
