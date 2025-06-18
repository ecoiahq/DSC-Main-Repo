export interface Article {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string
  url: string
  sportTags?: string[]
}

export interface VideoContent {
  id: number
  title: string
  description: string
  image: string
  category: string
  duration: string
  url: string
  views: string
  date: string
  sportTags?: string[]
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface SportRule {
  title: string
  content: string
}

export interface SportData {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  timeline: Array<{
    year: string
    event: string
    description: string
  }>
  rules: SportRule[]
  pointSystem: string
  classification: string
}
