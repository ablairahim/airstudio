/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Ensure all primary colors are generated
    'text-primary-50',
    'text-primary-100',
    'text-primary-200',
    'text-primary-300',
    'text-primary-400',
    'text-primary-500',
    'text-primary-600',
    'text-primary-700',
    'text-primary-800',
    'text-primary-900',
    'text-primary-950',
    'bg-primary-50',
    'bg-primary-100',
    'bg-primary-200',
    'bg-primary-300',
    'bg-primary-400',
    'bg-primary-500',
    'bg-primary-600',
    'bg-primary-700',
    'bg-primary-800',
    'bg-primary-900',
    'bg-primary-950',
  ],
  theme: {
    extend: {
      // Custom Colors
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
      
      // Custom Spacing
      spacing: {
        'xxs': '0.25rem',    // 4px
        'xs': '0.5rem',      // 8px
        's': '0.75rem',      // 12px
        'm': '1rem',         // 16px
        'l': '1.5rem',       // 24px
        'xl': '2.25rem',     // 36px
        'xxl': '2.5rem',     // 40px
        'xxxl': '5rem',      // 80px
      },
      
      // Custom Border Radius
      borderRadius: {
        's': '0.5rem',       // 8px
        'l': '1.25rem',      // 20px
      },
      
      // Typography
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      
      fontSize: {
        'h1': ['3rem', { letterSpacing: '-0.05em', fontWeight: '500' }],        // 48px
        'h2': ['2.25rem', { letterSpacing: '-0.04em', fontWeight: '500' }],     // 36px
        'h3': ['1.5rem', { letterSpacing: '-0.04em', fontWeight: '600' }],      // 24px
        'paragraph': ['1.5rem', { letterSpacing: '-0.04em', fontWeight: '500' }], // 24px
        'body1': ['1.125rem', { letterSpacing: '-0.04em', fontWeight: '500' }], // 18px
        'tagLink': ['1.125rem', { letterSpacing: '-0.04em', fontWeight: '500' }], // 18px
        'tag': ['1rem', { letterSpacing: '-0.04em', fontWeight: '500' }],        // 16px
        'prompt': ['1rem', { letterSpacing: '-0.04em', fontWeight: '400' }],     // 16px
        'button': ['1.125rem', { letterSpacing: '-0.07em', fontWeight: '500' }], // 18px
      },
      
      // Animation durations
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      
      // Z-index
      zIndex: {
        hide: '-1',
        auto: 'auto',
        base: '0',
        docked: '10',
        dropdown: '1000',
        sticky: '1100',
        banner: '1200',
        overlay: '1300',
        modal: '1400',
        popover: '1500',
        skipLink: '1600',
        toast: '1700',
        tooltip: '1800',
      },
    },
  },
  plugins: [],
} 