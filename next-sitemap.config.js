/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kidoden.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) => {
      return robotsTxt.replace('Host: https://kidoden.in', 'Host: kidoden.in');
    },
  },
}
