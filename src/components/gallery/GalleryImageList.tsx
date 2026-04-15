import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { LightboxImage } from '../LightboxImage'

interface GalleryImageListProps {
  images: string[]
  cols?: number
  mobileCols?: number
  rowHeight?: number | 'auto'
  gap?: number
  variant?: 'standard' | 'masonry'
  imageBackground?: string
  lightbox?: boolean
}

export function GalleryImageList({
  images,
  cols = 3,
  mobileCols,
  rowHeight = 'auto',
  gap = 8,
  variant = 'standard',
  imageBackground,
  lightbox = true,
}: GalleryImageListProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const effectiveCols = isMobile ? (mobileCols ?? Math.min(2, cols)) : cols

  return (
    <ImageList
      variant={variant}
      cols={effectiveCols}
      rowHeight={variant === 'masonry' ? undefined : rowHeight}
      gap={gap}
      sx={{ my: 2 }}
    >
      {images.map((src) => {
        const filename = src.split('/').pop() ?? src
        const alt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
        const imgStyle: React.CSSProperties = { display: 'block', width: '100%', objectFit: 'contain' }
        return (
          <ImageListItem key={src} sx={imageBackground ? { backgroundColor: imageBackground } : undefined}>
            {lightbox ? (
              <LightboxImage src={src} alt={alt} loading="lazy" style={imgStyle} />
            ) : (
              <img src={src} alt={alt} loading="lazy" style={imgStyle} />
            )}
          </ImageListItem>
        )
      })}
    </ImageList>
  )
}
