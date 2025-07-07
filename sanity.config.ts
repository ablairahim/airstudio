import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import all schemas from the schemas directory
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'airstudio',
  title: 'AirStudio Portfolio',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-19',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio',
  
  // Настройки для исправления WebSocket и patch операций
  studio: {
    components: {
      // Убираем проблемные компоненты если есть
    }
  },
  
  // Исправление для patch операций
  document: {
    // Отключаем real-time collaboration если вызывает проблемы
    unstable_comments: {
      enabled: false,
    },
  },
}) 