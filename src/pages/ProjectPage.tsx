import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { ProjectLayout } from '../components/projects'
import { getProjectBySlug } from '../lib/projects'
import type { Project } from '../types/project'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }

    getProjectBySlug(slug)
      .then((data) => {
        if (data) {
          setProject(data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => {
        setNotFound(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

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
