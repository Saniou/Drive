'use client'

import { useEffect, useState } from 'react'

export interface RideSummary {
  type: 'ride' | 'package'
  optionName: string
  paymentName: string
  pickupLabel: string
  dropoffLabel: string
  distance: number // meters
  duration: number // seconds
  price: number
}

const MILES_PER_METER = 0.00062137

export default function RideConfirmModal({
  ride,
  onClose,
}: {
  ride: RideSummary | null
  onClose: () => void
}) {
  const [shownPrice, setShownPrice] = useState(0)

  useEffect(() => {
    if (!ride) return
    let raf: number
    let start: number | undefined
    const duration = 900
    const step = (t: number) => {
      if (start === undefined) start = t
      const p = Math.min(1, (t - start) / duration)
      setShownPrice(Math.round(ride.price * p))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [ride])

  if (!ride) return null

  const isPackage = ride.type === 'package'

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass animate-fade-up w-full max-w-md rounded-3xl p-7 shadow-glow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl grayscale">{isPackage ? '📦' : '🚗'}</span>
          <div>
            <h2 className="text-xl font-bold">
              {isPackage ? 'Courier booked!' : 'Ride booked!'}
            </h2>
            <p className="text-sm text-white/50">
              Your {ride.optionName} is on the way
            </p>
          </div>
        </div>

        <div className="my-6 text-center">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Total
          </p>
          <p className="bg-brand-gradient bg-clip-text text-5xl font-extrabold text-transparent">
            {shownPrice}$
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="flex items-start gap-2 text-white/80">
            <span className="text-brand-400/70">●</span>
            <span className="truncate">{ride.pickupLabel}</span>
          </p>
          <p className="flex items-start gap-2 text-white/80">
            <span className="text-brand-400">◉</span>
            <span className="truncate">{ride.dropoffLabel}</span>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
          <span className="text-white/60">
            {(ride.distance * MILES_PER_METER).toFixed(1)} mi
          </span>
          <span className="text-white/60">
            ~{(ride.duration / 60).toFixed(0)} min
          </span>
          <span className="text-white/60">{ride.paymentName}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn-brand mt-6 w-full py-3 text-base"
        >
          Done
        </button>
      </div>
    </div>
  )
}
