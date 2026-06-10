'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface SplitPaneProps {
  left: ReactNode
  right: ReactNode
  /** Initial width of the left pane, in percent. */
  initial?: number
  min?: number
  max?: number
}

/**
 * Horizontal resizable split. On md+ the two panes sit side by side with a
 * draggable divider that changes their ratio; on mobile they simply stack.
 */
export default function SplitPane({
  left,
  right,
  initial = 34,
  min = 22,
  max = 65,
}: SplitPaneProps) {
  const [leftPct, setLeftPct] = useState(initial)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const startDrag = () => {
    dragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      setLeftPct(Math.min(max, Math.max(min, pct)))
    }
    const stop = () => {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', stop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', stop)
    }
  }, [min, max])

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-5 md:grid md:gap-0"
      style={{ gridTemplateColumns: `${leftPct}% 16px 1fr` }}
    >
      <div className="order-2 min-w-0 md:order-none md:pr-1">{left}</div>

      <div
        onMouseDown={startDrag}
        onDoubleClick={() => setLeftPct(initial)}
        role="separator"
        aria-orientation="vertical"
        title="Drag to resize · double-click to reset"
        className="group order-3 hidden cursor-col-resize items-center justify-center md:order-none md:flex"
      >
        <div className="h-24 w-1.5 rounded-full bg-white/15 transition-all duration-200 group-hover:h-32 group-hover:bg-brand-500 group-hover:shadow-glow" />
      </div>

      <div className="order-1 min-w-0 md:order-none">{right}</div>
    </div>
  )
}
