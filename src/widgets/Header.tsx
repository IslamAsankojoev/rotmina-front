'use client'

import { useEffect, useState } from 'react'

import Leaf from '@/public/assets/leaves.png'
import Logo from '@/public/assets/rotmina-logo.png'
import { Sheet, SheetContent, SheetTrigger } from '@/shadcn/components/ui/sheet'
import {
  CurrancySwitcher,
  LanguageSwitcher,
  Typography,
  useScreenSize,
} from '@/src/shared'
import clsx from 'clsx'
import {
  Facebook,
  Instagram,
  Mail,
  Menu,
  ShoppingBasket,
  Smartphone,
  Star,
  User,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { MiniCart } from '../features'

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

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const { md } = useScreenSize()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="h-12 w-12 md:hidden" />
          <nav className="hidden gap-6 md:flex">
            {leftMenu.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-lg uppercase hover:underline"
              >
                <Typography variant="text_main">{item.title}</Typography>
              </Link>
            ))}
          </nav>
          <Link href="/" className="flex items-center">
            <div
              className={clsx(
                'relative transition-all',
                md ? (!scrolled ? 'h-28 w-74' : 'h-16 w-40') : 'h-16 w-40',
              )}
            >
              <Image src={Logo} alt="logo" fill />
            </div>
          </Link>
          <div className="hidden items-center justify-between md:flex">
            <div className="flex items-center gap-6">
              <div className="text-lg font-medium">
                <Image src={Leaf} width={24} height={24} alt="leaf" />
              </div>
              <Link href="/account" className="text-lg font-medium uppercase">
                <Typography variant="text_main">Account</Typography>
              </Link>
              <Link href="/wishlist" className="text-lg font-medium uppercase">
                <Typography variant="text_main">Wishlist</Typography>
              </Link>
              <MiniCart />
              <LanguageSwitcher />
              <CurrancySwitcher />
            </div>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu size={48} strokeWidth={0.75} className="cursor-pointer" />
              </SheetTrigger>
              <SheetContent side="full-right" className="p-4">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex flex-col">
                    <div className="mt-2 mb-6 flex items-center gap-10">
                      <div className="text-lg font-medium">
                        <Image src={Leaf} width={35} height={35} alt="leaf" />
                      </div>
                      <div>
                        <User size={35} strokeWidth={0.75} className="cursor-pointer" />
                      </div>
                      <div>
                        <Star size={35} strokeWidth={0.75} className="cursor-pointer" />
                      </div>
                      <div>
                        <ShoppingBasket size={35} strokeWidth={0.75} className="cursor-pointer" />
                      </div>
                      <LanguageSwitcher />
                      <CurrancySwitcher />
                    </div>
                    <nav className="mt-6 flex flex-col items-center gap-10">
                      {leftMenu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="text-lg uppercase hover:underline"
                        >
                          <Typography variant="text_main">
                            {item.title}
                          </Typography>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div>
                      <Instagram strokeWidth={0.75} size={23} className="cursor-pointer" />
                    </div>
                    <div>
                      <Smartphone strokeWidth={0.75} size={23} className="cursor-pointer" />
                    </div>
                    <div>
                      <Facebook strokeWidth={0.75} size={23} className="cursor-pointer" />
                    </div>
                    <div>
                      <Mail strokeWidth={0.75} size={23} className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
