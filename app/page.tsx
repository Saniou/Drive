'use client'

import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import MapBox from '@/components/MapBox'
import NavBar from '@/components/NavBar'
import SearchInput from '@/components/SearchInput'
import { RideProvider, useRide } from '@/context/RideContext'

function RidePlanner() {
  const { setUserLocation } = useRide()

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => console.warn('Geolocation unavailable:', err.message)
    )
  }, [setUserLocation])

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid rgba(236, 72, 153, 0.4)',
          },
          success: { iconTheme: { primary: '#ec4899', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ec4899', secondary: '#fff' } },
        }}
      />
      <NavBar />
      <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3">
        <div>
          <SearchInput />
        </div>
        <div className="order-first col-span-2 md:order-last">
          <MapBox />
        </div>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <RideProvider>
      <RidePlanner />
    </RideProvider>
  )
}
