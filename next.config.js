/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    newNextLinkBehavior: false
  },
  // swcMinify: false,
  // serverComponentsExternalPackages: ['@tremor/react'],
}

module.exports = nextConfig
