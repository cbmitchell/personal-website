import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const API_URL = import.meta.env.VITE_CONTACT_API_URL

function getSessionId(): string {
  let id = sessionStorage.getItem('analyticsSessionId')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('analyticsSessionId', id)
  }
  return id
}

export function useAnalytics() {
  const location = useLocation()
  const startTimeRef = useRef<number>(Date.now())
  const pathRef = useRef<string>(location.pathname)

  useEffect(() => {
    const sessionId = getSessionId()
    const path = location.pathname
    const referrer = document.referrer || undefined

    fetch(`${API_URL}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        path,
        referrer,
        sessionId,
        language: navigator.language,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      }),
    }).catch(() => {})

    startTimeRef.current = Date.now()
    pathRef.current = path

    return () => {
      const durationMs = Date.now() - startTimeRef.current
      navigator.sendBeacon(
        `${API_URL}/analytics`,
        JSON.stringify({ type: 'duration', path: pathRef.current, durationMs, sessionId })
      )
    }
  }, [location.pathname])
}
