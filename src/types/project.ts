import type { ComponentType } from 'react'

export interface ProjectFrontmatter {
  title: string
  description: string
  image: string
  githubUrl: string
  deploymentUrl?: string
  showDemo?: boolean
  tags?: string[]
  order?: number
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string
}

export interface Project extends ProjectMeta {
  Content: ComponentType
}
