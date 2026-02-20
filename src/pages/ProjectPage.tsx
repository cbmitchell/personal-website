import { useParams, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { ProjectLayout } from '../components/projects'
import { getProjectBySlug } from '../lib/projects'
import { useContentBySlug } from '../hooks/useContentBySlug'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, loading, notFound } = useContentBySlug(slug, getProjectBySlug)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (notFound || !project) {
    return <Navigate to="/projects" replace />
  }

  const { Content, ...meta } = project

  return (
    <ProjectLayout meta={meta}>
      <Content />
    </ProjectLayout>
  )
}
