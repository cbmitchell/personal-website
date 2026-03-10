import { Routes, Route, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Navbar } from './components'
import { About, Blog, BlogPost, Gallery, GalleryPage, Home, ProjectPage, Projects, Resume } from './pages'
import { useAnalytics } from './hooks/useAnalytics'

export function App() {
  useAnalytics()

  return (
    <Box sx={{ minHeight: '100dvh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          minHeight: '100dvh',
          pt: { xs: 0, md: 10 },
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<GalleryPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  )
}

