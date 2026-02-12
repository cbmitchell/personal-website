import { useRef, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'

function Hero() {
  const subtitleVideoRef = useRef<HTMLVideoElement>(null)

  const handleNameVideoReady = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.play()
  }

  const handleNameVideoEnded = () => {
    if (subtitleVideoRef.current) {
      subtitleVideoRef.current.play()
    }
  }

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="video"
          sx={{ maxWidth: '100%' }}
          muted
          playsInline
          onCanPlayThrough={handleNameVideoReady}
          onEnded={handleNameVideoEnded}
        >
          <source src="/videos/name.mp4" type="video/mp4" />
        </Box>

        <Box
          component="video"
          ref={subtitleVideoRef}
          sx={{ maxWidth: '100%' }}
          muted
          playsInline
          loop
        >
          <source src="/videos/subtitle.mp4" type="video/mp4" />
        </Box>
      </Box>
    </Box>
  )
}

export default Hero
