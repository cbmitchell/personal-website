import Box from '@mui/material/Box'
import { Hero } from '../components'

function Home() {
  return (
    <Box sx={{ mt: { xs: 0, md: -10 } }}>
      <Hero />
    </Box>
  )
}

export default Home