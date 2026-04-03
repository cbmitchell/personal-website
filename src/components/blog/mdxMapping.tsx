import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { MDXComponents } from 'mdx/types'
import { Link as RouterLink } from 'react-router-dom'
import { Heading } from './Heading'
import { GalleryImageList } from '../gallery/GalleryImageList'
import { MermaidDiagram } from './MermaidDiagram'
import { UnderConstruction } from '../UnderConstruction'

const isExternal = (href: string) => /^(?:[a-z][a-z\d+\-.]*:|\/\/)/.test(href)

export const mdxComponents: MDXComponents = {
  ImageGrid: GalleryImageList,
  MermaidDiagram,
  UnderConstruction: UnderConstruction,
  h1: (props) => <Heading variant="h2" {...props} />,
  h2: (props) => <Heading variant="h3" {...props} />,
  h3: (props) => <Heading variant="h4" {...props} />,
  p: (props) => <Typography variant="body1" component="p" sx={{ mb: '1em' }} {...props} />,
  a: ({ href = '', ...props }) =>
    isExternal(href)
      ? <Link href={href} color="primary" target="_blank" rel="noopener noreferrer" {...props} />
      : href.startsWith('#')
        ? <Link href={href} color="primary" {...props} />
        : <Link component={RouterLink} to={href} color="primary" {...props} />,
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
  ul: (props) => <Box component="ul" sx={{ pl: 3, mb: 2, 'li > &': { mb: 0 } }} {...props} />,
  ol: (props) => <Box component="ol" sx={{ pl: 3, mb: 2, 'li > &': { mb: 0 } }} {...props} />,
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