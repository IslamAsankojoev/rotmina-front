import AuthImage from '@/public/assets/auth.webp'
import { SiteImagesApi } from '@/src/features'

const getImage = async () => {
  const siteImages = await SiteImagesApi.getSiteImages()
  return siteImages.data?.login?.url
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const image = await getImage()
  return (
    <div
      className="flex h-screen flex-col items-center justify-center gap-4 px-4"
      style={{
        backgroundImage: `url(${image || AuthImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  )
}
