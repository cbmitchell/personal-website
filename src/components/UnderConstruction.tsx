import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const base = import.meta.env.BASE_URL
const imageModules = import.meta.glob('/public/images/under_construction/*.png')
const images = Object.keys(imageModules).map((path) =>
  path.replace('/public/', '')
)

export function UnderConstruction() {
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
        minHeight: '100dvh',
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
          src={`${base}${randomImage}`}
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
