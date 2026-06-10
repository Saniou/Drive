'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import AddressAutocomplete from './AddressAutocomplete'
import SavedPlaces from './SavedPlaces'
import Cars from './Cars'
import Cards from './Cards'
import RideConfirmModal from './RideConfirmModal'
import type { RideSummary } from './RideConfirmModal'
import { useRide } from '@/context/RideContext'
import { useReveal } from '@/lib/useReveal'
import { addRecent } from '@/lib/savedPlaces'
import type { Coordinates } from '@/lib/types'

const MILES_PER_METER = 0.00062137

export default function SearchInput() {
  const {
    setSource,
    setDestination,
    source,
    destination,
    directionData,
    selectedCar,
    selectedPayment,
  } = useRide()

  const [pickupLabel, setPickupLabel] = useState('')
  const [dropoffLabel, setDropoffLabel] = useState('')
  const [injectPickup, setInjectPickup] = useState<{
    label: string
    coords: Coordinates
  } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<RideSummary | null>(null)

  const scope = useReveal<HTMLDivElement>()

  const remember = (coords: Coordinates, label: string) => {
    addRecent({ label, lng: coords.lng, lat: coords.lat })
  }

  const handleSubmit = async () => {
    const missing: string[] = []
    if (!source) missing.push('pickup location')
    if (!destination) missing.push('drop off location')
    if (!selectedCar) missing.push('a car')
    if (!selectedPayment) missing.push('a payment method')

    if (missing.length > 0) {
      toast.error(`Please choose ${missing.join(', ')}.`)
      return
    }

    const distance = directionData?.routes?.[0]?.distance ?? 0
    const duration = directionData?.routes?.[0]?.duration ?? 0
    const price = Number(
      (selectedCar!.charges * distance * MILES_PER_METER).toFixed(0)
    )

    const summary: RideSummary = {
      type: 'ride',
      optionName: selectedCar!.name,
      paymentName: selectedPayment!.name,
      pickupLabel,
      dropoffLabel,
      distance,
      duration,
      price,
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...summary,
          pickupLng: source!.lng,
          pickupLat: source!.lat,
          dropoffLng: destination!.lng,
          dropoffLat: destination!.lat,
        }),
      })
      if (!res.ok) throw new Error('save failed')
      setConfirmed(summary)
    } catch {
      toast.error('Could not book the ride. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div ref={scope} className="glass rounded-3xl p-6 shadow-glow">
      <div data-reveal>
        <h1 className="bg-brand-gradient bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Get a ride
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Pick your route, car and pay your way.
        </p>
      </div>

      <div data-reveal>
        <AddressAutocomplete
          icon="/location.svg"
          placeholder="Pickup Location"
          inject={injectPickup}
          onChange={(coords, label) => {
            setSource(coords)
            if (coords) {
              setPickupLabel(label)
              remember(coords, label)
            }
          }}
        />
        <SavedPlaces
          onPick={(p) =>
            setInjectPickup({ label: p.label, coords: { lng: p.lng, lat: p.lat } })
          }
        />
      </div>

      <div data-reveal>
        <AddressAutocomplete
          icon="/dest.svg"
          placeholder="Drop Off Location"
          onChange={(coords, label) => {
            setDestination(coords)
            if (coords) {
              setDropoffLabel(label)
              remember(coords, label)
            }
          }}
        />
      </div>

      <div data-reveal>
        <Cars />
      </div>

      <div data-reveal>
        <Cards />
      </div>

      <button
        data-reveal
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="btn-brand mt-8 w-full py-3.5 text-base disabled:opacity-60"
      >
        {submitting ? 'Booking…' : "I'm drive!"}
      </button>

      <RideConfirmModal ride={confirmed} onClose={() => setConfirmed(null)} />
    </div>
  )
}
