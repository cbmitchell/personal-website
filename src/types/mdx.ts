import type { ComponentType } from 'react'

export interface MDXModule<T> {
  frontmatter: T
  default: ComponentType
}