import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import type { SxProps, Theme } from '@mui/material/styles'

interface SocialLinksProps {
  color?: 'inherit' | 'default'
  sx?: SxProps<Theme>
}

export function SocialLinks({ color, sx }: SocialLinksProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, ...sx }}>
      <IconButton
        component="a"
        href="https://www.linkedin.com/in/christopher-mitchell-384045222/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        color={color}
      >
        <LinkedInIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://github.com/cbmitchell"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        color={color}
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        component="a"
        href="mailto:chrisbeckermitchell@gmail.com"
        aria-label="Email"
        color={color}
      >
        <EmailIcon />
      </IconButton>
    </Box>
  )
}