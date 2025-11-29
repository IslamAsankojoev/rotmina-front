import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    API_INTERNAL_URL: process.env.API_INTERNAL_URL,
    API_PAY_SERVICE: process.env.API_PAY_SERVICE,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.rotmina.com',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/pay-service/:path',
        destination: `${process.env.API_PAY_SERVICE}/api/TranzillaMakeTransaction/:path`,
      },
      {
        source: '/api/shipment/:path',
        destination: `${process.env.API_PAY_SERVICE}/api/IsraelShippment/:path`,
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_INTERNAL_URL}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.API_INTERNAL_URL}/uploads/:path*`,
      },
    ]
  },
}

export default nextConfig
