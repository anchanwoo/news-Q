/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.nytimes.com',
      },
      {
        protocol: 'https',
        hostname: '**.bbci.co.uk',
      },
      {
        protocol: 'http',
        hostname: 'www.koreaherald.com',
      },
      {
        protocol: 'https',
        hostname: '**.japantimes.co.jp',
      },
       {
        protocol: 'https',
        hostname: '**.france24.com',
      },
       {
        protocol: 'https',
        hostname: '**.arabnews.com',
      },
    ],
  },
};

module.exports = nextConfig;
