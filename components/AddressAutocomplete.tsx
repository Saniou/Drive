'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { AddressSuggestion, Coordinates } from '@/lib/types'
import { retrieveCoordinates, SESSION_TOKEN } from '@/lib/mapbox'

interface AddressAutocompleteProps {
  icon: string
  placeholder: string
  /** Fired with coordinates when a suggestion is picked, or null when the
   * field no longer holds a confirmed address (e.g. the user edits the text). */
  onChange: (coords: Coordinates | null, label: string) => void
  /** Externally set value (e.g. picking a saved place). Pass a NEW object each
   * time to re-apply; the field fills in and reports the coordinates. */
  inject?: { label: string; coords: Coordinates } | null
}

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 400

export default function AddressAutocomplete({
  icon,
  placeholder,
  onChange,
  inject,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  // True while the input mirrors a confirmed selection (suppresses refetch).
  const [confirmed, setConfirmed] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Apply an externally injected place (saved place / quick pick).
  useEffect(() => {
    if (!inject) return
    setQuery(inject.label)
    setConfirmed(true)
    setOpen(false)
    setSuggestions([])
    onChange(inject.coords, inject.label)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inject])

  // Debounced suggestion fetch.
  useEffect(() => {
    if (confirmed) return

    const q = query.trim()
    if (q.length < MIN_QUERY_LENGTH) {
      setSuggestions([])
      setOpen(false)
      return
    }

    const handle = setTimeout(async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ q, session_token: SESSION_TOKEN })
        const res = await fetch(`/api/search-address?${params.toString()}`)
        const data = await res.json()
        setSuggestions(Array.isArray(data?.suggestions) ? data.suggestions : [])
        setActiveIndex(-1)
        setOpen(true)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(handle)
  }, [query, confirmed])

  // Close the dropdown when clicking outside the component.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleInput = (value: string) => {
    setQuery(value)
    setConfirmed(false)
    onChange(null, value)
  }

  const handleSelect = async (item: AddressSuggestion) => {
    setQuery(item.full_address)
    setConfirmed(true)
    setOpen(false)
    setSuggestions([])

    const coords = await retrieveCoordinates(item.mapbox_id)
    onChange(coords, item.full_address)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((i) => (i + 1) % suggestions.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
        break
      case 'Enter':
        if (activeIndex >= 0) {
          event.preventDefault()
          handleSelect(suggestions[activeIndex])
        }
        break
      case 'Escape':
        setOpen(false)
        break
    }
  }

  return (
    <div ref={containerRef} className="relative mt-4">
      <div className="glass-input flex items-center gap-3 rounded-2xl px-4 py-3.5">
        <Image src={icon} width={16} height={16} alt="" className="opacity-80" />
        <input
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {loading && (
          <span
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-brand-400 border-t-transparent"
            aria-label="Loading"
          />
        )}
      </div>

      {open && (
        <div className="absolute z-40 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-white/10 bg-[#120f18] shadow-glow-lg">
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <button
                type="button"
                key={item.mapbox_id ?? index}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex w-full items-start gap-3 border-l-2 px-4 py-3 text-left transition-colors ${
                  index === activeIndex
                    ? 'border-brand-500 bg-brand-500/10'
                    : 'border-transparent'
                }`}
              >
                <span className="mt-0.5 grayscale">📍</span>
                <span className="min-w-0">
                  <span
                    className={`block truncate text-sm font-medium ${
                      index === activeIndex ? 'text-brand-400' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.place_formatted && (
                    <span className="block truncate text-xs text-white/40">
                      {item.place_formatted}
                    </span>
                  )}
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-4 text-sm text-white/50">
              {loading ? 'Searching…' : 'No matching places found'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
