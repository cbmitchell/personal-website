import { useState, useRef, useEffect } from 'react'
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
const CARD_HEIGHT = 232

export function GalleryCard({ post, maxPreviewImages }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const imageAreaRef = useRef<HTMLDivElement>(null)
  const [imageAreaWidth, setImageAreaWidth] = useState(IMAGE_AREA_WIDTH)

  useEffect(() => {
    const measure = () => {
      if (imageAreaRef.current) {
        setImageAreaWidth(imageAreaRef.current.getBoundingClientRect().width)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

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
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          height: { xs: 'auto', sm: CARD_HEIGHT },
          p: 2,
          gap: { xs: 1, sm: 3 },
          overflow: 'hidden',
        }}
      >
        {/* Image area — full width on mobile, fixed width on desktop */}
        <Box
          ref={imageAreaRef}
          sx={{
            width: { xs: '100%', sm: IMAGE_AREA_WIDTH },
            flexShrink: 0,
            overflow: 'visible',
            zIndex: 1,
          }}
        >
          <GalleryImageStack
            images={post.images}
            maxImages={maxPreviewImages}
            previewImages={post.previewImages}
            containerWidth={imageAreaWidth}
            availableWidth={getAvailableWidth()}
            onHoverChange={setHovered}
          />
        </Box>

        {/* Text area — fades out on hover (desktop only) */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            zIndex: 0,
            opacity: hovered ? 0 : 1,
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: hovered ? 'none' : 'auto',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h6" gutterBottom noWrap>
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: { xs: 2, sm: 4 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.description}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
