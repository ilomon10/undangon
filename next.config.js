module.exports = {
  images: {
    domains: ["ba-undang.000webhostapp.com"],
    minimumCacheTTL: 60,
  },
  env: {
    serverUrl: process.env.SERVER
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