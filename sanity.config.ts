import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas directly
import { caseStudy } from './sanity/schemas/caseStudy'

export default defineConfig({
  name: 'airstudio',
  title: 'AirStudio Portfolio',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: [caseStudy],
  },
  
  basePath: '/studio',
  
  // Улучшенные настройки для Next.js 15
  studioHost: 'localhost',
  
  // Настройки для предотвращения проблем с SSR
  unstable_useConfiguredBrowserWebSocket: false,
}) 