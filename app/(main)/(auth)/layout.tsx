import AuthImage from '@/public/assets/auth.webp'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center gap-4 px-4"
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
