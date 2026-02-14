import type { ComponentType } from 'react'

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
  published?: boolean
  readingTime?: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
}

export interface Post extends PostMeta {
  Content: ComponentType
}