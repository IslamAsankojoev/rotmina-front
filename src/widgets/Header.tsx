'use client'

import { useLayoutEffect, useState } from 'react'

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
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

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

const rightMenu = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
  {
    title: 'Eco',
    href: '/eco',
  },
  {
    title: 'Returns & Exchanges',
    href: '/returns-&-exchanges',
  },
  {
    title: 'International Shipping',
    href: '/international-shipping',
  },
]

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { xl } = useScreenSize()
  const router = useRouter()
  const pathname = usePathname()

  useLayoutEffect(() => {
    const windowScroll = window.scrollY
    setScrolled(windowScroll > 5)

    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={clsx(
          `top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`,
          pathname === '/' ? 'fixed' : 'sticky',
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between pt-1 lg:py-4">
            <div className="h-12 w-12 md:hidden" />
            <nav className="hidden gap-6 xl:flex">
              {leftMenu.map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleNavigation(item.href)}
                  className="cursor-pointer text-lg uppercase hover:underline"
                >
                  <Typography variant="text_main">{item.title}</Typography>
                </button>
              ))}
            </nav>
            <Link href="/" className="flex items-center">
              <div
                className={clsx(
                  'relative transition-all',
                  xl ? (!scrolled ? 'h-28 w-74' : 'h-16 w-40') : 'h-16 w-40',
                )}
              >
                <Image src={Logo} alt="logo" fill />
              </div>
            </Link>
            <div className="hidden items-center justify-between xl:flex">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleNavigation('/eco')}
                  className="cursor-pointer text-lg font-medium"
                >
                  <Image src={Leaf} width={24} height={24} alt="leaf" />
                </button>
                <button
                  onClick={() => handleNavigation('/account')}
                  className="cursor-pointer text-lg font-medium uppercase hover:underline"
                >
                  <Typography variant="text_main">Account</Typography>
                </button>
                <button
                  onClick={() => handleNavigation('/wishlist')}
                  className="cursor-pointer text-lg font-medium uppercase hover:underline"
                >
                  <Typography variant="text_main">Wishlist</Typography>
                </button>
                <MiniCart />
                <LanguageSwitcher />
                <CurrancySwitcher />
              </div>
            </div>
            <div className="flex items-center gap-4 xl:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Menu
                    size={48}
                    strokeWidth={0.75}
                    className="cursor-pointer"
                  />
                </SheetTrigger>
                <SheetContent
                  side="full-right"
                  className="p-4"
                  showCloseButton={false}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex flex-col">
                      <div className="mt-2 mb-6 flex items-center justify-between">
                        <button
                          onClick={() => handleNavigation('/eco')}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg font-medium"
                        >
                          <div className="relative size-10">
                            <Image src={Leaf} fill alt="leaf" />
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavigation('/account')}
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <User
                            size={35}
                            strokeWidth={0.75}
                            className="cursor-pointer"
                          />
                        </button>
                        <button
                          onClick={() => handleNavigation('/wishlist')}
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <Star
                            size={35}
                            strokeWidth={0.75}
                            className="cursor-pointer"
                          />
                        </button>
                        <button
                          onClick={() => handleNavigation('/cart')}
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <ShoppingBasket
                            size={35}
                            strokeWidth={0.75}
                            className="cursor-pointer"
                          />
                        </button>
                        <LanguageSwitcher />
                        <CurrancySwitcher />
                        <button
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <X
                            size={45}
                            strokeWidth={0.75}
                            className="cursor-pointer"
                          />
                          <span className="sr-only">Close</span>
                        </button>
                      </div>
                      <nav className="mt-6 flex flex-col items-center gap-4">
                        {leftMenu.map((item) => (
                          <button
                            key={item.title}
                            onClick={() => handleNavigation(item.href)}
                            className="cursor-pointer text-lg uppercase hover:underline"
                          >
                            <Typography
                              variant="text_main"
                              className={clsx(
                                'text-greyy',
                                pathname === item.href && 'text-black',
                              )}
                            >
                              {item.title}
                            </Typography>
                          </button>
                        ))}
                      </nav>
                    </div>
                    <div className="mb-20 flex justify-between gap-4 px-10">
                      <button
                        onClick={() =>
                          window.open('https://instagram.com/rotmina', '_blank')
                        }
                      >
                        <Instagram
                          strokeWidth={1}
                          size={23}
                          className="cursor-pointer"
                        />
                      </button>
                      <button
                        onClick={() => window.open('tel:+1234567890', '_self')}
                      >
                        <Smartphone
                          strokeWidth={1}
                          size={23}
                          className="rotate-12 cursor-pointer"
                        />
                      </button>
                      <button
                        onClick={() =>
                          window.open('https://facebook.com/rotmina', '_blank')
                        }
                      >
                        <Facebook
                          strokeWidth={1}
                          size={23}
                          className="cursor-pointer"
                        />
                      </button>
                      <button
                        onClick={() =>
                          window.open('mailto:info@rotmina.com', '_self')
                        }
                      >
                        <Mail
                          strokeWidth={1}
                          size={23}
                          className="cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <div className="h-8" />
    </>
  )
}
