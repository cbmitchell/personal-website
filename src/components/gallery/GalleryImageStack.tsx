import Box from '@mui/material/Box'

interface GalleryImageStackProps {
  images: string[]
  maxImages?: number
  previewImages?: string[]
}

const IMAGE_OFFSET = 40

export function GalleryImageStack({
  images,
  maxImages = 5,
  previewImages,
}: GalleryImageStackProps) {
  let displayImages: string[]

  if (previewImages && previewImages.length > 0) {
    displayImages = previewImages.slice(0, maxImages)
  } else {
    displayImages = images.slice(0, maxImages)
  }

  const count = displayImages.length
  const stackWidth = 180 + IMAGE_OFFSET * (count - 1)

  return (
    <Box
      sx={{
        position: 'relative',
        width: stackWidth,
        height: 200,
        flexShrink: 0,
      }}
    >
      {displayImages.map((src, i) => (
        <Box
          key={src}
          component="img"
          src={src}
          alt=""
          sx={{
            position: 'absolute',
            left: i * IMAGE_OFFSET,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 180,
            height: 140,
            objectFit: 'cover',
            borderRadius: 1,
            zIndex: count - i,
            boxShadow: 3,
          }}
        />
      ))}
    </Box>
  )
}
