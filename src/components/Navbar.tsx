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
import { SocialLinks } from './SocialLinks'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Resumé', to: '/resume' },
]

export function Navbar() {
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
          <SocialLinks color="inherit" />
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
          <SocialLinks sx={{ justifyContent: 'center', py: 2 }} />
        </Box>
      </Drawer>
    </>
  )
}
