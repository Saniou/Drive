"use client"

import React, { useContext, useState } from 'react'
import carList from './data/CarList'
import Image from 'next/image'
import { DirectionDataContext } from '@/context/DirectionDataContext'

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>()
  const { directionData, setDirectionData } = useContext(DirectionDataContext)
  const getCost = (charges:any) => {
    return (
      (charges * directionData.routes[0].distance * 0.00062137).toFixed(0)
    )
  }

  return (
    <div className='mt-8'>
      <div className=' grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
        {carList.map((item: any, index: number) => (
          <div className={`hover:bg-slate-800 rounded-lg cursor-pointer items-center justify-center text-center p-2 m-2 transition-all ${index === selectedCar ? 'border border-pink-900 bg-pink-900/40 ' : 'border border-white/20'} `} key={index} onClick={() => setSelectedCar(index)}>
            <Image src={item.image} alt={item.name} width={150} height={100}
              className={`w-full grayscale hover:grayscale-0 ${index === selectedCar ? 'grayscale-0' : null} transition-all`} />
            <h2 className='text-[15px] mt-2'>{item.name}</h2>
            {directionData.routes ? (
              <span className='text-pink-500'>{getCost(item.charges)}$</span>
            ) : null}

          </div>
        ))}
      </div>
    </div>
  )
}

export default Cars
