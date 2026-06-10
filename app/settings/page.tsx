'use client'

import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import NavBar from '@/components/NavBar'
import AddressAutocomplete from '@/components/AddressAutocomplete'
import {
  clearRecent,
  getHome,
  getRecent,
  getWork,
  setHome,
  setWork,
} from '@/lib/savedPlaces'
import type { SavedPlace } from '@/lib/savedPlaces'
import type { Coordinates } from '@/lib/types'

function SavedRow({
  icon,
  title,
  place,
  onSave,
  onRemove,
}: {
  icon: string
  title: string
  place: SavedPlace | null
  onSave: (coords: Coordinates | null, label: string) => void
  onRemove: () => void
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-semibold">
          <span className="text-lg grayscale">{icon}</span> {title}
        </h3>
        {place && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-white/40 transition-colors hover:text-brand-400"
          >
            Remove
          </button>
        )}
      </div>
      {place && (
        <p className="mt-2 truncate text-sm text-brand-400">{place.label}</p>
      )}
      <AddressAutocomplete
        icon="/location.svg"
        placeholder={place ? 'Change address…' : `Set ${title.toLowerCase()} address`}
        onChange={onSave}
      />
    </div>
  )
}

export default function SettingsPage() {
  const [home, setHomeS] = useState<SavedPlace | null>(null)
  const [work, setWorkS] = useState<SavedPlace | null>(null)
  const [recentCount, setRecentCount] = useState(0)

  useEffect(() => {
    setHomeS(getHome())
    setWorkS(getWork())
    setRecentCount(getRecent().length)
  }, [])

  const save = (
    kind: 'home' | 'work',
    coords: Coordinates | null,
    label: string
  ) => {
    if (!coords) return
    const place: SavedPlace = { label, lng: coords.lng, lat: coords.lat }
    if (kind === 'home') {
      setHome(place)
      setHomeS(place)
    } else {
      setWork(place)
      setWorkS(place)
    }
    toast.success(`${kind === 'home' ? 'Home' : 'Work'} saved`)
  }

  const remove = (kind: 'home' | 'work') => {
    if (kind === 'home') {
      setHome(null)
      setHomeS(null)
    } else {
      setWork(null)
      setWorkS(null)
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid rgba(236, 72, 153, 0.4)',
          },
          success: { iconTheme: { primary: '#ec4899', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ec4899', secondary: '#fff' } },
        }}
      />
      <NavBar />
      <main className="mx-auto max-w-2xl p-4 md:p-6">
        <h1 className="bg-brand-gradient bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Settings
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Save your go-to places for one-tap booking.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <SavedRow
            icon="🏠"
            title="Home"
            place={home}
            onSave={(coords, label) => save('home', coords, label)}
            onRemove={() => remove('home')}
          />
          <SavedRow
            icon="💼"
            title="Work"
            place={work}
            onSave={(coords, label) => save('work', coords, label)}
            onRemove={() => remove('work')}
          />

          <div className="glass flex items-center justify-between rounded-2xl p-5">
            <div>
              <h3 className="font-semibold">Recent searches</h3>
              <p className="text-sm text-white/40">
                {recentCount} saved place{recentCount === 1 ? '' : 's'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                clearRecent()
                setRecentCount(0)
                toast.success('Recent searches cleared')
              }}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-brand-500/50 hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
