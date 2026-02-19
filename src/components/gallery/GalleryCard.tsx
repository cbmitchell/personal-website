import { Link as RouterLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { GalleryImageStack } from './GalleryImageStack'
import type { GalleryMeta } from '../../types/gallery'

interface GalleryCardProps {
  post: GalleryMeta
  maxPreviewImages?: number
}

export function GalleryCard({ post, maxPreviewImages = 5 }: GalleryCardProps) {
  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardActionArea
        component={RouterLink}
        to={`/gallery/${post.slug}`}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          p: 2,
          gap: 3,
        }}
      >
        <GalleryImageStack
          images={post.images}
          maxImages={maxPreviewImages}
          previewImages={post.previewImages}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
