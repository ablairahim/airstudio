# 🚀 Deploy Checklist для AirStudio

## Перед деплоем

### 1. Переменные окружения
```bash
# Обязательные переменные
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. Оптимизации выполнены ✅
- [x] LoadingScreen - цифры 14px, убран текст loading
- [x] Hero анимация - fixed split type behavior
- [x] Navbar - белый логотип
- [x] Sanity - оптимизированный кеш (5 мин revalidation)
- [x] Console statements - только в development
- [x] Next.js config - bundle optimization
- [x] Performance monitoring - добавлен
- [x] SEO meta tags - улучшены
- [x] Image optimization - WebP/AVIF support

### 3. Проверка производительности
```bash
# Билд проекта
npm run build

# Проверка bundle size
npm run analyze # (если добавлен)

# Запуск production сервера
npm start
```

### 4. Санity CMS оптимизация
- CDN включен для продакшена
- Кеширование 5 минут
- Оптимизация изображений (quality: 85)
- ISR (Incremental Static Regeneration)

### 5. Оптимизации безопасности
- Отключен poweredByHeader
- CSP для SVG изображений
- Preconnect для внешних доменов
- DNS prefetch для быстрой загрузки

### 6. Мониторинг
- Core Web Vitals tracking
- Page load time monitoring
- Critical resource preloading
- Lazy loading для некритических ресурсов

## После деплоя

### 1. Проверить
- [ ] Скорость загрузки главной страницы
- [ ] Работу анимаций
- [ ] Загрузку кейсов из Sanity
- [ ] Отзывчивость на мобильных устройствах
- [ ] SEO meta tags
- [ ] Форму обратной связи

### 2. Тестирование производительности
```bash
# Google PageSpeed Insights
# GTmetrix
# WebPageTest
# Lighthouse audit
```

### 3. Настройки домена
- DNS записи
- SSL сертификат
- CDN настройки (если используется)

## Рекомендации для продакшена

1. **Sanity Studio**: Разместить на отдельном поддомене (admin.your-domain.com)
2. **Мониторинг**: Подключить Google Analytics или другую аналитику
3. **Резервные копии**: Настроить автоматическое резервное копирование Sanity
4. **Уведомления**: Настроить webhooks для обновления контента

## Optimized файлы

- `next.config.js` - bundle optimization, image optimization
- `src/lib/sanity.ts` - кеширование, CDN
- `src/lib/performance.ts` - performance utilities
- `src/app/layout.tsx` - SEO, preloading, monitoring
- `src/components/LoadingScreen.tsx` - минимизированный дизайн
- `src/components/Hero.tsx` - исправленные анимации
- `src/components/Navbar.tsx` - оптимизированный логотип

## Структура проекта оптимизирована для:
- Быстрой загрузки (< 3 секунды)
- Хорошего SEO рейтинга
- Мобильной отзывчивости
- Стабильной работы CMS
- Простого деплоя и обновления 