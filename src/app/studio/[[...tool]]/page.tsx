/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    // Debug: проверяем переменные среды
    console.log('🔧 Studio Debug:')
    console.log('PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    console.log('DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)
    console.log('Config:', config)
    
    // Проверяем загрузку Studio
    const checkStudio = () => {
      const studioElement = document.querySelector('[data-ui]')
      console.log('Studio element found:', !!studioElement)
      
      if (studioElement) {
        console.log('✅ Studio DOM element loaded')
      } else {
        console.log('❌ Studio DOM element not found')
      }
    }
    
    // Проверяем через 2 секунды
    setTimeout(checkStudio, 2000)
    
    // Проверяем через 5 секунд
    setTimeout(checkStudio, 5000)
  }, [])

  return <NextStudio config={config} />
}
