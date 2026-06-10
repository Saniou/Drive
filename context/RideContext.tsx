'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Car, Coordinates, DirectionData, PaymentMethod } from '@/lib/types'

interface RideContextValue {
  userLocation: Coordinates | null
  setUserLocation: (value: Coordinates | null) => void

  source: Coordinates | null
  setSource: (value: Coordinates | null) => void

  destination: Coordinates | null
  setDestination: (value: Coordinates | null) => void

  directionData: DirectionData | null
  setDirectionData: (value: DirectionData | null) => void

  selectedCar: Car | null
  setSelectedCar: (value: Car | null) => void

  selectedPayment: PaymentMethod | null
  setSelectedPayment: (value: PaymentMethod | null) => void
}

const RideContext = createContext<RideContextValue | null>(null)

export function RideProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [source, setSource] = useState<Coordinates | null>(null)
  const [destination, setDestination] = useState<Coordinates | null>(null)
  const [directionData, setDirectionData] = useState<DirectionData | null>(null)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null)

  const value = useMemo<RideContextValue>(
    () => ({
      userLocation,
      setUserLocation,
      source,
      setSource,
      destination,
      setDestination,
      directionData,
      setDirectionData,
      selectedCar,
      setSelectedCar,
      selectedPayment,
      setSelectedPayment,
    }),
    [
      userLocation,
      source,
      destination,
      directionData,
      selectedCar,
      selectedPayment,
    ]
  )

  return <RideContext.Provider value={value}>{children}</RideContext.Provider>
}

export function useRide(): RideContextValue {
  const ctx = useContext(RideContext)
  if (!ctx) {
    throw new Error('useRide must be used within a <RideProvider>')
  }
  return ctx
}
