import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production', // CDN только в продакшене
  apiVersion: '2024-12-19',
  perspective: 'published',
  // Добавляем настройки для оптимизации
  ignoreBrowserTokenWarning: true,
  // Оптимизируем запросы
  withCredentials: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source).auto('format').quality(85) // Оптимизация изображений
}

// Type definitions for our schemas
export interface CaseStudy {
  _id: string
  _type: 'caseStudy'
  slug: {
    current: string
  }
  tags: string[]
  title: string
  summary?: string
  order: number
  cover?: {
    asset: {
      url: string
    }
    alt?: string
  }
  coverVideo?: {
    asset: {
      url: string
    }
  }
  content?: ContentBlock[]
}

export interface Callout {
  _id: string
  _type: 'callout'
  type: 'metrics' | 'prompt' | 'quote' | 'testimonial'
  title: string
  content: {
    metricValue?: string
    metricLabel?: string
    text?: string
    author?: string
    authorTitle?: string
  }
  metrics?: Array<{
    value: string
    label: string
  }>
}

export type ContentBlock = 
  | {
      _type: 'linkBlock'
      text: string
      url: string
    }
  | {
      _type: 'factsBlock'
      client?: string
      year?: string
      role?: string
    }
  | {
      _type: 'loomBlock'
      url: string
    }
  | {
      _type: 'metricsCallout'
      title?: string
      metrics: Array<{
        value: string
        label: string
      }>
    }
  | {
      _type: 'promptCallout'
      title?: string
      text: string
    }
  | {
      _type: 'quoteCallout'
      title?: string
      text: string
      author?: string
      authorTitle?: string
    }
  | {
      _type: 'testimonialCallout'
      title?: string
      text: string
      author?: string
      authorTitle?: string
    }
  | {
      _type: 'textSection'
      heading?: string
      text?: any[] // PortableText block content
    }
  | {
      _type: 'paragraphBlock'
      text?: any[] // PortableText block content
    }
  | {
      _type: 'imageBlock'
      image: {
        asset: {
          url: string
        }
        alt?: string
      }
    }
  | {
      _type: 'videoBlock'
      video?: {
        asset: {
          url: string
        }
      }
      alt?: string
      poster?: {
        asset: {
          url: string
        }
        alt?: string
      }
    }
  | {
      _type: 'blurredImageBlock'
      image: {
        asset: {
          url: string
        }
        alt?: string
      }
      tooltipText?: string
    }

// Helper functions for fetching data
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const query = `
      *[_type == "caseStudy"] | order(order desc) {
        _id,
        _type,
        slug,
        tags,
        title,
        summary,
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
        }
      }
    `
    
    const result = await client.fetch(query, {}, {
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-cache',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 0, // 5 минут кеш в продакшене
        tags: ['case-studies']
      }
    })
    
    // Убеждаемся что возвращаем массив, даже если результат null или undefined
    return Array.isArray(result) ? result : []
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching case studies:', error)
    }
    return []
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const query = `
      *[_type == "caseStudy" && slug.current == $slug][0] {
        _id,
        _type,
        slug,
        tags,
        title,
        summary,
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
        content[] {
          _type,
          // For linkBlock  
          _type == "linkBlock" => {
            _type,
            text,
            url
          },
          // For factsBlock
          _type == "factsBlock" => {
            _type,
            client,
            year,
            role
          },
          // For loomBlock
          _type == "loomBlock" => {
            _type,
            url
          },
          // For metricsCallout
          _type == "metricsCallout" => {
            _type,
            title,
            metrics
          },
          // For text callouts
          _type in ["promptCallout", "quoteCallout", "testimonialCallout"] => {
            _type,
            title,
            text,
            author,
            authorTitle
          },
          // For text sections
          _type == "textSection" => {
            _type,
            heading,
            text[] {
              ...,
              _type == "block" => {
                ...,
                children[] {
                  ...,
                  _type == "span" => {
                    ...,
                    marks[@ != null] {
                      ...,
                      _type == "link" => {
                        ...,
                        _key,
                        href
                      }
                    }
                  }
                }
              }
            }
          },
          // For paragraph blocks
          _type == "paragraphBlock" => {
            _type,
            text[] {
              ...,
              _type == "block" => {
                ...,
                children[] {
                  ...,
                  _type == "span" => {
                    ...,
                    marks[@ != null] {
                      ...,
                      _type == "link" => {
                        ...,
                        _key,
                        href
                      }
                    }
                  }
                }
              }
            }
          },
          // For images
          _type == "imageBlock" => {
            _type,
            image {
              asset-> {
                url
              },
              alt
            }
          },
          // For videos
          _type == "videoBlock" => {
            _type,
            video {
              asset-> {
                url
              }
            },
            alt,
            poster {
              asset-> {
                url
              },
              alt
            }
          },
          // For blurred images
          _type == "blurredImageBlock" => {
            _type,
            image {
              asset-> {
                url
              },
              alt
            },
            tooltipText
          }
        }
      }
    `
    
    const result = await client.fetch(query, { slug }, { 
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-cache',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 0, // 5 минут кеш в продакшене
        tags: ['case-study', `case-study-${slug}`]
      }
    })
    
    return result || null
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching case study by slug:', error)
    }
    return null
  }
}

export async function getCallout(id: string): Promise<Callout | null> {
  return client.fetch(`
    *[_type == "callout" && _id == $id][0] {
      _id,
      _type,
      type,
      title,
      content,
      metrics
    }
  `, { id })
} 