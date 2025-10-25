import React from 'react'

import NotFoundDesktopImage from '@/public/assets/404_d.webp'
import NotFoundMobileImage from '@/public/assets/404_m.webp'
import { Typography } from '@/src/shared'
import Link from 'next/link'

const not_found = () => {
  return (
    <>
      <div
        className="fixed hidden h-screen w-screen items-center justify-center md:flex saturate-0"
        style={{
          backgroundImage: `url(${NotFoundDesktopImage.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="fixed flex h-screen w-screen items-center justify-center md:hidden saturate-0"
        style={{
          backgroundImage: `url(${NotFoundMobileImage.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <Link href="/" className="fixed bottom-64 md:bottom-10 text-white left-1/2 -translate-x-1/2 z-10 block underline">
        <Typography variant="text_main" className="uppercase">
          Go to mainpage
        </Typography>
      </Link>
    </>
  )
}

export default not_found
