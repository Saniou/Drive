'use client'

import { useEffect, useState } from 'react'
import { getHome, getRecent, getWork } from '@/lib/savedPlaces'
import type { SavedPlace } from '@/lib/savedPlaces'

export default function SavedPlaces({
  onPick,
}: {
  onPick: (place: SavedPlace) => void
}) {
  const [home, setHomeS] = useState<SavedPlace | null>(null)
  const [work, setWorkS] = useState<SavedPlace | null>(null)
  const [recent, setRecent] = useState<SavedPlace[]>([])

  useEffect(() => {
    setHomeS(getHome())
    setWorkS(getWork())
    setRecent(getRecent())
  }, [])

  const chips: { icon: string; text: string; place: SavedPlace }[] = []
  if (home) chips.push({ icon: '🏠', text: 'Home', place: home })
  if (work) chips.push({ icon: '💼', text: 'Work', place: work })
  recent.forEach((p) =>
    chips.push({ icon: '🕐', text: p.label.split(',')[0], place: p })
  )

  if (chips.length === 0) return null

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((chip, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(chip.place)}
          title={chip.place.label}
          className="flex max-w-[180px] items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 transition-all hover:border-brand-500/50 hover:text-white"
        >
          <span>{chip.icon}</span>
          <span className="truncate">{chip.text}</span>
        </button>
      ))}
    </div>
  )
}
