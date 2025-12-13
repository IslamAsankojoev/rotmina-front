import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    URL: process.env.URL,
    API_INTERNAL_URL: process.env.API_INTERNAL_URL,
    API_PAY_SERVICE: process.env.API_PAY_SERVICE,
    TRANZILLA_NONCE: process.env.TRANZILLA_NONCE,
    TRANZILLA_APP_KEY: process.env.TRANZILLA_APP_KEY,
    TRANZILLA_SECRET: process.env.TRANZILLA_SECRET,

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
        source: '/api/tranzilla/:path',
        destination: `https://api.tranzila.com/v1/transaction/credit_card/:path`,
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
