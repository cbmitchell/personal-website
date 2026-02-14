import { useRef, useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'

// Automatically discover all videos in public/videos/subtitles/
const videoModules = import.meta.glob('/public/videos/subtitles/*.mp4')
const base = import.meta.env.BASE_URL
const subtitleVideos = Object.keys(videoModules).map((path) =>
  path.replace('/public/', base)
)

// Module-level flag so the name video's completion persists across
// mount/unmount cycles (route changes) without prop drilling or context.
let nameVideoFinished = false

function getRandomVideo(available: string[]): string {
  const index = Math.floor(Math.random() * available.length)
  return available[index]
}

function Hero() {
  const nameVideoRef = useRef<HTMLVideoElement>(null)
  const subtitleVideoRef = useRef<HTMLVideoElement>(null)
  const [playedVideos, setPlayedVideos] = useState<string[]>([])
  const [currentVideo, setCurrentVideo] = useState(() =>
    getRandomVideo(subtitleVideos)
  )
  const subtitlesStarted = useRef(false)

  useEffect(() => {
    if (subtitlesStarted.current && subtitleVideoRef.current) {
      subtitleVideoRef.current.play()
    }
  }, [currentVideo])

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

  const handleNameVideoEnded = () => {
    nameVideoFinished = true
    subtitlesStarted.current = true
    if (subtitleVideoRef.current) {
      subtitleVideoRef.current.play()
    }
  }

  useEffect(() => {
    if (!nameVideoFinished) return

    const nameVideo = nameVideoRef.current
    if (nameVideo) {
      const seekToEnd = () => {
        // Seek to just before the end; some mobile browsers won't render
        // a frame at exactly duration.
        nameVideo.currentTime = Math.max(0, nameVideo.duration - 0.01)
      }
      if (nameVideo.readyState >= 1) {
        seekToEnd()
      } else {
        nameVideo.addEventListener('loadedmetadata', seekToEnd, { once: true })
        nameVideo.load()
      }
    }

    subtitlesStarted.current = true
    if (subtitleVideoRef.current) {
      subtitleVideoRef.current.play()
    }
  }, [])

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
        minHeight: '100dvh',
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
          ref={nameVideoRef}
          sx={{ maxWidth: '100%' }}
          autoPlay={!nameVideoFinished}
          preload={nameVideoFinished ? 'auto' : undefined}
          muted
          playsInline
          onEnded={handleNameVideoEnded}
        >
          <source src={`${base}videos/name.mp4`} type="video/mp4" />
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
