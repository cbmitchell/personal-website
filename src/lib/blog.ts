import type { ComponentType } from 'react'
import type { PostFrontmatter, PostMeta, Post } from '../types/blog'

interface MDXModule {
  frontmatter: PostFrontmatter
  default: ComponentType
}

// Simple reading time calculation (200 words per minute)
function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

// Get all posts with metadata (for listing page)
export function getAllPosts(): PostMeta[] {
  const modules = import.meta.glob<MDXModule>('../content/blog/*.mdx', {
    eager: true,
  })

  const posts: PostMeta[] = Object.entries(modules).map(([path, module]) => {
    const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''
    const { frontmatter } = module

    return {
      ...frontmatter,
      slug,
      readingTime: calculateReadingTime(frontmatter.excerpt || ''),
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
    readingTime: calculateReadingTime(module.frontmatter.excerpt || ''),
    Content: module.default,
  }
}
