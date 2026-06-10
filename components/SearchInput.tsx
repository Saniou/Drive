'use client'

import toast from 'react-hot-toast'
import AddressAutocomplete from './AddressAutocomplete'
import Cars from './Cars'
import Cards from './Cards'
import { useRide } from '@/context/RideContext'

export default function SearchInput() {
  const {
    setSource,
    setDestination,
    source,
    destination,
    selectedCar,
    selectedPayment,
  } = useRide()

  const handleSubmit = () => {
    const missing: string[] = []
    if (!source) missing.push('pickup location')
    if (!destination) missing.push('drop off location')
    if (!selectedCar) missing.push('a car')
    if (!selectedPayment) missing.push('a payment method')

    if (missing.length > 0) {
      toast.error(`Please choose ${missing.join(', ')}.`)
      return
    }

    toast.success(`Ride requested! Your ${selectedCar?.name} is on the way 🚗`)
  }

  return (
    <div className="rounded-xl border-[3px] border-gray-800 p-5 md:pb-5">
      <p className="text-2xl font-bold">Get a ride</p>

      <AddressAutocomplete
        icon="/location.svg"
        placeholder="Pickup Location"
        onChange={(coords) => setSource(coords)}
      />

      <AddressAutocomplete
        icon="/dest.svg"
        placeholder="Drop Off Location"
        onChange={(coords) => setDestination(coords)}
      />

      <Cars />
      <Cards />

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-8 w-full rounded-full bg-pink-500 p-3 text-white transition-colors hover:bg-pink-600"
      >
        I&apos;m drive!
      </button>
    </div>
  )
}
