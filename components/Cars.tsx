'use client'

import Image from 'next/image'
import carList from './data/CarList'
import { useRide } from '@/context/RideContext'
import type { Car } from '@/lib/types'

const MILES_PER_METER = 0.00062137

export default function Cars() {
  const { directionData, selectedCar, setSelectedCar } = useRide()

  const distance = directionData?.routes?.[0]?.distance

  const getCost = (charges: number) => {
    if (distance === undefined) return null
    return (charges * distance * MILES_PER_METER).toFixed(0)
  }

  return (
    <div className="mt-6">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
        Choose a car
      </h2>
      <div className="grid grid-cols-3 gap-2.5">
        {carList.map((car: Car) => {
          const isSelected = selectedCar?.id === car.id
          const cost = getCost(car.charges)
          return (
            <button
              key={car.id}
              type="button"
              onClick={() => setSelectedCar(car)}
              className={`tile group p-2.5 text-center ${
                isSelected ? 'tile-active' : ''
              }`}
            >
              <Image
                src={car.image}
                alt={car.name}
                width={150}
                height={100}
                className={`mx-auto h-16 w-auto object-contain transition-all duration-300 group-hover:grayscale-0 ${
                  isSelected ? 'grayscale-0' : 'grayscale'
                }`}
              />
              <h3 className="mt-1.5 text-[13px] font-medium text-white">
                {car.name}
              </h3>
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
