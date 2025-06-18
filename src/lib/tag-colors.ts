import { designTokens } from './design-tokens'

// Tag color mapping based on your screenshots
export const tagColors = {
  'ux-ui-design': {
    background: designTokens.colors.green,
    text: designTokens.colors.black,
  },
  'experiment': {
    background: designTokens.colors.dun,
    text: designTokens.colors.black,
  },
  'motion-design': {
    background: designTokens.colors.blue,
    text: designTokens.colors.black,
  },
  'full-cycle': {
    background: designTokens.colors.pink,
    text: designTokens.colors.black,
  },
  'ai': {
    background: designTokens.colors.lightGreen,
    text: designTokens.colors.black,
  },
  'product-systems': {
    background: designTokens.colors.beige,
    text: designTokens.colors.black,
  },
} as const

// Helper function to get tag colors
export function getTagColors(tagValue: string) {
  return tagColors[tagValue as keyof typeof tagColors] || {
    background: designTokens.colors.grey100,
    text: designTokens.colors.black,
  }
}

// Helper function to get readable tag title
export function getTagTitle(tagValue: string): string {
  const tagTitles = {
    'ux-ui-design': 'UX/UI Design',
    'experiment': 'Experiment',
    'motion-design': 'Motion Design',
    'full-cycle': 'Full Cycle',
    'ai': 'AI',
    'product-systems': 'Product Systems',
  }
  
  return tagTitles[tagValue as keyof typeof tagTitles] || tagValue
} 