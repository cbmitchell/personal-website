import type { GalleryFrontmatter, GalleryMeta, GalleryPost } from '../types/gallery'
import type { MDXModule } from '../types/mdx'
import { buildMetaList, loadBySlug } from './content'

type GalleryModule = MDXModule<GalleryFrontmatter>

export function getAllGalleryPosts(): GalleryMeta[] {
  const modules = import.meta.glob<GalleryModule>('../content/gallery/*.mdx', {
    eager: true,
  })

  return buildMetaList(modules).sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
  )
}

export async function getGalleryPostBySlug(
  slug: string
): Promise<GalleryPost | null> {
  const modules = import.meta.glob<GalleryModule>('../content/gallery/*.mdx')
  return loadBySlug(modules, '../content/gallery', slug)
}
