import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { BlogCard } from '../components/blog'
import { getAllPosts } from '../lib/blog'

function Blog() {
  const posts = getAllPosts()

  return (
    <Box component="section" sx={{ maxWidth: 720, mx: 'auto', py: 4, px: 2 }}>
      <Stack spacing={3}>
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Stack>

      {posts.length === 0 && (
        <Typography color="text.secondary">
          No posts yet. Check back soon!
        </Typography>
      )}
    </Box>
  )
}

export default Blog