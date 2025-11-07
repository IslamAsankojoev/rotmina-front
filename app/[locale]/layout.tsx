import { ReactQueryProvider } from '@/src/app'
import { Footer, HeaderProvider } from '@/src/widgets'

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  
  return (
    <ReactQueryProvider>
      <div className="flex min-h-screen flex-col justify-between">
        <HeaderProvider />
        {children}
        <Footer />
      </div>
    </ReactQueryProvider>
  )
}
