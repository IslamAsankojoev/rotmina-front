'use client'

import { HeaderWithAnimate } from "./HeaderWithAnimate"
import { Header } from "./Header"
import { usePathname } from "next/navigation"

export const HeaderProvider = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  if (isHomePage) {
    return <HeaderWithAnimate />
  }

  return <Header />
}
