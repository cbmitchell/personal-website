import { CSSProperties, useEffect, useRef } from 'react'

const WIDTH = 240
const HEIGHT = 60
const DEPTH = 160
const BORDER = 3
const BACK_PLATE_OVERHANG = BORDER - 1

interface Face {
  style: CSSProperties
}

const faces: Face[] = [
  {
    style: {
      width: WIDTH,
      height: HEIGHT,
      top: 0,
      left: 0,
      transform: `translateZ(${DEPTH / 2}px)`,
    },
  },
  {
    style: {
      width: WIDTH,
      height: HEIGHT,
      top: 0,
      left: 0,
      transform: `rotateY(180deg) translateZ(${DEPTH / 2}px)`,
    },
  },
  {
    style: {
      width: DEPTH,
      height: HEIGHT,
      top: 0,
      left: (WIDTH - DEPTH) / 2,
      transform: `rotateY(-90deg) translateZ(${WIDTH / 2}px)`,
    },
  },
  {
    style: {
      width: DEPTH,
      height: HEIGHT,
      top: 0,
      left: (WIDTH - DEPTH) / 2,
      transform: `rotateY(90deg) translateZ(${WIDTH / 2}px)`,
    },
  },
  {
    style: {
      width: WIDTH,
      height: DEPTH,
      top: (HEIGHT - DEPTH) / 2,
      left: 0,
      transform: `rotateX(90deg) translateZ(${HEIGHT / 2}px)`,
      background: '#adadad',
    },
  },
  {
    style: {
      width: WIDTH,
      height: DEPTH,
      top: (HEIGHT - DEPTH) / 2,
      left: 0,
      transform: `rotateX(-90deg) translateZ(${HEIGHT / 2}px)`,
      background: '#595959',
    },
  },
  {
    style: {
      width: WIDTH + BACK_PLATE_OVERHANG * 2,
      height: HEIGHT + BACK_PLATE_OVERHANG * 2,
      top: -BACK_PLATE_OVERHANG,
      left: -BACK_PLATE_OVERHANG,
      transform: `rotateY(180deg) translateZ(${DEPTH / 2 + 1}px)`,
      background: 'black',
      border: 'none',
    },
  },
]

const PERSPECTIVE = 800

interface ViewportPerspectiveBoxProps {
  /** CSS value for the vertical center of the box within its scroll container (default: `'calc(380px + 50vh)'`). */
  top?: string
}

export function ViewportPerspectiveBox({
  top = 'calc(380px + 50vh)',
}: ViewportPerspectiveBoxProps) {
  const backContainerRef = useRef<HTMLDivElement>(null)
  const frontContainerRef = useRef<HTMLDivElement>(null)
  const prevOriginRef = useRef<{ x: string; y: string }>({ x: '50%', y: '50%' })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const update = () => {
      if (backContainerRef.current) {
        const rect = backContainerRef.current.getBoundingClientRect()

        const boxCX = rect.left + rect.width / 2
        const boxCY = rect.top + rect.height / 2
        const vpCX = window.innerWidth / 2
        const vpCY = window.innerHeight / 2

        const offsetX = boxCX - vpCX
        const offsetY = boxCY - vpCY

        const originX = 50 - (offsetX / rect.width) * 100
        const originY = 50 - (offsetY / rect.height) * 100

        const oxStr = `${originX}%`
        const oyStr = `${originY}%`

        if (
          oxStr !== prevOriginRef.current.x ||
          oyStr !== prevOriginRef.current.y
        ) {
          prevOriginRef.current = { x: oxStr, y: oyStr }
          backContainerRef.current.style.perspectiveOrigin = `${oxStr} ${oyStr}`
          if (frontContainerRef.current) {
            frontContainerRef.current.style.perspectiveOrigin = `${oxStr} ${oyStr}`
          }
        }
      }

      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const wrapperStyle: CSSProperties = {
    position: 'absolute',
    top,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: WIDTH + DEPTH * 2,
    height: HEIGHT + DEPTH * 2,
    pointerEvents: 'none',
  }

  const perspectiveContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: `${PERSPECTIVE}px`,
    width: '100%',
    height: '100%',
  }

  const cubeStyle: CSSProperties = {
    width: WIDTH,
    height: HEIGHT,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: `translateZ(0px)`,
  }

  const faceBaseStyle: CSSProperties = {
    position: 'absolute',
    boxSizing: 'border-box',
    border: '3px solid black',
    background: 'grey',
  }

  return (
    <>
      {/* Sides/back layer — below ScrollPhysicsElement */}
      <div style={{ ...wrapperStyle, zIndex: 999 }}>
        <div ref={backContainerRef} style={perspectiveContainerStyle}>
          <div style={cubeStyle}>
            {faces.slice(1).map((face, i) => (
              <div key={i} style={{ ...faceBaseStyle, ...face.style }} />
            ))}
          </div>
        </div>
      </div>
      {/* Front face layer — above ScrollPhysicsElement */}
      <div style={{ ...wrapperStyle, zIndex: 1001 }}>
        <div ref={frontContainerRef} style={perspectiveContainerStyle}>
          <div style={cubeStyle}>
            <div style={{ ...faceBaseStyle, ...faces[0].style }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <div
      style={{
        background: '#ffffff',
        fontFamily: "'Courier New', monospace",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            borderBottom: '1px solid #eee',
          }}
        >
          <ViewportPerspectiveBox />
        </div>
      ))}
    </div>
  )
}
