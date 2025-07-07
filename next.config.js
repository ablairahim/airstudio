/** @type {import('next').NextConfig} */
const nextConfig = {
  // Оптимизации производительности
  compress: true,
  poweredByHeader: false,
  
  // Experimental features для лучшей производительности
  experimental: {
    optimizePackageImports: ['@sanity/client', '@sanity/image-url', 'gsap'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  
  // Полностью отключаем CORS проверку для разработки
  crossOrigin: 'anonymous',
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // CORS headers для мобильных устройств
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
  
  // Отключаем React Strict Mode для Studio
  reactStrictMode: false,
  // Настройки для улучшения совместимости с Sanity Studio
  transpilePackages: ['next-sanity', 'sanity'],
  // Конфигурация изображений для Sanity с оптимизацией
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600, // 1 час кеш для изображений
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
  webpack: (config, { isServer, dev }) => {
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

    // Оптимизации для продакшена
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          sanity: {
            test: /[\\/]node_modules[\\/](@sanity|sanity)[\\/]/,
            name: 'sanity',
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      }
    }
    
    return config
  },
}

module.exports = nextConfig 