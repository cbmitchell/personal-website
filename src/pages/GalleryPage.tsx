import { useParams, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { GalleryLayout } from '../components/gallery'
import { getGalleryPostBySlug } from '../lib/gallery'
import { useContentBySlug } from '../hooks/useContentBySlug'
import { useHashScroll } from '../hooks/useHashScroll'

export function GalleryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, loading, notFound } = useContentBySlug(slug, getGalleryPostBySlug)
  useHashScroll(!loading && !!post)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (notFound || !post) {
    return <Navigate to="/gallery" replace />
  }

  const { Content, ...meta } = post

  return (
    <GalleryLayout meta={meta}>
      <Content />
    </GalleryLayout>
  )
}
