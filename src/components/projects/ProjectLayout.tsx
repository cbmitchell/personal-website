import { MDXProvider } from '@mdx-js/react'
import 'rehype-callouts/theme/github'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { mdxComponents } from '../blog/mdxMapping'
import type { ProjectMeta } from '../../types/project'

interface ProjectLayoutProps {
  meta: ProjectMeta
  children: React.ReactNode
}

export function ProjectLayout({ meta, children }: ProjectLayoutProps) {
  return (
    <MDXProvider components={mdxComponents}>
      <Box className="dark" sx={{ maxWidth: 720, mx: 'auto', py: 4, px: 2 }}>
        <Typography variant="h1" gutterBottom>
          {meta.title}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            href={meta.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
            variant="outlined"
            size="small"
          >
            GitHub
          </Button>
          {meta.deploymentUrl && (
            <Button
              href={meta.deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<OpenInNewIcon />}
              variant="outlined"
              size="small"
            >
              Live Demo
            </Button>
          )}
        </Stack>

        {meta.tags && meta.tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
            {meta.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
        )}

        {children}

        {meta.showDemo && meta.deploymentUrl && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom>
              Demo
            </Typography>
            <Box
              component="iframe"
              src={meta.deploymentUrl}
              title={`${meta.title} demo`}
              sx={{
                width: '100%',
                height: 500,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
          </Box>
        )}
      </Box>
    </MDXProvider>
  )
}
