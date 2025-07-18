import React from 'react'

import NotFoundImage from '@/public/assets/404.png'

const not_found = () => {
  return (
    <div
      className="fixed flex h-screen w-screen items-center justify-center bg-white"
      style={{
        backgroundImage: `url(${NotFoundImage.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  )
}

export default not_found
