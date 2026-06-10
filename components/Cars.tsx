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
    <div className="mt-8">
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {carList.map((car: Car) => {
          const isSelected = selectedCar?.id === car.id
          const cost = getCost(car.charges)
          return (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={`m-2 cursor-pointer items-center justify-center rounded-lg p-2 text-center transition-all hover:bg-slate-800 ${
                isSelected
                  ? 'border border-pink-900 bg-pink-900/40'
                  : 'border border-white/20'
              }`}
            >
              <Image
                src={car.image}
                alt={car.name}
                width={150}
                height={100}
                className={`w-full transition-all hover:grayscale-0 ${
                  isSelected ? 'grayscale-0' : 'grayscale'
                }`}
              />
              <h2 className="mt-2 text-[15px]">{car.name}</h2>
              {cost !== null && <span className="text-pink-500">{cost}$</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
