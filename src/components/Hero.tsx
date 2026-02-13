import { useRef, useState, useCallback, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'

// Automatically discover all videos in public/videos/subtitles/
const videoModules = import.meta.glob('/public/videos/subtitles/*.mp4')
const subtitleVideos = Object.keys(videoModules).map((path) =>
  path.replace('/public', '')
)

function getRandomVideo(available: string[]): string {
  const index = Math.floor(Math.random() * available.length)
  return available[index]
}

function Hero() {
  const subtitleVideoRef = useRef<HTMLVideoElement>(null)
  const [playedVideos, setPlayedVideos] = useState<string[]>([])
  const [currentVideo, setCurrentVideo] = useState(() =>
    getRandomVideo(subtitleVideos)
  )
  const [nameVideoEnded, setNameVideoEnded] = useState(false)

  const playNextVideo = useCallback(() => {
    const newPlayedVideos = [...playedVideos, currentVideo]

    // Get videos that haven't been played yet
    let available = subtitleVideos.filter((v) => !newPlayedVideos.includes(v))

    // If all videos have been played, reset the list
    if (available.length === 0) {
      available = subtitleVideos
      setPlayedVideos([])
    } else {
      setPlayedVideos(newPlayedVideos)
    }

    const nextVideo = getRandomVideo(available)
    setCurrentVideo(nextVideo)
  }, [playedVideos, currentVideo])

  const handleNameVideoReady = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.play()
  }

  const handleNameVideoEnded = () => {
    setNameVideoEnded(true)
    if (subtitleVideoRef.current) {
      subtitleVideoRef.current.play()
    }
  }

  const handleSubtitleVideoReady = (e: SyntheticEvent<HTMLVideoElement>) => {
    // Auto-play subsequent videos after the name video has finished
    if (nameVideoEnded) {
      e.currentTarget.play()
    }
  }

  const handleSubtitleVideoEnded = () => {
    playNextVideo()
  }

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="video"
          sx={{ maxWidth: '100%' }}
          muted
          playsInline
          onCanPlayThrough={handleNameVideoReady}
          onEnded={handleNameVideoEnded}
        >
          <source src="/videos/name.mp4" type="video/mp4" />
        </Box>

        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            aspectRatio: '1920 / 280',
          }}
        >
          <Box
            component="video"
            key={currentVideo}
            ref={subtitleVideoRef}
            sx={{ width: '100%', height: '100%' }}
            muted
            playsInline
            onCanPlayThrough={handleSubtitleVideoReady}
            onEnded={handleSubtitleVideoEnded}
          >
            <source src={currentVideo} type="video/mp4" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Hero
