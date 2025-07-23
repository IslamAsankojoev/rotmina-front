import AuthImage from '@/public/assets/auth.png'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className="mt-24 flex h-screen flex-col items-center justify-center gap-4 px-4 md:mt-36"
      style={{
        backgroundImage: `url(${AuthImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  )
}
