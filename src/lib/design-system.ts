// Design System Utilities
// Built on top of design tokens for consistent component styling

import { designTokens } from './design-tokens'

// Simple utility function for combining classes (without external dependencies)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Typography Styles as CSS-in-JS objects
export const typography = {
  h1: {
    fontFamily: designTokens.textStyles.h1.fontFamily,
    fontSize: designTokens.textStyles.h1.fontSize,
    fontWeight: designTokens.textStyles.h1.fontWeight,
    letterSpacing: designTokens.textStyles.h1.letterSpacing,
  },
  h2: {
    fontFamily: designTokens.textStyles.h2.fontFamily,
    fontSize: designTokens.textStyles.h2.fontSize,
    fontWeight: designTokens.textStyles.h2.fontWeight,
    letterSpacing: designTokens.textStyles.h2.letterSpacing,
  },
  h3: {
    fontFamily: designTokens.textStyles.h3.fontFamily,
    fontSize: designTokens.textStyles.h3.fontSize,
    fontWeight: designTokens.textStyles.h3.fontWeight,
    letterSpacing: designTokens.textStyles.h3.letterSpacing,
  },
  paragraph: {
    fontFamily: designTokens.textStyles.paragraph.fontFamily,
    fontSize: designTokens.textStyles.paragraph.fontSize,
    fontWeight: designTokens.textStyles.paragraph.fontWeight,
    letterSpacing: designTokens.textStyles.paragraph.letterSpacing,
  },
  body1: {
    fontFamily: designTokens.textStyles.body1.fontFamily,
    fontSize: designTokens.textStyles.body1.fontSize,
    fontWeight: designTokens.textStyles.body1.fontWeight,
    letterSpacing: designTokens.textStyles.body1.letterSpacing,
  },
  tagLink: {
    fontFamily: designTokens.textStyles.tagLink.fontFamily,
    fontSize: designTokens.textStyles.tagLink.fontSize,
    fontWeight: designTokens.textStyles.tagLink.fontWeight,
    letterSpacing: designTokens.textStyles.tagLink.letterSpacing,
  },
  tag: {
    fontFamily: designTokens.textStyles.tag.fontFamily,
    fontSize: designTokens.textStyles.tag.fontSize,
    fontWeight: designTokens.textStyles.tag.fontWeight,
    letterSpacing: designTokens.textStyles.tag.letterSpacing,
  },
  prompt: {
    fontFamily: designTokens.textStyles.prompt.fontFamily,
    fontSize: designTokens.textStyles.prompt.fontSize,
    fontWeight: designTokens.textStyles.prompt.fontWeight,
    letterSpacing: designTokens.textStyles.prompt.letterSpacing,
  },
  button: {
    fontFamily: designTokens.textStyles.button.fontFamily,
    fontSize: designTokens.textStyles.button.fontSize,
    fontWeight: designTokens.textStyles.button.fontWeight,
    letterSpacing: designTokens.textStyles.button.letterSpacing,
  },
} as const

// Button Variants as CSS-in-JS objects
export const buttonVariants = {
  primary: {
    backgroundColor: designTokens.colors.green,
    color: designTokens.colors.black,
    padding: `${designTokens.spacing.s} ${designTokens.spacing.l}`,
    border: 'none',
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
    fontFamily: designTokens.textStyles.button.fontFamily,
    fontSize: designTokens.textStyles.button.fontSize,
    fontWeight: designTokens.textStyles.button.fontWeight,
    letterSpacing: designTokens.textStyles.button.letterSpacing,
  },
  secondary: {
    backgroundColor: designTokens.colors.dun,
    color: designTokens.colors.black,
    padding: `${designTokens.spacing.s} ${designTokens.spacing.l}`,
    border: 'none',
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
    fontFamily: designTokens.textStyles.button.fontFamily,
    fontSize: designTokens.textStyles.button.fontSize,
    fontWeight: designTokens.textStyles.button.fontWeight,
    letterSpacing: designTokens.textStyles.button.letterSpacing,
  },
  outline: {
    backgroundColor: 'transparent',
    color: designTokens.colors.grey800,
    padding: `${designTokens.spacing.s} ${designTokens.spacing.l}`,
    border: `2px solid ${designTokens.colors.grey500}`,
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
    fontFamily: designTokens.textStyles.button.fontFamily,
    fontSize: designTokens.textStyles.button.fontSize,
    fontWeight: designTokens.textStyles.button.fontWeight,
    letterSpacing: designTokens.textStyles.button.letterSpacing,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: designTokens.colors.grey800,
    padding: `${designTokens.spacing.s} ${designTokens.spacing.l}`,
    border: 'none',
    cursor: 'pointer' as const,
    transition: 'all 0.2s ease',
    fontFamily: designTokens.textStyles.button.fontFamily,
    fontSize: designTokens.textStyles.button.fontSize,
    fontWeight: designTokens.textStyles.button.fontWeight,
    letterSpacing: designTokens.textStyles.button.letterSpacing,
  },
} as const

// Layout helpers
export const layout = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${designTokens.spacing.l}`,
  },
  section: {
    padding: `${designTokens.spacing.xxxl} 0`,
  },
  card: {
    backgroundColor: designTokens.colors.white,
    padding: designTokens.spacing.l,
    
  },
  modal: {
    backgroundColor: designTokens.colors.white,
    padding: designTokens.spacing.l,
    
  },
} as const

// Export individual design tokens for convenience
export const colors = designTokens.colors
export const spacing = designTokens.spacing
export const textStyles = designTokens.textStyles

// Color Utilities
export const colorUtils = {
  primary: designTokens.colors.green,
  secondary: designTokens.colors.dun,
  accent: designTokens.colors.blue,
  neutral: designTokens.colors.grey500,
  text: designTokens.colors.black,
  textLight: designTokens.colors.grey800,
  background: designTokens.colors.white,
  surface: designTokens.colors.grey100,
} as const

// Spacing Utilities
export const spacingUtils = designTokens.spacing

// Animation utilities
export const animations = {
  fadeIn: 'animate-in fade-in duration-slow',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-normal',
  slideDown: 'animate-in slide-in-from-top-4 duration-normal',
  slideLeft: 'animate-in slide-in-from-right-4 duration-normal',
  slideRight: 'animate-in slide-in-from-left-4 duration-normal',
  scale: 'animate-in zoom-in-95 duration-normal',
}

// Responsive utilities
export const responsive = {
  show: {
    mobile: 'block md:hidden',
    tablet: 'hidden md:block lg:hidden',
    desktop: 'hidden lg:block',
  },
  hide: {
    mobile: 'hidden md:block',
    tablet: 'block md:hidden lg:block',
    desktop: 'block lg:hidden',
  },
}

// Helper function to create consistent component styles
export function createComponentStyles(baseStyles: string, variants: Record<string, string>) {
  return function(variant: string = 'default', additionalClasses?: string) {
    const variantStyles = variants[variant] || variants.default
    return cn(baseStyles, variantStyles, additionalClasses)
  }
}

// Design System Configuration
export const designSystem = {
  // ... existing design system ...
}

// Global settings for performance
export const siteSettings = {
  // Set to false to freeze cover videos on main page (WorkSection)
  // Change to true to enable autoplay for cover videos
  ENABLE_COVER_VIDEO_AUTOPLAY: true,
  
  // Set to false to freeze all content videos inside case studies
  // Change to true to enable autoplay for content videos
  ENABLE_CONTENT_VIDEO_AUTOPLAY: true,
} as const 