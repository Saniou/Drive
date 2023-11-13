'use client'

import MapBox from '@/components/MapBox'
import NavBar from '@/components/NavBar'
import SearchInput from '@/components/SearchInput'
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SourceCordiContext } from '@/context/SourceCoordiContext'
import { UserLocationContext } from '@/context/UserLocationContext'
import { useEffect, useState } from 'react'

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>()
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([])
  const [destinationsCoordinates, setDestinationsCoordinates] = useState<any>([])
  const [directionData, setDirectionData] = useState<any>([])

  useEffect(() => {
    getUserLocation();
  }, [])

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }
  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <SourceCordiContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
        <DestinationCordiContext.Provider value={{ destinationsCoordinates, setDestinationsCoordinates }}>
          <DirectionDataContext.Provider value={{directionData, setDirectionData}}>
          <div>
            <NavBar />
          </div>
          <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div>
              <SearchInput />
            </div>
            <div className='col-span-2 w-50 h-50 order-first md:order-last'>
              <MapBox />
            </div>
          </div>
          </DirectionDataContext.Provider>
        </DestinationCordiContext.Provider>
      </SourceCordiContext.Provider>
    </UserLocationContext.Provider>
  )
}
