# AirStudio Design System

Централизованная система дизайн-токенов для консистентного UI/UX.

## 📁 Структура файлов

```
src/lib/
├── design-tokens.ts    # Основные токены (цвета, типографика, отступы)
├── design-system.ts    # Утилиты и готовые стили компонентов
└── utils.ts           # Хелперы (cn функция)

src/components/ui/     # UI компоненты с дизайн-токенами
tailwind.config.js     # Интеграция токенов в Tailwind
src/app/globals.css    # CSS переменные из токенов
```

## 🎨 Использование цветов

### В компонентах:
```tsx
import { getColor } from '@/lib/design-system'

// Прямое использование
<div className="bg-primary-500 text-white" />

// Через функцию
const primaryColor = getColor('primary', 500)
```

### Доступные цвета:
- `primary-{50-950}` - Основной бренд (синий)
- `secondary-{50-950}` - Нейтральные (серые)
- `accent-{orange|green|red|purple|yellow}` - Акцентные
- `success`, `warning`, `error`, `info` - Семантические

## ✍️ Типографика

### Готовые стили:
```tsx
import { typography } from '@/lib/design-system'

<h1 className={typography.h1}>Заголовок</h1>
<p className={typography.body}>Основной текст</p>
<span className={typography.caption}>Подпись</span>
```

### Доступные стили:
- `h1, h2, h3, h4, h5, h6` - Заголовки
- `body, bodyLarge, bodySmall` - Основной текст
- `lead, caption, muted` - Специальные стили

## 🔘 Компоненты

### Button:
```tsx
import { Button } from '@/components/ui/button'

<Button variant="primary" size="md">Кнопка</Button>
<Button variant="outline" isLoading>Загрузка</Button>
```

### Варианты:
- `primary, secondary, outline, ghost, link`
- Размеры: `sm, md, lg`

## 📐 Отступы и размеры

### Использование:
```tsx
// Tailwind классы из токенов
<div className="p-md m-lg" />  // padding: 1rem, margin: 1.5rem
<div className="gap-xl" />     // gap: 2rem

// CSS переменные
<div style={{ padding: 'var(--spacing-md)' }} />
```

### Шкала отступов:
- `xs` - 8px
- `sm` - 12px  
- `md` - 16px
- `lg` - 24px
- `xl` - 32px
- `2xl` - 48px
- `3xl` - 64px
- `4xl` - 96px
- `5xl` - 128px

## 🎭 Готовые утилиты

### Layout:
```tsx
import { layout } from '@/lib/design-system'

<div className={layout.container}>Контейнер</div>
<section className={layout.section}>Секция</section>
<div className={layout.grid.cols3}>Сетка 3 колонки</div>
```

### Анимации:
```tsx
import { animations } from '@/lib/design-system'

<div className={animations.fadeIn}>Появление</div>
<div className={animations.slideUp}>Слайд вверх</div>
```

## 🔧 Создание новых компонентов

### Шаблон:
```tsx
import { createComponentStyles } from '@/lib/design-system'
import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-white border border-secondary-200',
  elevated: 'bg-white shadow-md',
}

const getStyles = createComponentStyles('base-styles', variants)

export function MyComponent({ variant = 'default', className, ...props }) {
  return (
    <div 
      className={cn(getStyles(variant), className)}
      {...props}
    />
  )
}
```

## 🎯 Принципы использования

1. **Всегда используй токены** вместо хардкода значений
2. **Импортируй утилиты** из `design-system.ts`
3. **Следуй naming convention** для вариантов компонентов
4. **Используй cn()** для объединения классов
5. **Создавай переиспользуемые** компоненты в `ui/`

## 🚀 Быстрый старт

```tsx
// 1. Импортируй нужные утилиты
import { typography, buttonVariants, layout } from '@/lib/design-system'
import { Button } from '@/components/ui/button'

// 2. Используй в компоненте
export function MySection() {
  return (
    <section className={layout.section}>
      <div className={layout.container}>
        <h2 className={typography.h2}>Заголовок</h2>
        <p className={typography.body}>Описание</p>
        <Button variant="primary">Действие</Button>
      </div>
    </section>
  )
}
```

Теперь весь сайт будет следовать единой дизайн-системе! 🎨 