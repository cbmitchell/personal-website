import { Link as RouterLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import type { PostMeta } from '../../types/blog'

interface BlogCardProps {
  post: PostMeta
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardActionArea component={RouterLink} to={`/blog/${post.slug}`}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
            {post.readingTime && (
              <Typography variant="caption" color="text.secondary">
                {post.readingTime}
              </Typography>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.excerpt}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}