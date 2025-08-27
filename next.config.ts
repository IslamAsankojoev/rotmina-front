import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${process.env.API_URL}/uploads/:path*`,
      },
    ]
  },
}

export default nextConfig
