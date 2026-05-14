/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/Vobzilla/on.balon/**',
      },
    ],
  },
}

module.exports = nextConfig
