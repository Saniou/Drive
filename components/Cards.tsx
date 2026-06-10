'use client'

import Image from 'next/image'
import cardList from './data/CardList'
import { useRide } from '@/context/RideContext'
import type { PaymentMethod } from '@/lib/types'

export default function Cards() {
  const { selectedPayment, setSelectedPayment } = useRide()

  return (
    <div>
      <h2 className="-mb-2 mt-2 flex items-center justify-center font-medium">
        Payment Methods
      </h2>
      <div className="mt-5 grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5">
        {cardList.map((card: PaymentMethod) => {
          const isSelected = selectedPayment?.id === card.id
          return (
            <div
              key={card.id}
              onClick={() => setSelectedPayment(card)}
              title={card.name}
              className={`m-2 flex w-[90px] cursor-pointer items-center justify-center rounded-lg p-2 text-center transition-all hover:scale-110 hover:bg-slate-800 ${
                isSelected
                  ? 'border border-pink-900 bg-pink-900/40'
                  : 'border border-white/20'
              }`}
            >
              <Image
                src={card.image}
                alt={card.name}
                width={80}
                height={80}
                className={`items-center transition-all hover:grayscale-0 ${
                  isSelected ? 'grayscale-0' : 'grayscale'
                }`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
