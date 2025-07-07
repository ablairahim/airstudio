import { ContentBlock } from '../lib/sanity';

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export interface CaseStudy {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  description: string
  summary?: string
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