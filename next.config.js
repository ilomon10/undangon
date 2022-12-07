module.exports = {
  images: {
    domains: ["ba-undang.000webhostapp.com"],
    minimumCacheTTL: 60,
  },
  env: {
    serverApiKey: process.env.SERVER_API_KEY,
    serverUrl: process.env.SERVER,
    appName: process.env.APP_NAME,
    appDomain: process.env.APP_DOMAIN,
    currentHostName: process.env.CURRENT_HOSTNAME,
    googleApiKey: process.env.GOOGLE_API_KEY,
  },
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  i18n: {
    locales: ["id-ID"],
    defaultLocale: "id-ID",
  },
};
