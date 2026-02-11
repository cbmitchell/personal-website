import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { About, Blog, Home, Projects, Resume } from './pages'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
