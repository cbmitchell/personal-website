import { useState, useRef } from 'react'
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

const IMAGE_AREA_WIDTH = 360

export function GalleryCard({ post, maxPreviewImages = 5 }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLAnchorElement>(null)

  const getAvailableWidth = () => {
    if (!cardRef.current) return undefined
    const padding = 32 // p: 2 = 16px × 2
    return cardRef.current.getBoundingClientRect().width - padding
  }

  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardActionArea
        ref={cardRef}
        component={RouterLink}
        to={`/gallery/${post.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          p: 2,
          gap: 3,
        }}
      >
        {/* Image area — fixed width at rest, expands to full card on hover */}
        <Box
          sx={{
            width: hovered ? '100%' : IMAGE_AREA_WIDTH,
            flexShrink: 0,
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'visible',
          }}
        >
          <GalleryImageStack
            images={post.images}
            maxImages={maxPreviewImages}
            previewImages={post.previewImages}
            hovered={hovered}
            containerWidth={IMAGE_AREA_WIDTH}
            availableWidth={getAvailableWidth()}
          />
        </Box>

        {/* Text area — consistent position, fades out on hover */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            opacity: hovered ? 0 : 1,
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: hovered ? 'none' : 'auto',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h6" gutterBottom noWrap>
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
