'use client'

import { useState } from 'react'
import AddressAutocomplete from './AddressAutocomplete'
import Cars from './Cars'
import Cards from './Cards'
import { useRide } from '@/context/RideContext'

interface FormErrors {
  pickup?: string
  dropoff?: string
  car?: string
  payment?: string
}

export default function SearchInput() {
  const {
    setSource,
    setDestination,
    source,
    destination,
    selectedCar,
    selectedPayment,
  } = useRide()

  const [errors, setErrors] = useState<FormErrors>({})
  const [confirmed, setConfirmed] = useState(false)

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!source) next.pickup = 'Choose a pickup location from the list'
    if (!destination) next.dropoff = 'Choose a drop off location from the list'
    if (!selectedCar) next.car = 'Select a car'
    if (!selectedPayment) next.payment = 'Select a payment method'
    return next
  }

  const handleSubmit = () => {
    const next = validate()
    setErrors(next)
    setConfirmed(Object.keys(next).length === 0)
  }

  return (
    <div className="rounded-xl border-[3px] border-gray-800 p-5 md:pb-5">
      <p className="text-2xl font-bold">Get a ride</p>

      <AddressAutocomplete
        icon="/location.svg"
        placeholder="Pickup Location"
        error={errors.pickup}
        onChange={(coords) => {
          setSource(coords)
          if (coords) setErrors((e) => ({ ...e, pickup: undefined }))
          setConfirmed(false)
        }}
      />

      <AddressAutocomplete
        icon="/dest.svg"
        placeholder="Drop Off Location"
        error={errors.dropoff}
        onChange={(coords) => {
          setDestination(coords)
          if (coords) setErrors((e) => ({ ...e, dropoff: undefined }))
          setConfirmed(false)
        }}
      />

      <Cars error={errors.car} />
      <Cards error={errors.payment} />

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-8 w-full rounded-full bg-pink-500 p-3 text-white transition-colors hover:bg-pink-600"
      >
        I&apos;m drive!
      </button>

      {confirmed && (
        <p className="mt-3 text-center text-sm text-green-400">
          Ride requested! Your {selectedCar?.name} is on the way 🚗
        </p>
      )}
    </div>
  )
}
