import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the element matching the URL hash once content is ready.
 * Needed because React SPAs render content asynchronously, so the browser's
 * native scroll-to-anchor fires before the target element exists in the DOM.
 *
 * @param ready - true once the page content has finished loading
 */
export function useHashScroll(ready: boolean) {
  const { hash } = useLocation()

  useEffect(() => {
    if (!ready || !hash) return
    const element = document.getElementById(hash.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [ready, hash])
}
