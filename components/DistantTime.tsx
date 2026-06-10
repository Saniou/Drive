'use client'

import { useRide } from '@/context/RideContext'

const MILES_PER_METER = 0.0006213

export default function DistantTime() {
  const { directionData } = useRide()
  const route = directionData?.routes?.[0]

  if (!route) return null

  return (
    <div className="bg-black p-5">
      <h2 className="text-[15px] opacity-80">
        Distance:{' '}
        <span className="mr-3 font-bold text-pink-500">
          {(route.distance * MILES_PER_METER).toFixed(2)} Miles
        </span>
        Duration:{' '}
        <span className="mr-3 font-bold text-pink-500">
          {(route.duration / 60).toFixed(2)} Min
        </span>
      </h2>
    </div>
  )
}
