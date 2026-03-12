import type { PostFrontmatter, PostMeta, Post } from '../types/blog'
import type { MDXModule } from '../types/mdx'
import { buildMetaList, loadBySlug } from './content'

type BlogModule = MDXModule<PostFrontmatter>

export function getAllPosts(): PostMeta[] {
  const modules = import.meta.glob<BlogModule>('../content/blog/*.mdx', {
    eager: true,
  })

  return buildMetaList(modules)
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const modules = import.meta.glob<BlogModule>('../content/blog/*.mdx')
  return loadBySlug(modules, '../content/blog', slug)
}
