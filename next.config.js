/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirect /api to Next.js API routes
  async redirects() {
    return [];
  },
}

module.exports = nextConfig
