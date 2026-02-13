import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const images = [
  'green_man_hammer.png',
  'green_man_mopping.png',
  'green_man_scientist.png',
  'green_man_shrug.png',
  'green_man_welder.png',
  'green_man_wrench.png',
]

function UnderConstruction() {
  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * images.length)
    return images[index]
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: '300px',
          width: '100%',
          aspectRatio: '1 / 1',
        }}
      >
        <Box
          component="img"
          src={`/images/under_construction/${randomImage}`}
          alt="Under construction"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Typography variant="h2" textAlign="center">
        Under Construction
      </Typography>
      <Typography textAlign="center">
        This page is still a work in progress, but will be finished soon, 
        so be sure to come back and check!
      </Typography>
    </Box>
  )
}

export default UnderConstruction