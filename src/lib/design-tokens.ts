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
    xxxl: '5rem',      // 80px
  },
  
  // Border Radius
  corners: {
    s: '0.5rem',       // 8px
    l: '1.25rem',      // 20px
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
    grey100: '#F1F3F4',
    grey500: '#BFC9CA',
    grey800: '#202222',
    black: '#000000',
  },
  
  // Typography Styles
  textStyles: {
    h1: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 500,
      fontSize: '3rem',        // 48px
      letterSpacing: '-0.05em',
    },
    h2: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 500,
      fontSize: '2.25rem',     // 36px
      letterSpacing: '-0.04em',
    },
    h3: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',      // 24px
      letterSpacing: '-0.04em',
    },
    paragraph: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',      // 24px
      letterSpacing: '-0.04em',
    },
    body1: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',    // 18px
      letterSpacing: '-0.04em',
    },
    tagLink: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',    // 18px
      letterSpacing: '-0.04em',
    },
    tag: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 500,
      fontSize: '1rem',        // 16px
      letterSpacing: '-0.04em',
    },
    prompt: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',        // 16px
      letterSpacing: '-0.04em',
    },
    button: {
      fontFamily: 'Manrope, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',    // 18px
      letterSpacing: '-0.07em',
    },
  },
} as const

// Type definitions
export type DesignTokens = typeof designTokens
export type ColorName = keyof typeof designTokens.colors
export type SpacingSize = keyof typeof designTokens.spacing
export type TextStyle = keyof typeof designTokens.textStyles 