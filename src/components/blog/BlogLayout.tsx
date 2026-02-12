import { MDXProvider } from '@mdx-js/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { mdxComponents } from './MDXComponents'
import type { PostMeta } from '../../types/blog'

interface BlogLayoutProps {
  meta: PostMeta
  children: React.ReactNode
}

export function BlogLayout({ meta, children }: BlogLayoutProps) {
  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <MDXProvider components={mdxComponents}>
      <Box sx={{ maxWidth: 720, mx: 'auto', py: 4, px: 2 }}>
        <Typography variant="h1" gutterBottom>
          {meta.title}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meta.readingTime}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          {meta.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>

        {children}
      </Box>
    </MDXProvider>
  )
}
