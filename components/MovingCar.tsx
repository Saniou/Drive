'use client'

import { Marker } from 'react-map-gl'
import { useEffect, useRef, useState } from 'react'

/**
 * A car marker that loops along the given route coordinates, making the route
 * feel alive. Position is interpolated between consecutive points.
 */
export default function MovingCar({
  coordinates,
}: {
  coordinates: [number, number][]
}) {
  const [pos, setPos] = useState<[number, number] | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!coordinates || coordinates.length < 2) {
      setPos(null)
      return
    }

    // Duration scales with route length, clamped to a pleasant range.
    const duration = Math.min(14000, Math.max(5000, coordinates.length * 3))
    let startTime: number | undefined

    const tick = (now: number) => {
      if (startTime === undefined) startTime = now
      const progress = ((now - startTime) % duration) / duration
      const f = progress * (coordinates.length - 1)
      const i = Math.floor(f)
      const frac = f - i
      const a = coordinates[i]
      const b = coordinates[Math.min(i + 1, coordinates.length - 1)]
      setPos([a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac])
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [coordinates])

  if (!pos) return null

  return (
    <Marker longitude={pos[0]} latitude={pos[1]} anchor="center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base grayscale shadow-[0_0_16px_rgba(236,72,153,0.95)]">
        🚗
      </div>
    </Marker>
  )
}
