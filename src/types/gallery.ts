import type { ComponentType } from 'react'

export interface GalleryFrontmatter {
  title: string
  description: string
  images: string[]
  previewImages?: string[]
  order?: number
}

export interface GalleryMeta extends GalleryFrontmatter {
  slug: string
}

export interface GalleryPost extends GalleryMeta {
  Content: ComponentType
}
