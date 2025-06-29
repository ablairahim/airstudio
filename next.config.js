/** @type {import('next').NextConfig} */
const nextConfig = {
  // Оптимизации производительности
  compress: true,
  poweredByHeader: false,
  
  // Отключаем React Strict Mode для Studio
  reactStrictMode: false,
  // Настройки для улучшения совместимости с Sanity Studio
  transpilePackages: ['next-sanity', 'sanity'],
  // Конфигурация изображений для Sanity с оптимизацией
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  // Настройки webpack для решения проблем с Sanity
  webpack: (config, { isServer }) => {
    // Добавляем alias для framer-motion (нужен для Sanity Studio)
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    }
    
    // Исправляем проблемы с vendor chunks только для клиента
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
      }
    }
    
    return config
  },
}

module.exports = nextConfig 