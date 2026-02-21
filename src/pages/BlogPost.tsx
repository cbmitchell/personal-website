import { useParams, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { BlogLayout } from '../components/blog'
import { getPostBySlug } from '../lib/blog'
import { useContentBySlug } from '../hooks/useContentBySlug'
import { useHashScroll } from '../hooks/useHashScroll'

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, loading, notFound } = useContentBySlug(slug, getPostBySlug)
  useHashScroll(!loading && !!post)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />
  }

  const { Content, ...meta } = post

  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  )
}
