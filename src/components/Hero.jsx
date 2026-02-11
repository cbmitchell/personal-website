import { useRef, useState } from 'react'
import './Hero.css'

function Hero() {
  const subtitleVideoRef = useRef(null)

  const handleNameVideoReady = (e) => {
    e.target.play()
  }

  const handleNameVideoEnded = () => {
    if (subtitleVideoRef.current) {
      subtitleVideoRef.current.play()
    }
  }

  return (
    <section className="hero">
      <div className="hero-videos">
        <video
          className="hero-video"
          muted
          playsInline
          onCanPlayThrough={handleNameVideoReady}
          onEnded={handleNameVideoEnded}
        >
          <source src="/videos/name.mp4" type="video/mp4" />
        </video>

        <video
          ref={subtitleVideoRef}
          className={`hero-video`}
          muted
          playsInline
          loop
        >
          <source src="/videos/subtitle.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}

export default Hero
