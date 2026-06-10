'use client'

import { Marker } from 'react-map-gl'
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRide } from '@/context/RideContext'

export default function Markers() {
  const { userLocation, source, destination } = useRide()

  return (
    <>
      {userLocation && (
        <Marker
          style={{ width: '40px' }}
          longitude={userLocation.lng}
          latitude={userLocation.lat}
          anchor="bottom"
        >
          <Image width={30} height={30} src="/pin11.png" alt="Your location" />
        </Marker>
      )}

      {source && (
        <Marker
          style={{ width: '40px' }}
          longitude={source.lng}
          latitude={source.lat}
          anchor="bottom"
        >
          <Image width={30} height={30} src="/pin.png" alt="Pickup" />
        </Marker>
      )}

      {destination && (
        <Marker
          style={{ width: '40px' }}
          longitude={destination.lng}
          latitude={destination.lat}
          anchor="bottom"
        >
          <Image width={30} height={30} src="/pin1.svg" alt="Drop off" />
        </Marker>
      )}
    </>
  )
}
