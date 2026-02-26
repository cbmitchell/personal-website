import { useRef } from 'react'
import Box from '@mui/material/Box'
import { UnderConstruction } from '../components/UnderConstruction'
import { ScrollPhysicsImage } from '../components/ScrollPhysicsImage'
import Typography from '@mui/material/Typography'

export function About() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={scrollContainerRef}
      sx={{
        position: 'relative',
        height: '100dvh',
        overflowY: 'auto',
      }}
    >
      <Box
        component="section"
        sx={{
          minHeight: '1000dvh',
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(255,255,255,0.07) 100px, rgba(255,255,255,0.07) 200px)',
        }}
      >
        <UnderConstruction />
        <Typography
          variant="h3"
          sx={{ width: '100%', px: '15%', textAlign: 'center' }}
        >
          In the meantime, please enjoy this little scroll-driven physics
          animation!
        </Typography>
      </Box>
      <ScrollPhysicsImage
        imagePath="/images/physics_animation_frames/"
        numFrames={10}
        scrollContainerRef={scrollContainerRef}
        anchorUpperScrollPosition={380}
        anchorLowerScrollPosition={7500}
        mobileOverrides={{
          responsiveness: 0.2,
          mass: 0.3,
          velocityWeight: 1.0,
          forceThresholdMultiplier: 2,
          thresholdBuffer: 0.35,
          splatSeverity: 0.002,
          splatRecoverySpeed: 0.25,
        }}
      />
    </Box>
  )
}
