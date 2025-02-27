/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other config options
  images: {
    domains: ['localhost'],
  },
  experimental: {
    // Your existing experimental config
    // Add this to support query parameters in OpenGraph images
    appDir: true,
  },
};

module.exports = nextConfig; 