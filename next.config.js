/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Отключаем React Strict Mode для Studio
  reactStrictMode: false,
  // Настройки для улучшения совместимости с Sanity Studio
  transpilePackages: ['next-sanity'],
  // Конфигурация изображений для Sanity
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.loom.com',
        port: '',
        pathname: '/embed/**',
      },
    ],
  },
  // Настройки webpack для решения проблем с export *
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    }
    return config
  },
}

module.exports = nextConfig 