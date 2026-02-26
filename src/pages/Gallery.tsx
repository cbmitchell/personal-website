import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { GalleryCard } from '../components/gallery'
import { getAllGalleryPosts } from '../lib/gallery'
import Typography from '@mui/material/Typography'

export function Gallery() {
  const posts = getAllGalleryPosts()

  return (
    <Box component="section" sx={{ maxWidth: 1080, mx: 'auto', py: 4, px: 3 }}>
      <Typography variant="h1" gutterBottom>Gallery</Typography>
      <Stack spacing={3}>
        {posts.map((post) => (
          <GalleryCard key={post.slug} post={post} maxPreviewImages={6} />
        ))}
      </Stack>
    </Box>
  )
}
