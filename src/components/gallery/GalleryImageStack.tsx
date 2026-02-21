import { useRef, useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

interface GalleryImageStackProps {
  images: string[]
  maxImages?: number
  previewImages?: string[]
  containerWidth: number
  availableWidth?: number
  onHoverChange?: (hovered: boolean) => void
}

const IMAGE_HEIGHT = { xs: 100, sm: 140 }
const CONTAINER_HEIGHT = { xs: 140, sm: 200 }
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'
const TRANSITION = `left 0.4s ${EASING}, opacity 0.3s ${EASING}`

function computePositions(imageWidths: number[], targetWidth: number): number[] {
  const count = imageWidths.length
  if (count === 0) return []
  if (count === 1) return [0]

  const totalImageWidth = imageWidths.reduce((sum, w) => sum + w, 0)

  if (totalImageWidth <= targetWidth) {
    // Images fit — spread evenly across the available space
    const totalGap = targetWidth - totalImageWidth
    const gap = totalGap / (count - 1)
    const positions: number[] = []
    let left = 0
    for (let i = 0; i < count; i++) {
      positions.push(left)
      left += imageWidths[i] + gap
    }
    return positions
  }

  // Images don't fit — overlap evenly
  const totalOverlap = totalImageWidth - targetWidth
  const overlapPerGap = totalOverlap / (count - 1)
  const positions: number[] = []
  let left = 0
  for (let i = 0; i < count; i++) {
    positions.push(left)
    left += imageWidths[i] - overlapPerGap
  }
  return positions
}

export function GalleryImageStack({
  images,
  maxImages,
  previewImages,
  containerWidth,
  availableWidth,
  onHoverChange,
}: GalleryImageStackProps) {
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [hovered, setHovered] = useState(false)
  let displayImages: string[]

  if (previewImages && previewImages.length > 0) {
    displayImages = maxImages ? previewImages.slice(0, maxImages) : previewImages
  } else {
    displayImages = maxImages ? images.slice(0, maxImages) : images
  }

  const count = displayImages.length

  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const [imageWidths, setImageWidths] = useState<number[]>([])

  const handleImageLoad = useCallback(
    (index: number) => () => {
      setImageWidths((prev) => {
        const next = [...prev]
        const el = imgRefs.current[index]
        if (el) {
          next[index] = el.getBoundingClientRect().width
        }
        return next
      })
    },
    []
  )

  const allLoaded = imageWidths.filter((w) => w > 0).length >= count
  const [transitionsReady, setTransitionsReady] = useState(false)

  useEffect(() => {
    if (allLoaded && !transitionsReady) {
      requestAnimationFrame(() => {
        setTransitionsReady(true)
      })
    }
  }, [allLoaded, transitionsReady])

  const targetWidth = hovered && availableWidth ? availableWidth : containerWidth
  const positions = allLoaded
    ? computePositions(imageWidths, targetWidth)
    : displayImages.map((_, i) => i * (containerWidth / (count + 1))) // fallback before images load

  return (
    <Box
      onMouseEnter={() => { if (canHover) { setHovered(true); onHoverChange?.(true) } }}
      onMouseLeave={() => { if (canHover) { setHovered(false); onHoverChange?.(false) } }}
      sx={{
        position: 'relative',
        width: '100%',
        height: CONTAINER_HEIGHT,
        flexShrink: 0,
      }}
    >
      {[...displayImages].reverse().map((src, ri) => {
        const i = count - 1 - ri
        return (
          <Box
            key={src}
            component="img"
            ref={(el: HTMLImageElement | null) => {
              imgRefs.current[i] = el
            }}
            src={src}
            alt=""
            onLoad={handleImageLoad(i)}
            sx={{
              position: 'absolute',
              left: positions[i] ?? 0,
              top: '50%',
              transform: 'translateY(-50%)',
              height: IMAGE_HEIGHT,
              width: 'auto',
              objectFit: 'contain',
              opacity: allLoaded ? 1 : 0,
              transition: transitionsReady ? TRANSITION : 'none',            }}
          />
        )
      })}
    </Box>
  )
}
