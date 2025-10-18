import type { Metadata } from 'next'
import { Arima } from 'next/font/google'
import { Toaster } from "@/shadcn/components/ui/sonner"

import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './globals.css'

const arima = Arima({
  variable: '--font-arima',
  subsets: ['latin'],
  weight: ['100', '200', '300', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Rotmina',
  description: 'fashion brand',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${arima.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
