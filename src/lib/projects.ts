import type { ProjectFrontmatter, ProjectMeta, Project } from '../types/project'
import type { MDXModule } from '../types/mdx'
import { buildMetaList, loadBySlug } from './content'

type ProjectModule = MDXModule<ProjectFrontmatter>

export function getAllProjects(): ProjectMeta[] {
  const modules = import.meta.glob<ProjectModule>('../content/projects/*.mdx', {
    eager: true,
  })

  return buildMetaList(modules).sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
  )
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const modules = import.meta.glob<ProjectModule>('../content/projects/*.mdx')
  return loadBySlug(modules, '../content/projects', slug)
}
