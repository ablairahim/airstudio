import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
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
  link?: {
    text: string
    url: string
  }
  facts?: {
    client?: string
    year?: string
    role?: string
  }
  loomEmbed?: string
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
      heading: string
      text: string
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

// Helper functions for fetching data
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return client.fetch(`
    *[_type == "caseStudy"] | order(_createdAt desc) {
      _id,
      _type,
      slug,
      tags,
      title,
      summary,
      cover,
      facts
    }
  `)
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return client.fetch(`
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
      link,
      facts,
      loomEmbed,
      content[] {
        _type,
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
          text
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
        }
      }
    }
  `, { slug })
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