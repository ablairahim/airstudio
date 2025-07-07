// AirStudio Design Tokens - Custom System
// Centralized design system configuration

export const designTokens = {
  // Spacing Scale (converted to rem)
  spacing: {
    xxs: '0.25rem',    // 4px
    xs: '0.5rem',      // 8px
    s: '0.75rem',      // 12px
    m: '1rem',         // 16px
    l: '1.5rem',       // 24px
    xl: '2.25rem',     // 36px
    xxl: '2.5rem',     // 40px
    huge: '3.125rem',  // 50px (+40% от xl)
    xxxl: '5rem',      // 80px
  },
  
  // Color Palette
  colors: {
    green: '#E5F902',
    dun: '#CFBFAC',
    blue: '#C7EEFF',
    pink: '#FBE5FC',
    lightGreen: '#D2FFD2',
    beige: '#FFE5D2',
    white: '#FFFFFF',
    grey50: '#FAFAFA',
    grey100: '#F1F3F4',
    grey500: '#BFC9CA',
    grey800: '#202222',
    black: '#000000',
  },
  
  // Typography Styles
  textStyles: {
    h1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,         // Medium
      fontSize: '2.5rem',      // 40px
      letterSpacing: '-0.03em', // -3%
      lineHeight: '1.1',       // 110%
    },
    h2: {
      fontFamily: 'var(--font-funnel-display), sans-serif',
      fontWeight: 400,
      fontSize: '1.625rem',    // 26px
      letterSpacing: '-0.03em', // Увеличено межбуквенное расстояние на 2%
      lineHeight: '1.1',       // 110%
    },
    h3: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',    // 18px
      letterSpacing: '-0.03em', // -3%
      lineHeight: '1.25rem',   // 20px
    },
    paragraph: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',      // 24px
      letterSpacing: '-0.03em', // -3%
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,         // Medium
      fontSize: '1rem',        // 16px
      letterSpacing: '-0.01em', // Стандартное межбуквенное расстояние
      lineHeight: '1.25',      // 20px (16px * 1.25)
    },
    tagLink: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',    // 18px
      letterSpacing: '-0.03em', // -3%
    },
    tag: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '0.75rem',     // 12px
      letterSpacing: '-0.03em', // -3%
    },
    prompt: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',        // 16px
      letterSpacing: '-0.03em', // -3%
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',    // 18px
      letterSpacing: '-0.03em', // -3%
    },
    
    // Стили для модальных окон кейсов
    modalCaseTitle: {
      fontFamily: 'var(--font-funnel-display), sans-serif',
      fontWeight: 600,         // Жирный  
      fontSize: '2.5rem',      // 40px
      letterSpacing: '-0.03em', // Как у h2
      lineHeight: '1.1',       // 44px межстрочного для 40px шрифта
    },
    modalCaseHeading: {
      fontFamily: 'var(--font-funnel-display), sans-serif',
      fontWeight: 600,         // Жирный
      fontSize: '1.5rem',      // 24px
      letterSpacing: '-0.03em', // Как у h2
      lineHeight: '1.25',      // 30px line-height для 24px шрифта
    },
    modalCaseText: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,         // Medium
      fontSize: '1.25rem',     // 20px
      letterSpacing: '-0.02em',
      lineHeight: '1.5',       // 30px line-height для 20px шрифта
    },
    modalCaseTextCompact: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,         // Medium
      fontSize: '1.25rem',     // 20px
      letterSpacing: '-0.02em',
      lineHeight: '1.6',       // 32px line-height для 20px шрифта
    },
    // Стиль approach для text section в модалке  
    modalApproachText: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,         // Regular
      fontSize: '1.125rem',    // 18px
      letterSpacing: '-0.03em', // -3%
      lineHeight: '1.11',      // 20px line-height для 18px шрифта (20/18 = 1.11)
    },
  },

  // Mobile Typography Styles (для экранов ≤768px)
  mobileTextStyles: {
    h1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,         // Medium
      fontSize: '2.5rem',      // 40px (остается тот же)
      letterSpacing: '-0.03em', // -3%
      lineHeight: '1.1',       // 110%
    },
    h2: {
      fontFamily: 'var(--font-funnel-display), sans-serif',
      fontWeight: 400,
      fontSize: '1.25rem',     // 20px
      letterSpacing: '-0.03em', // Увеличено межбуквенное расстояние на 2%
      lineHeight: '1.1',       // 110%
    },
    h3: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',    // 18px (остается тот же)
      letterSpacing: '-0.03em', // -3%
      lineHeight: '1.25rem',   // 20px
    },
    
    // Мобильные стили для модальных окон кейсов
    modalCaseTitle: {
      fontFamily: 'var(--font-funnel-display), sans-serif',
      fontWeight: 600,         // Жирный
      fontSize: '2rem',        // 32px для мобильных
      letterSpacing: '-0.03em', // Как у h2
      lineHeight: '1.125',     // 36px межстрочного для 32px шрифта
    },
    modalCaseHeading: {
      fontFamily: 'var(--font-funnel-display), sans-serif',
      fontWeight: 600,         // Жирный
      fontSize: '1.375rem',    // 22px для мобильных
      letterSpacing: '-0.03em', // Как у h2
      lineHeight: '1.36',      // 30px line-height для 22px шрифта
    },
    modalCaseText: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,         // Medium
      fontSize: '1.25rem',     // 20px
      letterSpacing: '-0.02em',
      lineHeight: '1.5',       // 30px line-height для 20px шрифта
    },
    modalCaseTextCompact: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,         // Medium
      fontSize: '1.25rem',     // 20px
      letterSpacing: '-0.02em',
      lineHeight: '1.6',       // 32px line-height для 20px шрифта
    },
    // Мобильный стиль approach для text section в модалке  
    modalApproachText: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,         // Regular
      fontSize: '1.125rem',    // 18px (остается тот же на мобилке)
      letterSpacing: '-0.03em', // -3%
      lineHeight: '1.11',      // 20px line-height для 18px шрифта
    },
  },

  // Breakpoints
  breakpoints: {
    mobile: '768px',
  },
} as const

// Type definitions
export type DesignTokens = typeof designTokens
export type ColorName = keyof typeof designTokens.colors
export type SpacingSize = keyof typeof designTokens.spacing
export type TextStyle = keyof typeof designTokens.textStyles
export type MobileTextStyle = keyof typeof designTokens.mobileTextStyles 