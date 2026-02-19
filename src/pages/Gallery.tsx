import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { GalleryCard } from '../components/gallery'
import { getAllGalleryPosts } from '../lib/gallery'
import Typography from '@mui/material/Typography'

export function Gallery() {
  const posts = getAllGalleryPosts()

  return (
    <>
    <Typography variant="h3" gutterBottom>Gallery</Typography>
    <Box component="section" sx={{ maxWidth: 1080, mx: 'auto', py: 4, px: 2 }}>
      <Stack spacing={3}>
        {posts.map((post) => (
          <GalleryCard key={post.slug} post={post} />
        ))}
      </Stack>
    </Box>
    </>
  )
}
