import { useState, useEffect } from 'react'

interface ContentState<T> {
  data: T | null
  loading: boolean
  notFound: boolean
}

export function useContentBySlug<T>(
  slug: string | undefined,
  fetcher: (slug: string) => Promise<T | null>,
): ContentState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(!!slug)
  const [notFound, setNotFound] = useState(!slug)

  useEffect(() => {
    if (!slug) return

    fetcher(slug)
      .then((result) => {
        if (result) {
          setData(result)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => {
        setNotFound(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug, fetcher])

  return { data, loading, notFound }
}
