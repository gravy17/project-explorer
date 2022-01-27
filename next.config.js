module.exports = {
  // compress: false,
  // swcMinify: true,
  reactStrictMode: true,
  useFileSystemPublicRoutes: true,
  async headers() {
    return [
      { 
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          }
        ],
      },
    ]
  }
}