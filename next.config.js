/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/Vobzilla/on.balon/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dnyevlhh7/**',
      },
    ],
  },

  async redirects() {
    return [
      // Old URLs without extension
      { source: '/helium-gallery', destination: '/#products', permanent: true },
      { source: '/dekoracje',      destination: '/#products', permanent: true },
      { source: '/price',          destination: '/#products', permanent: true },
      { source: '/about',          destination: '/o-nas',     permanent: true },
      // Old URLs with .html extension
      { source: '/helium-gallery.html', destination: '/#products', permanent: true },
      { source: '/dekoracje.html',      destination: '/#products', permanent: true },
      { source: '/price.html',          destination: '/#products', permanent: true },
      { source: '/about.html',          destination: '/o-nas',     permanent: true },
      { source: '/index.html',          destination: '/',           permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Clickjacking protection
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Referrer policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Cross-origin isolation
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // HSTS (only active in production with HTTPS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
