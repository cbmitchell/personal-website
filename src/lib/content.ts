import type { ComponentType } from 'react'
import type { MDXModule } from '../types/mdx'

export function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace('.mdx', '') ?? ''
}

export function buildMetaList<F extends object>(
  modules: Record<string, MDXModule<F>>
): Array<F & { slug: string }> {
  return Object.entries(modules).map(([path, module]) => ({
    ...module.frontmatter,
    slug: slugFromPath(path),
  }))
}

export async function loadBySlug<F extends object>(
  modules: Record<string, () => Promise<MDXModule<F>>>,
  dir: string,
  slug: string
): Promise<(F & { slug: string; Content: ComponentType }) | null> {
  const path = `${dir}/${slug}.mdx`
  const loader = modules[path]
  if (!loader) return null
  const module = await loader()
  return { ...module.frontmatter, slug, Content: module.default }
}
