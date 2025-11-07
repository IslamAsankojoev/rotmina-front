import { Toaster } from '@/shadcn/components/ui/sonner'
import { A11yProvider } from '@/src/accessibility'
import type { Metadata } from 'next'
import { Arima } from 'next/font/google'
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
  // Root layout не имеет доступа к params, поэтому используем дефолтный язык
  // Реальный язык будет установлен в [locale]/layout.tsx
  return (
    <html lang="en">
      <body className={`${arima.className} antialiased`}>
        <A11yProvider>
          <main id="main">{children}</main>
        </A11yProvider>
        <Toaster />
      </body>
    </html>
  )
}
