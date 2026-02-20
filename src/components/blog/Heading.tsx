import { type ComponentPropsWithoutRef } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LinkIcon from '@mui/icons-material/Link'
import type { TypographyVariant } from '@mui/material/styles'

export function Heading({ variant, ...props }: ComponentPropsWithoutRef<'h1'> & { variant: TypographyVariant }) {
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
