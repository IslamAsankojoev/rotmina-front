import { ReactQueryProvider } from '@/src/app'
import { Footer, HeaderProvider } from '@/src/widgets'
import { getServerLocale } from '@/src/shared/utils/locale'
import { cookies } from 'next/headers'

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const isRTL = locale === 'he'
  
  return (
    <ReactQueryProvider>
      <div className="flex min-h-screen flex-col justify-between">
        <div dir="ltr">
          <HeaderProvider />
        </div>
        <div dir={isRTL ? 'rtl' : 'ltr'}>
          {children}
        </div>
        <div dir={isRTL ? 'rtl' : 'ltr'}>
          <Footer />
        </div>
      </div>
    </ReactQueryProvider>
  )
}
