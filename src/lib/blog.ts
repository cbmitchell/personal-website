import type { ComponentType } from 'react'
import type { PostFrontmatter, PostMeta, Post } from '../types/blog'

interface MDXModule {
  frontmatter: PostFrontmatter
  default: ComponentType
}

// Get all posts with metadata (for listing page)
export function getAllPosts(): PostMeta[] {
  const modules = import.meta.glob<MDXModule>('../content/blog/*.mdx', {
    eager: true,
  })

  const posts: PostMeta[] = Object.entries(modules).map(([path, module]) => {
    const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''

    return {
      ...module.frontmatter,
      slug,
    }
  })

  return posts
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const modules = import.meta.glob<MDXModule>('../content/blog/*.mdx')

  const path = `../content/blog/${slug}.mdx`
  const loader = modules[path]

  if (!loader) return null

  const module = await loader()

  return {
    ...module.frontmatter,
    slug,
    Content: module.default,
  }
}
