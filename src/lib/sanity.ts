import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-12-19',
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
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
  cover?: {
    asset: {
      url: string
    }
    alt?: string
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

// Helper functions for fetching data
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const query = `
      *[_type == "caseStudy"] | order(_createdAt desc) {
        _id,
        _type,
        slug,
        tags,
        title,
        summary,
        cover
      }
    `
    
    const result = await client.fetch(query, {}, {
      cache: 'no-cache',
      next: { revalidate: 0 }
    })
    
    // Убеждаемся что возвращаем массив, даже если результат null или undefined
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.error('Error fetching case studies:', error)
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
        cover {
          asset-> {
            url
          },
          alt
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
          }
        }
      }
    `
    
    const result = await client.fetch(query, { slug }, { 
      cache: 'no-cache',
      next: { revalidate: 0 }
    })
    
    return result || null
  } catch (error) {
    console.error('Error fetching case study by slug:', error)
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