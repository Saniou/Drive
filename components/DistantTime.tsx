'use client'

import { useRide } from '@/context/RideContext'

const MILES_PER_METER = 0.0006213

export default function DistantTime() {
  const { directionData } = useRide()
  const route = directionData?.routes?.[0]

  if (!route) return null

  return (
    <div className="glass flex items-center gap-5 rounded-2xl px-5 py-3 shadow-glow">
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/40">
          Distance
        </p>
        <p className="text-lg font-bold text-brand-400">
          {(route.distance * MILES_PER_METER).toFixed(1)}
          <span className="ml-1 text-xs font-normal text-white/50">mi</span>
        </p>
      </div>
      <div className="h-8 w-px bg-white/10" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/40">
          Duration
        </p>
        <p className="text-lg font-bold text-brand-400">
          {(route.duration / 60).toFixed(0)}
          <span className="ml-1 text-xs font-normal text-white/50">min</span>
        </p>
      </div>
    </div>
  )
}
