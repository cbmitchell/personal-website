import { useRef } from 'react'
import styles from './Hero.module.css'

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
    <section className={styles.hero}>
      <div className={styles.heroVideos}>
        <video
          className={styles.heroVideo}
          muted
          playsInline
          onCanPlayThrough={handleNameVideoReady}
          onEnded={handleNameVideoEnded}
        >
          <source src="/videos/name.mp4" type="video/mp4" />
        </video>

        <video
          ref={subtitleVideoRef}
          className={styles.heroVideo}
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
