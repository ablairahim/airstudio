# Sanity CMS Setup for AirStudio

## Быстрый старт

### 1. Создание Sanity проекта

```bash
# Инициализация нового Sanity проекта
npx sanity init

# Или если хотите создать проект через веб-интерфейс
# Перейдите на https://sanity.io и создайте новый проект
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=xv7dh6hn  # Ваш проект ID из Sanity
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

**Важно:** Замените `xv7dh6hn` на ваш реальный project ID из Sanity Dashboard.

### 3. Запуск Sanity Studio

У вас есть два способа управления контентом:

**Вариант 1: Встроенная студия**
```bash
# Запуск Next.js приложения
npm run dev

# Студия будет доступна на http://localhost:3000/studio
```

**Вариант 2: Отдельная студия**
```bash
# Запуск отдельной студии
npm run sanity

# Студия будет доступна на http://localhost:3333
```

## Структура данных

### Case Study (Кейс)

Основная схема для кейсов содержит:

- **Slug** - URL-адрес кейса
- **Tags** - до 6 тегов с предустановленными цветами:
  - UX/UI Design (зеленый)
  - Experiment (бежевый) 
  - Motion Design (голубой)
  - Full Cycle (розовый)
  - AI (светло-зеленый)
  - Product Systems (персиковый)
- **Title** - заголовок H2
- **Summary** - описание
- **Cover** - обложка для секции Work (не показывается в slug)
- **Link** - кнопка со стрелкой
- **Facts** - Client, Year, Role
- **Loom Embed** - ссылка на видео
- **Content** - гибкие блоки контента

### Callouts (Выноски)

4 типа callouts:

1. **Metrics** - метрики с зеленым фоном
   - Поддерживает до 3 метрик в одном ряду
   - Большие цифры + описание

2. **Prompt** - подсказки с иконкой лампочки
   - Серый фон, белый текст

3. **Quote** - цитаты с иконкой сообщения
   - Серый фон, автор + должность

4. **Testimonial** - отзывы с иконкой человека
   - Серый фон, автор + должность

### Гибкие блоки контента

- **Text Section** - H1 заголовок + текст
- **Image Block** - изображения 16:9
- **Callout Reference** - ссылки на созданные callouts

## Использование в коде

```typescript
// Получение всех кейсов
import { getAllCaseStudies } from '@/lib/sanity'

const caseStudies = await getAllCaseStudies()

// Получение конкретного кейса
import { getCaseStudyBySlug } from '@/lib/sanity'

const caseStudy = await getCaseStudyBySlug('my-case-slug')

// Работа с тегами
import { getTagColors, getTagTitle } from '@/lib/tag-colors'

const colors = getTagColors('ux-ui-design')
const title = getTagTitle('ux-ui-design')
```

## Следующие шаги

1. Создайте Sanity проект
2. Обновите переменные окружения
3. Запустите `npm run sanity`
4. Создайте первый кейс в студии
5. Интегрируйте данные в компоненты Next.js 