import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

// Кешируем на 1 час в продакшене, в разработке не кешируем
export const revalidate = 3600

export async function GET() {
  try {
    const query = `
      *[_type == "caseStudy"] | order(order desc) {
        _id,
        title,
        summary,
        slug,
        tags,
        order,
        cover {
          asset-> {
            url
          },
          alt
        },
        coverVideo {
          asset-> {
            url
          }
        },
        "metrics": content[_type == "metricsCallout"][0].metrics[0..2],
        _updatedAt
      }
    `;
    
    const caseStudies = await client.fetch(query);
    
    return NextResponse.json({
      success: true,
      data: Array.isArray(caseStudies) ? caseStudies : []
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error)
    }
    
    // Возвращаем тестовые данные при ошибке
    return NextResponse.json({
      success: false,
      data: [{
        _id: 'test-case-api',
        title: 'Test Case Study (API)',
        summary: 'This is a test case study loaded via API',
        slug: { current: 'test-case-api' },
        tags: ['ux-ui-design', 'experiment'],
        order: 1,
        cover: undefined,
        metrics: [
          { value: '+30%', label: 'Retention' },
          { value: '2x', label: 'Engagement' }
        ]
      }]
    })
  }
} 