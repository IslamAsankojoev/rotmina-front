'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger, ScrollSmoother } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

import Leaf from '@/public/assets/leaves.png'
import Logo from '@/public/assets/rotmina-logo.png'
import { Sheet, SheetContent, SheetTrigger } from '@/shadcn/components/ui/sheet'
import {
  CurrencySwitcher,
  LanguageSwitcher,
  Typography,
  useScreenSize,
  useLocale,
  socialLinks,
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
import { usePathname } from 'next/navigation'
import { MiniCart } from '../features'

const especiallyLinks = ['/login', '/signup', '/reset-password', '/forgot-password', '/']

const leftMenu = [
  { title: 'My Story', href: '/my-story' },
  { title: 'Shop', href: '/shop' },
  { title: 'Gift Card', href: '/gift-card' },
  { title: 'Personal Stylist', href: '/personal-stylist' },
]

export const HeaderWithAnimate = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { xl } = useScreenSize()
  const pathname = usePathname()
  const { localizePath } = useLocale()
  // Проверяем, является ли это главной страницей (с учетом locale)
  const isHomePage = pathname === '/' || pathname.match(/^\/(en|he)\/?$/)

  // refs для GSAP‑анимаций
  const headerRef = useRef<HTMLElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const initialLogoRef = useRef<HTMLDivElement | null>(null) // Логотип для начального экрана
  const initialScreenRef = useRef<HTMLDivElement | null>(null) // Белый экран с логотипом
  const burgerRef = useRef<HTMLButtonElement | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const rightMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Традиционная логика с уменьшением высоты при скролле
    const SHRINK_THRESHOLD = 120
    const EXPAND_THRESHOLD = 60
    const MIN_TOGGLE_DELTA = 40
    let ticking = false
    const lastToggleYRef = { current: 0 }

    const applyScrollState = () => {
      const y = window.scrollY
      setScrolled((prev) => {
        if (!prev) {
          if (y > SHRINK_THRESHOLD && y - lastToggleYRef.current > MIN_TOGGLE_DELTA) {
            lastToggleYRef.current = y
            return true
          }
          return prev
        } else {
          if (y < EXPAND_THRESHOLD && lastToggleYRef.current - y > MIN_TOGGLE_DELTA) {
            lastToggleYRef.current = y
            return false
          }
          return prev
        }
      })
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(applyScrollState)
        ticking = true
      }
    }

    applyScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP‑анимация: большой логотип по центру → header, появление элементов хедера
  useEffect(() => {
    if (!isHomePage) return
    
    // Ждем, пока все элементы отрендерятся
    const initAnimation = () => {
      if (!headerRef.current || !logoRef.current || !initialLogoRef.current || !initialScreenRef.current) {
        requestAnimationFrame(initAnimation)
        return
      }

      const headerLogo = logoRef.current
      const initialLogo = initialLogoRef.current
      const initialScreen = initialScreenRef.current
      const header = headerRef.current

      // Начальное состояние: начальный логотип виден и большой, логотип в хедере скрыт
      gsap.set(initialScreen, { opacity: 1, pointerEvents: 'none' })
      gsap.set(initialLogo, { 
        opacity: 1, 
        scale: 4,
        x: 0,
        y: 0,
      })
      gsap.set(headerLogo, { opacity: 0 })
      // Хедер виден, но прозрачный, элементы внутри скрыты
      gsap.set(header, { 
        opacity: 1,
        backgroundColor: 'transparent',
      })
      if (navRef.current) gsap.set(navRef.current, { opacity: 0 })
      if (rightMenuRef.current) gsap.set(rightMenuRef.current, { opacity: 0 })
      if (burgerRef.current) gsap.set(burgerRef.current, { opacity: 0 })

      // Вычисляем позиции после небольшой задержки для корректного рендеринга
      setTimeout(() => {
        const headerLogoRect = headerLogo.getBoundingClientRect()
        // const initialLogoRect = initialLogo.getBoundingClientRect()
        
        // Центр экрана (где находится начальный логотип благодаря flex)
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        
        // Центр начального логотипа
        const startX = centerX
        const startY = centerY
        
        // Центр логотипа в хедере
        const endX = headerLogoRect.left + headerLogoRect.width / 2
        const endY = headerLogoRect.top + headerLogoRect.height / 2

        // Вычисляем смещение от центра экрана к центру логотипа в хедере
        const deltaX = endX - startX
        const deltaY = endY - startY

        // Устанавливаем начальную позицию (логотип уже в центре благодаря flex)
        gsap.set(initialLogo, {
          x: 0,
          y: 0,
          scale: xl ? 4 : 2,
          opacity: 1,
          transformOrigin: 'center center',
        })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: () => window.innerHeight * 1.5,
            scrub: 1.2,
          },
        })

        // Анимация начального логотипа: уменьшение и перемещение (остается видимым до конца)
        timeline.to(
          initialLogo,
          {
            x: deltaX,
            y: deltaY,
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0,
        )

        // Показываем логотип в хедере синхронно, чтобы он был виден когда начальный логотип приходит
        timeline.to(
          headerLogo,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.5, // Начинаем показывать когда начальный логотип на 50% пути
        )

        // Скрываем начальный логотип только в самом конце вместе с белым экраном
        timeline.to(
          initialLogo,
          {
            opacity: 0,
            duration: 0.1,
            ease: 'power2.out',
          },
          0.98, // Скрываем в самом конце, когда логотип в хедере уже полностью виден
        )

        // Скрываем белый экран после завершения анимации логотипа
        timeline.to(
          initialScreen,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          },
          0.95,
        )

        // Показываем фон хедера и тень
        timeline.to(
          header,
          {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 0 10px rgba(0,0,0,0.15)',
            duration: 0.4,
            ease: 'power2.out',
          },
          0.6,
        )

        if (navRef.current) {
          timeline.to(
            navRef.current,
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            0.8,
          )
        }

        if (rightMenuRef.current) {
          timeline.to(
            rightMenuRef.current,
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            0.8,
          )
        }

        if (burgerRef.current) {
          timeline.to(
            burgerRef.current,
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
            0.8,
          )
        }
      }, 100)
    }

    initAnimation()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === document.body) {
          trigger.kill()
        }
      })
    }
  }, [isHomePage, xl])

  return (
    <>
      {isHomePage && (
        <>
        <div 
          ref={initialScreenRef}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white pointer-events-none"
        >
          <div
            ref={initialLogoRef}
            className="relative h-20 w-40 md:h-20 md:w-40"
            style={{ transformOrigin: 'center center' }}
          >
            <Image src={Logo} alt="logo" fill className="object-contain" />
          </div>
        </div>
        <div className="h-screen" />
        </>
      )}

      <header
        ref={headerRef}
        className={clsx(
          `top-0 left-0 z-50 w-full transition-all duration-300 ${
            scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
          }`,
          isHomePage ? 'fixed' : 'sticky bg-white',
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between pt-1 lg:py-4">
            <div className="h-12 w-12 md:hidden" />
            <nav ref={navRef} className="hidden gap-6 xl:flex">
              {leftMenu.map((item) => (
                <Link
                  key={item.title}
                  href={localizePath(item.href)}
                  className="cursor-pointer text-lg uppercase hover:underline"
                >
                  <Typography variant="text_main">{item.title}</Typography>
                </Link>
              ))}
            </nav>
            <Link href={localizePath('/')} className="flex items-center">
              {/* ref для GSAP‑анимации логотипа */}
              <div
                ref={logoRef}
                className={clsx(
                  'relative transition-all',
                  xl ? (!scrolled ? 'h-28 w-74' : 'h-16 w-40') : 'h-16 w-40',
                )}
              >
                <Image src={Logo} alt="logo" fill />
              </div>
            </Link>
            <div ref={rightMenuRef} className="hidden items-center justify-between xl:flex">
              <div className="flex items-center gap-6">
                <Link
                  href={localizePath('/eco')}
                  className="cursor-pointer text-lg font-medium"
                >
                  <Image src={Leaf} width={24} height={24} alt="leaf" />
                </Link>
                <Link
                  href={localizePath('/account')}
                  className="cursor-pointer text-lg font-medium uppercase hover:underline"
                >
                  <Typography variant="text_main">Account</Typography>
                </Link>
                <Link
                  href={localizePath('/wishlist')}
                  className="cursor-pointer text-lg font-medium uppercase hover:underline"
                >
                  <Typography variant="text_main">Wishlist</Typography>
                </Link>
                <MiniCart />
                <LanguageSwitcher />
                <CurrencySwitcher />
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
                        <Link
                          href={localizePath('/eco')}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center text-lg font-medium"
                        >
                          <div className="relative size-10">
                            <Image src={Leaf} fill alt="leaf" />
                          </div>
                        </Link>
                        <Link
                          href={localizePath('/account')}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <User
                            size={35}
                            strokeWidth={0.75}
                            className="cursor-pointer"
                          />
                        </Link>
                        <Link
                          href={localizePath('/wishlist')}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <Star
                            size={35}
                            strokeWidth={0.75}
                            className="cursor-pointer"
                          />
                        </Link>
                        <Link
                          href={localizePath('/cart')}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex h-10 w-10 items-center justify-center"
                        >
                          <ShoppingBasket
                            size={35}
                            strokeWidth={0.75}
                            className="cursor-pointer"
                          />
                        </Link>
                        <LanguageSwitcher />
                        <CurrencySwitcher />
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
                          <Link
                            key={item.title}
                            href={localizePath(item.href)}
                            onClick={() => setIsMobileMenuOpen(false)}
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
                          </Link>
                        ))}
                      </nav>
                    </div>
                    <div className="mb-20 flex justify-between gap-4 px-10">
                      <button
                        onClick={() =>
                          window.open(socialLinks.instagram, '_blank')
                        }
                      >
                        <Instagram
                          strokeWidth={1}
                          size={23}
                          className="cursor-pointer"
                        />
                      </button>
                      <button
                        onClick={() => window.open(socialLinks.phone, '_self')}
                      >
                        <Smartphone
                          strokeWidth={1}
                          size={23}
                          className="rotate-12 cursor-pointer"
                        />
                      </button>
                      <button
                        onClick={() =>
                          window.open(socialLinks.facebook, '_blank')
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
                          window.open(socialLinks.email, '_self')
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
      {!especiallyLinks.includes(pathname) && <div className="h-8" />}
    </>
  )
}