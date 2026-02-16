import type { ComponentType } from 'react'
import type { ProjectFrontmatter, ProjectMeta, Project } from '../types/project'

interface MDXModule {
  frontmatter: ProjectFrontmatter
  default: ComponentType
}

export function getAllProjects(): ProjectMeta[] {
  const modules = import.meta.glob<MDXModule>('../content/projects/*.mdx', {
    eager: true,
  })

  const projects: ProjectMeta[] = Object.entries(modules).map(
    ([path, module]) => {
      const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''

      return {
        ...module.frontmatter,
        slug,
      }
    }
  )

  return projects.sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
  )
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const modules = import.meta.glob<MDXModule>('../content/projects/*.mdx')

  const path = `../content/projects/${slug}.mdx`
  const loader = modules[path]

  if (!loader) return null

  const module = await loader()

  return {
    ...module.frontmatter,
    slug,
    Content: module.default,
  }
}
