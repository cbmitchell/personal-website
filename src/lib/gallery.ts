import type { ComponentType } from 'react'
import type { GalleryFrontmatter, GalleryMeta, GalleryPost } from '../types/gallery'

interface MDXModule {
  frontmatter: GalleryFrontmatter
  default: ComponentType
}

export function getAllGalleryPosts(): GalleryMeta[] {
  const modules = import.meta.glob<MDXModule>('../content/gallery/*.mdx', {
    eager: true,
  })

  const posts: GalleryMeta[] = Object.entries(modules).map(
    ([path, module]) => {
      const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''

      return {
        ...module.frontmatter,
        slug,
      }
    }
  )

  return posts.sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
  )
}

export async function getGalleryPostBySlug(
  slug: string
): Promise<GalleryPost | null> {
  const modules = import.meta.glob<MDXModule>('../content/gallery/*.mdx')

  const path = `../content/gallery/${slug}.mdx`
  const loader = modules[path]

  if (!loader) return null

  const module = await loader()

  return {
    ...module.frontmatter,
    slug,
    Content: module.default,
  }
}
