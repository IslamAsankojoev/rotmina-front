import type { NextConfig } from 'next'

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:1337'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: apiUrl,
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${apiUrl}/uploads/:path*`,
      },
    ]
  },
}

export default nextConfig