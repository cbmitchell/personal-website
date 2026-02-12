import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { BlogLayout } from '../components/blog'
import { getPostBySlug } from '../lib/blog'
import type { Post } from '../types/blog'

function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }

    getPostBySlug(slug).then((data) => {
      if (data) {
        setPost(data)
      } else {
        setNotFound(true)
      }
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

export default BlogPost
