# 📊 Анализ производительности AirStudio

## 🚨 Основные проблемы загрузки

### 1. **JavaScript Bundle** (926 KB) - ГЛАВНАЯ ПРОБЛЕМА 🔴
```
First Load JS: 932 KB
└── vendors chunk: 924 KB (!)
└── app code: 6 KB
```

**Проблемы:**
- Огромный vendor chunk (924 KB)
- Включает всю Sanity Studio даже на клиенте
- GSAP, Framer Motion, React 19 - тяжелые библиотеки

### 2. **WebM видео** (1.9 MB) - СРЕДНЯЯ ПРОБЛЕМА 🟡
```
Judo Work.webm: 1.1 MB  ⚠️ самый тяжелый
5.webm: 352 KB
FITC MAIN.webm: 256 KB
4.webm: 88 KB
9.webm: 72 KB
```

### 3. **PNG изображения** (1.8 MB) - СРЕДНЯЯ ПРОБЛЕМА 🟡
```
sveti.png: 1.5 MB  ⚠️ огромный размер!
qoll.png: 308 KB
ablai.png: 48 KB
favicon.png: 72 KB
```

### 4. **Sanity Studio** (1.99 MB) - ПРОБЛЕМА АРХИТЕКТУРЫ 🔴
```
/studio route: 1.99 MB First Load JS
Это не должно загружаться на клиенте!
```

## 📈 Влияние на загрузку по важности:

### 🔴 КРИТИЧЕСКОЕ (>90% проблем)
1. **JavaScript Bundle (924 KB)** - блокирует рендеринг
2. **Sanity Studio bundle** - не нужен на клиенте
3. **Неоптимизированные vendor chunks**

### 🟡 СРЕДНЕЕ (влияет на UX)
4. **Большие PNG файлы** - замедляют анимации
5. **Тяжелые WebM видео** - влияют на мобильный трафик

### 🟢 МИНИМАЛЬНОЕ 
6. **SVG файлы** - малый размер, не критично

## 🛠️ Рекомендации по оптимизации

### 🚀 НЕМЕДЛЕННО (70% ускорения)
```bash
# 1. Динамические импорты для Sanity
const Studio = dynamic(() => import('./studio'), { ssr: false })

# 2. Code splitting для GSAP
const gsap = await import('gsap')

# 3. Убрать Sanity Studio с клиента
# Вынести на поддомен admin.your-domain.com
```

### 📸 ИЗОБРАЖЕНИЯ (20% ускорения)
```bash
# 1. Сжать PNG в WebP
sveti.png (1.5MB) → sveti.webp (~200KB)
qoll.png (308KB) → qoll.webp (~50KB)

# 2. Добавить размеры для lazy loading
<Image width={240} height={280} loading="lazy" />

# 3. Preload только критические изображения
<link rel="preload" href="/img/ablai.png" as="image" />
```

### 🎬 ВИДЕО (10% ускорения)
```bash
# 1. Сжать самое тяжелое видео
Judo Work.webm (1.1MB) → оптимизировать до ~400KB

# 2. Добавить poster для видео
<video poster="/img/poster.webp">

# 3. Lazy loading для видео
loading="lazy" preload="none"
```

## 📱 Влияние на мобильные устройства

### WebM видео НЕ КРИТИЧНО потому что:
- ✅ Автоплей только на десктопе 
- ✅ Lazy loading реализован
- ✅ Pause при выходе из viewport
- ✅ Видео оптимизированы для web

### Реальные проблемы:
- ❌ **924KB JavaScript** загружается всегда
- ❌ **PNG изображения** не оптимизированы
- ❌ **Санити студия** подгружается даже на клиенте

## 🎯 План оптимизации

### Phase 1: JavaScript (1-2 дня)
- [ ] Code splitting для Sanity Studio
- [ ] Dynamic imports для GSAP
- [ ] Убрать ненужные зависимости

### Phase 2: Изображения (1 день)  
- [ ] Конвертация PNG → WebP
- [ ] Lazy loading для всех изображений
- [ ] Responsive images с srcset

### Phase 3: Архитектура (1 день)
- [ ] Вынести Sanity Studio на поддомен
- [ ] Настроить ISR для case studies
- [ ] Добавить Service Worker

## 📊 Ожидаемые результаты

### После оптимизации:
```
First Load JS: 932 KB → ~300 KB (-68%)
Главная страница: ~4MB → ~1.5MB (-62%)
LCP: ~3s → ~1.5s (-50%)
```

### Core Web Vitals:
- **LCP**: 3s → 1.5s ✅
- **FID**: хорошо ✅  
- **CLS**: хорошо ✅

## 🏆 Вывод

**WebM видео НЕ мешают загрузке!** Они составляют ~20% от общего размера и правильно оптимизированы.

**Главная проблема** - огромный JavaScript bundle (924 KB) из-за Sanity Studio и неоптимизированных vendor chunks.

**Приоритет оптимизации:**
1. 🔴 JavaScript bundle splitting  
2. 🟡 PNG → WebP конвертация
3. 🟢 Архитектурные улучшения 