import { ReactQueryProvider } from '@/src/app'
import { Footer, Header } from '@/src/widgets'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryProvider>
      <main className="flex min-h-screen flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </main>
    </ReactQueryProvider>
  )
}
