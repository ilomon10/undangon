module.exports = {
  staticPageGenerationTimeout: 1000,
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
    mapboxApiKey: process.env.MAPBOX_API_KEY,
    imagekitUrl: process.env.IMAGEKIT_URL,
    imagekitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    immichUrl: process.env.IMMICH_URL,
    immichApiKey: process.env.IMMICH_API_KEY,
    immichSharedAlbumId: process.env.IMMICH_SHARED_ALBUM_ID,
    immichSharedAlbumKey: process.env.IMMICH_SHARED_ALBUM_KEY,
  },
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  // i18n: {
  //   locales: ["id-ID"],
  //   defaultLocale: "id-ID",
  // },
  async rewrites() {
    return [
      {
        source: "/api/immich/assets/:id",
        destination: `//wsrv.nl/?url=${process.env.IMMICH_URL}/assets/:id/thumbnail?key=${process.env.IMMICH_SHARED_ALBUM_KEY}`,
      }
    ]
  }
};
