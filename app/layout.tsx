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
  title: 'Rotmina House offers luxury vegan fashion with elegant, refined lines. Explore timeless designer clothing made from premium cruelty-free materials.',
  description: "Shop cruelty-free dresses, suits & coats made with premium eco-friendly fabrics. Worldwide shipping.",
  keywords: "luxury vegan clothing, luxury fashion brand, ethical fashion brand, luxury women’s fashion New-York, new collection 2025, women’s collection 2025, cruelty-free fashion, designer clothing Italy online, Rotmina designer clothing, Rotmina, שמלת ערב טבעונית יוקרתית משלוח עד הבית, Lucem Project, מותג אופנה רותמינה, premium vegan winter coat for women, sustainable designer clothing",
  openGraph: {
    title: 'Luxury Vegan Women’s Clothing | Rotmina® Designer Brand',
    type: 'website',
    description: "Shop cruelty-free dresses, suits & coats made with premium eco-friendly fabrics. Worldwide shipping.",
    siteName: 'Rotmina',
    locale: 'en_EN',
    url: 'https://www.rotmina.com',
    images: ['https://www.rotmina.com/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nool',
    description: 'Luxury Vegan Women’s Clothing - Rotmina',
    site: 'https://x.com',
    images: ['https://www.rotmina.com/opengraph-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon.png', type: 'image/png', sizes: '64x64' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
