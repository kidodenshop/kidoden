/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kidoden.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) => {
      return robotsTxt.replace('Host: https://kidoden.in', 'Host: kidoden.in');
    },
  },
  additionalPaths: async (config) => {
    const routes = [
      '/',
      '/shop',
      '/about',
      '/contact',
      '/privacy',
      '/terms-and-conditions',
      '/shipping-returns',
    ];
    return routes.map((route) => ({
      loc: route,
      changefreq: config.changefreq || 'daily',
      priority: route === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
