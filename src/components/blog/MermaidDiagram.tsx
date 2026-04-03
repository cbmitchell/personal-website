import { useEffect, useId, useRef } from 'react'
import mermaid from 'mermaid'

interface Props {
  chart: string
}

mermaid.initialize({ startOnLoad: false, theme: 'dark' })

export function MermaidDiagram({ chart }: Props) {
  const id = useId().replace(/:/g, '')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
      if (ref.current) ref.current.innerHTML = svg
    })
  }, [id, chart])

  return <div ref={ref} />
}
