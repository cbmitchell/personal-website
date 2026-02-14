import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resumé', to: '/resume' },
]

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Desktop navbar */}
      <AppBar position="fixed" sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {navLinks.map((link) => (
              <Button key={link.to} component={RouterLink} to={link.to} color="inherit">
                {link.label}
              </Button>
            ))}
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

      {/* Mobile hamburger button */}
      <IconButton
        aria-label="Open menu"
        onClick={() => setDrawerOpen(true)}
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: 'text.primary',
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.to} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={link.to}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2 }}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/christopher-mitchell-384045222/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/cbmitchell"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:chrisbeckermitchell@gmail.com"
              aria-label="Email"
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
