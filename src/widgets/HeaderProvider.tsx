'use client'

// import { HeaderWithAnimate } from "./HeaderWithAnimate"
import { Header } from "./Header"
// import { usePathname } from "next/navigation"

export const HeaderProvider = () => {
  // const pathname = usePathname()
  // Проверяем, является ли это главной страницей (с учетом locale)
  // const isHomePage = pathname === '/' || pathname.match(/^\/(en|he)\/?$/)

  // if (isHomePage) {
  //   return <HeaderWithAnimate />
  // }

  return <Header />
}
