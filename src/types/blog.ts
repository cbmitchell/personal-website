import type { ComponentType } from 'react'

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
  published?: boolean
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: string
}

export interface Post extends PostMeta {
  Content: ComponentType
}