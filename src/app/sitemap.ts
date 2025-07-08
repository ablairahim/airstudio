import { MetadataRoute } from 'next'
import { getAllCaseStudies } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://airstudio.design'
  
  // Получаем все кейсы из Sanity
  const caseStudies = await getAllCaseStudies()
  
  // Основные страницы
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/#work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#footer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Динамические страницы кейсов (если будут)
  const caseStudyRoutes = caseStudies.map((caseStudy) => ({
    url: `${baseUrl}/case-study/${caseStudy.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...caseStudyRoutes]
} 