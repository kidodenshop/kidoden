/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kidoden.in',
  generateRobotsTxt: true,
  exclude: ['/icon.png', '/icon.svg', '/apple-icon.png'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*', '/checkout', '/checkout/*'],
      },
    ],
    transformRobotsTxt: async (_, robotsTxt) => {
      return robotsTxt.replace(/Host:\s*https?:\/\/[^\n]+/i, 'Host: www.kidoden.in');
    },
  },
  additionalPaths: async (config) => {
    const routes = [
      '/',
      '/shop',
      '/shop?category=clothing',
      '/shop?category=infants',
      '/shop?category=gifting',
      '/shop?collection=winter-collection',
      '/about',
      '/contact-us',
      '/privacy-policy',
      '/terms-and-conditions',
      '/shipping-returns-policy',
      '/product/c-1',
      '/product/c-2',
      '/product/c-3',
      '/product/c-4',
      '/product/c-5',
      '/product/g-1',
      '/product/g-2',
      '/product/g-3',
      '/product/inf-1',
      '/product/inf-2',
    ];
    return routes.map((route) => ({
      loc: route,
      changefreq: config.changefreq || 'daily',
      priority: route === '/' ? 1.0 : route.startsWith('/product') ? 0.9 : route.startsWith('/shop') ? 0.8 : 0.6,
      lastmod: new Date().toISOString(),
    }));
  },
};

