import { type ComponentPropsWithoutRef } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import LinkIcon from '@mui/icons-material/Link'
import type { MDXComponents } from 'mdx/types'
import type { TypographyVariant } from '@mui/material/styles'

function Heading({ variant, ...props }: ComponentPropsWithoutRef<'h1'> & { variant: TypographyVariant }) {
  const handleCopyLink = () => {
    if (props.id) {
      const url = `${window.location.origin}${window.location.pathname}#${props.id}`
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <Typography
      variant={variant}
      gutterBottom
      {...props}
      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
    >
      {props.children}
      {props.id && (
        <IconButton
          size="small"
          onClick={handleCopyLink}
          aria-label="Copy link to section"
          sx={{ opacity: 0.3, '&:hover': { opacity: 1 }, transition: 'opacity 0.2s' }}
        >
          <LinkIcon fontSize="small" />
        </IconButton>
      )}
    </Typography>
  )
}

export const mdxComponents: MDXComponents = {
  h1: (props) => <Heading variant="h2" {...props} />,
  h2: (props) => <Heading variant="h3" {...props} />,
  h3: (props) => <Heading variant="h4" {...props} />,
  p: (props) => <Typography variant="body1" component="p" sx={{ mb: '1em' }} {...props} />,
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
  del: (props) => (
    <Typography component="del" sx={{ textDecoration: 'line-through' }} {...props} />
  ),
  table: (props) => (
    <Box
      component="table"
      sx={{
        width: '100%',
        borderCollapse: 'collapse',
        my: 2,
        '& th, & td': {
          border: 1,
          borderColor: 'divider',
          px: 2,
          py: 1,
        },
      }}
      {...props}
    />
  ),
  th: (props) => (
    <Typography
      component="th"
      variant="body1"
      sx={{ fontWeight: 'bold', textAlign: 'left' }}
      {...props}
    />
  ),
  td: (props) => (
    <Typography component="td" variant="body1" {...props} />
  ),
  input: (props) => {
    if (props.type === 'checkbox') {
      return <Box component="input" type="checkbox" disabled={props.disabled} checked={props.checked} readOnly sx={{ mr: 1 }} />
    }
    return <input {...props} />
  },
}