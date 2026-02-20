import { MDXProvider } from '@mdx-js/react'
import 'rehype-callouts/theme/github'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { mdxComponents } from '../blog/mdxMapping'
import type { GalleryMeta } from '../../types/gallery'

interface GalleryLayoutProps {
  meta: GalleryMeta
  children: React.ReactNode
}

export function GalleryLayout({ meta, children }: GalleryLayoutProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <Box className="dark" sx={{ maxWidth: 720, mx: 'auto', py: 4, px: 2 }}>
        <Typography variant="h1" gutterBottom>
          {meta.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {meta.description}
        </Typography>

        {children}
      </Box>
    </MDXProvider>
  )
}
