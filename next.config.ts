const internalApi = process.env.API_INTERNAL_URL || 'http://backend:1337';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*',     destination: `${internalApi}/api/:path*` },
      { source: '/uploads/:path*', destination: `${internalApi}/uploads/:path*` },
    ];
  },
};

module.exports = nextConfig;