'use client'

import packageList from './data/PackageList'
import { useRide } from '@/context/RideContext'
import type { PackageTier } from '@/lib/types'

const MILES_PER_METER = 0.00062137

interface PackagesProps {
  selected: PackageTier | null
  onSelect: (tier: PackageTier) => void
}

export default function Packages({ selected, onSelect }: PackagesProps) {
  const { directionData } = useRide()
  const distance = directionData?.routes?.[0]?.distance

  const getCost = (charges: number) => {
    if (distance === undefined) return null
    return (charges * distance * MILES_PER_METER).toFixed(0)
  }

  return (
    <div className="mt-6">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
        Package size
      </h2>
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {packageList.map((tier) => {
          const isSelected = selected?.id === tier.id
          const cost = getCost(tier.charges)
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => onSelect(tier)}
              className={`tile p-3 text-center ${
                isSelected ? 'tile-active' : ''
              }`}
            >
              <div className="text-3xl grayscale">{tier.emoji}</div>
              <h3 className="mt-1 text-[13px] font-medium text-white">
                {tier.name}
              </h3>
              <p className="text-[11px] text-white/40">{tier.hint}</p>
              {cost !== null && (
                <span className="text-sm font-semibold text-brand-400">
                  {cost}$
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
