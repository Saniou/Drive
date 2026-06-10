'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import AddressAutocomplete from './AddressAutocomplete'
import Packages from './Packages'
import Cards from './Cards'
import { useRide } from '@/context/RideContext'
import { useReveal } from '@/lib/useReveal'
import type { PackageTier } from '@/lib/types'

export default function PackageForm() {
  const { setSource, setDestination, source, destination, selectedPayment } =
    useRide()
  const [tier, setTier] = useState<PackageTier | null>(null)

  const scope = useReveal<HTMLDivElement>()

  const handleSubmit = () => {
    const missing: string[] = []
    if (!source) missing.push('pickup address')
    if (!destination) missing.push('delivery address')
    if (!tier) missing.push('a package size')
    if (!selectedPayment) missing.push('a payment method')

    if (missing.length > 0) {
      toast.error(`Please choose ${missing.join(', ')}.`)
      return
    }

    toast.success(`Courier booked! Your ${tier?.name} parcel is on the way 📦`)
  }

  return (
    <div ref={scope} className="glass rounded-3xl p-6 shadow-glow">
      <div data-reveal>
        <h1 className="bg-brand-gradient bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Send a package
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Door-to-door courier, priced by distance.
        </p>
      </div>

      <div data-reveal>
        <AddressAutocomplete
          icon="/location.svg"
          placeholder="Pickup Address"
          onChange={(coords) => setSource(coords)}
        />
      </div>

      <div data-reveal>
        <AddressAutocomplete
          icon="/dest.svg"
          placeholder="Delivery Address"
          onChange={(coords) => setDestination(coords)}
        />
      </div>

      <div data-reveal>
        <Packages selected={tier} onSelect={setTier} />
      </div>

      <div data-reveal>
        <Cards />
      </div>

      <button
        data-reveal
        type="button"
        onClick={handleSubmit}
        className="btn-brand mt-8 w-full py-3.5 text-base"
      >
        Send package
      </button>
    </div>
  )
}
