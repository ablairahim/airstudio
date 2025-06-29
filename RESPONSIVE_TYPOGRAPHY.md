# Responsive Typography System

Создана система responsive типографики для мобильных и десктопных устройств.

## Размеры шрифтов

### Desktop (>768px)
- **H1:** 40px (2.5rem) - Inter
- **H2:** 26px (1.625rem) - **Funnel Display**
- **H3:** 18px (1.125rem) - Inter

### Mobile (≤768px)
- **H1:** 40px (2.5rem) - Inter (остается тот же)
- **H2:** 20px (1.25rem) - **Funnel Display** (уменьшается)
- **H3:** 18px (1.125rem) - Inter (остается тот же)

## Способы использования

### 1. Через JavaScript функцию (с state)
```tsx
import { getResponsiveTextStyle } from '@/lib/responsive-text';

// В компоненте с state для размера экрана
const [isLargeScreen, setIsLargeScreen] = useState(false);

<h2 style={{
  ...getResponsiveTextStyle('h2', !isLargeScreen),
  color: designTokens.colors.black,
  margin: 0,
}}>
  Responsive заголовок
</h2>
```

### 2. Через CSS классы (рекомендуется)
```tsx
// Более простой способ
<h1 className="responsive-h1 text-black">
  Заголовок H1
</h1>

<h2 className="responsive-h2 text-black">
  Заголовок H2
</h2>

<h3 className="responsive-h3 text-black semibold">
  Заголовок H3
</h3>
```

### 3. Доступные CSS классы
- `.responsive-h1` - H1 с responsive размерами
- `.responsive-h2` - H2 с responsive размерами  
- `.responsive-h3` - H3 с responsive размерами
- `.text-black` - черный цвет
- `.text-grey800` - темно-серый цвет
- `.semibold` - font-weight: 600

## Брейкпоинт
- **Mobile:** ≤768px
- **Desktop:** >768px

## Шрифты
- **Inter** - основной шрифт (H1, H3, все остальное)
- **Funnel Display** - акцентный шрифт только для H2

## Файлы системы
- `src/lib/design-tokens.ts` - основные и мобильные токены
- `src/lib/responsive-text.ts` - JavaScript утилиты
- `src/styles/responsive-typography.css` - CSS классы
- `src/app/layout.tsx` - импорт шрифтов и CSS 