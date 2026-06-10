'use client'

import Image from 'next/image'
import cardList from './data/CardList'
import { useRide } from '@/context/RideContext'
import type { PaymentMethod } from '@/lib/types'

export default function Cards() {
  const { selectedPayment, setSelectedPayment } = useRide()

  return (
    <div className="mt-6">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
        Payment method
      </h2>
      <div className="grid grid-cols-5 gap-2">
        {cardList.map((card: PaymentMethod) => {
          const isSelected = selectedPayment?.id === card.id
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelectedPayment(card)}
              title={card.name}
              className={`tile group flex h-20 items-center justify-center p-3 hover:scale-[1.04] ${
                isSelected ? 'tile-active' : ''
              }`}
            >
              <Image
                src={card.image}
                alt={card.name}
                width={64}
                height={64}
                className={`h-9 w-auto max-w-[75%] object-contain transition-all duration-300 group-hover:grayscale-0 ${
                  isSelected ? 'grayscale-0' : 'grayscale'
                }`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
