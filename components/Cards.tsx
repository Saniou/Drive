'use client'

import React, { useState } from 'react'
import cardList from './data/CardList'
import Image from 'next/image'

function Cards() {
  const [ selectedCard, setSelectedCard ] = useState<any>()
  return (
    <div>
      <h2 className='mt-2 -mb-2 items-center justify-center flex font-medium'>Payment Methods</h2>
      <div className=' grid grid-cols-5 mt-5 md:grid-cols-2 lg:grid-cols-5'>
        {cardList.map((item: any, index: number) => (
          <div className={`hover:bg-slate-800 w-[90px] flex rounded-lg cursor-pointer items-center hover:scale-110 justify-center text-center p-2 m-2 transition-all ${index === selectedCard ? 'border border-pink-900 bg-pink-900/40 ' : 'border border-white/20'} `} key={index} onClick={() => setSelectedCard(index)}>
            <Image src={item.image} alt={item.name} width={80} height={80}
              className={`items-center grayscale hover:grayscale-0 ${index === selectedCard ? 'grayscale-0' : null} transition-all`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards
