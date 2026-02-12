import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'

function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 4 } }}>
          <Button component={RouterLink} to="/" color="inherit">Home</Button>
          <Button component={RouterLink} to="/about" color="inherit">About</Button>
          <Button component={RouterLink} to="/blog" color="inherit">Blog</Button>
          <Button component={RouterLink} to="/projects" color="inherit">Projects</Button>
          <Button component={RouterLink} to="/resume" color="inherit">Resumé</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/christopher-mitchell-384045222/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            color="inherit"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/cbmitchell"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
            href="mailto:chrisbeckermitchell@gmail.com"
            aria-label="Email"
            color="inherit"
          >
            <EmailIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
