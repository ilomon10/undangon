module.exports = {
  images: {
    domains: ["ba-undang.000webhostapp.com"],
    minimumCacheTTL: 60,
  },
  env: {
    serverUrl: process.env.SERVER,
    appName: process.env.APP_NAME,
    appDomain: process.env.APP_DOMAIN
  },
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  i18n: {
    locales: ['id-ID'],
    defaultLocale: 'id-ID'
  }
}