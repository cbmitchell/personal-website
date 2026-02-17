import Box from '@mui/material/Box'
import { UnderConstruction } from '../components/UnderConstruction'
import { ScrollPhysicsImage } from '../components/ScrollPhysicsImage'

export function About() {
  return (
    <>
      <Box
        component="section"
        sx={{
          minHeight: '1000dvh',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(255,255,255,0.07) 100px, rgba(255,255,255,0.07) 200px)',
        }}
      >
        <UnderConstruction />
      </Box>
      <ScrollPhysicsImage
        imagePath="/images/physics_animation_frames/"
        numFrames={10}
      />
    </>
  )
}

