import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Navbar } from './components'
import { About, Blog, BlogPost, Home, Projects, Resume } from './pages'

function App() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          pt: 10,
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
