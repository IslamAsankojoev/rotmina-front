import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/en',
        '/he',
        '/en/shop',
        '/he/shop',
        '/en/my-story',
        '/he/my-story',
        '/en/gift-card',
        '/he/gift-card',
        '/en/collection',
        '/he/collection',
        '/en/personal-stylist',
        '/he/personal-stylist',
      ],
      disallow: [
        '/en/login',
        '/he/login',
        '/en/signup',
        '/he/signup',
        '/en/reset-password',
        '/he/reset-password',
        '/en/profile',
        '/he/profile',
        '/en/cart',
        '/he/cart',
        '/en/checkout',
        '/he/checkout',
      ],
    },
    sitemap: 'https://rotmina.com/sitemap.xml',
  }
}
