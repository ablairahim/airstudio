# AirStudio - Рабочая версия ✅

## Что работает:
- ✅ **Загрузка кейс-стади** из Sanity CMS
- ✅ **Модальные окна** для кейсов (открываются под navbar)
- ✅ **Все типы контента**: метрики, промпты, цитаты, отзывы
- ✅ **Теги с цветами** (6 предустановленных цветов)
- ✅ **Изображения** из Sanity CDN
- ✅ **Sanity Studio** на `/studio`
- ✅ **Поддержка Loom видео** (embed)

## Как запустить:
```bash
npm install
npm run dev
```

## Важные файлы:
- `src/components/WorkSection.tsx` - загрузка и отображение кейсов
- `src/components/CaseStudyModal.tsx` - модальное окно кейса
- `src/contexts/ModalContext.tsx` - управление модалами
- `sanity/schemas/caseStudy.ts` - схема данных
- `next.config.js` - конфигурация изображений

## Sanity CMS:
- URL: `http://localhost:3000/studio`
- Проект ID: `hti0yt93`
- Dataset: `production`

## Loom видео:
Чтобы добавить настоящее видео в Hero:
1. Получите embed-ссылку: `https://www.loom.com/embed/VIDEO_ID`
2. В `src/components/Hero.tsx` замените:
   ```typescript
   const loomEmbedUrl = "https://www.loom.com/embed/YOUR_VIDEO_ID";
   const showRealVideo = true;
   ```

## Бэкапы:
- Архив: `../airstudio-backup-YYYYMMDD-HHMMSS.tar.gz`
- Git коммит: `37a2af2` - "✅ WORKING VERSION"

---
**Дата бэкапа**: 18 июня 2025, 11:57
**Статус**: Полностью рабочая версия 🎉 