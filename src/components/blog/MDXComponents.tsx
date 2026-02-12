import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import type { Components } from '@mdx-js/react'

export const mdxComponents: Components = {
  h1: (props) => <Typography variant="h2" gutterBottom sx={{ mt: 4 }} {...props} />,
  h2: (props) => <Typography variant="h3" gutterBottom sx={{ mt: 3 }} {...props} />,
  h3: (props) => <Typography variant="h4" gutterBottom sx={{ mt: 2 }} {...props} />,
  p: (props) => <Typography variant="body1" paragraph {...props} />,
  a: (props) => <Link color="primary" {...props} />,
  hr: () => <Divider sx={{ my: 4 }} />,
  pre: (props) => (
    <Box
      component="pre"
      sx={{
        backgroundColor: '#0d1117',
        borderRadius: 1,
        p: 2,
        overflow: 'auto',
        my: 2,
        '& code': {
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        },
      }}
      {...props}
    />
  ),
  code: (props) => {
    const isInline = !props.className
    if (isInline) {
      return (
        <Box
          component="code"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            px: 0.5,
            borderRadius: 0.5,
            fontFamily: 'monospace',
          }}
          {...props}
        />
      )
    }
    return <code {...props} />
  },
  ul: (props) => <Box component="ul" sx={{ pl: 3, mb: 2 }} {...props} />,
  ol: (props) => <Box component="ol" sx={{ pl: 3, mb: 2 }} {...props} />,
  li: (props) => <Typography component="li" variant="body1" {...props} />,
  blockquote: (props) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'divider',
        pl: 2,
        my: 2,
        fontStyle: 'italic',
        color: 'text.secondary',
      }}
      {...props}
    />
  ),
}