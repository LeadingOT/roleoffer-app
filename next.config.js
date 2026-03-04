/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC minify to force fresh build
  swcMinify: true,
  // Disable build cache
  experimental: {
    isrMemoryCacheSize: 0
  }
}

module.exports = nextConfig
