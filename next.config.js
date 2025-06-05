/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    'lucide-react',
    '@daily-co/daily-js',
    'recharts'
  ],
  images: { unoptimized: true }
};

module.exports = nextConfig;
