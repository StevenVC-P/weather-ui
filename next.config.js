/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add this to help with static file loading
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['firebase'],
  },
}

module.exports = nextConfig 