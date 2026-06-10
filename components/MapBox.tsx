'use client'

import { Map } from 'react-map-gl'
import { useEffect, useRef } from 'react'
import type { MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Markers from './Markers'
import MapBoxRoute from './MapBoxRoute'
import DistantTime from './DistantTime'
import { useRide } from '@/context/RideContext'
import { fetchDirections } from '@/lib/mapbox'

const FLY_TO_OPTIONS = { duration: 2500, zoom: 12 } as const

export default function MapBox() {
  const { userLocation, source, destination, directionData, setDirectionData } =
    useRide()

  const mapRef = useRef<MapRef>(null)

  useEffect(() => {
    if (source) {
      mapRef.current?.flyTo({ center: [source.lng, source.lat], ...FLY_TO_OPTIONS })
    }
  }, [source])

  useEffect(() => {
    if (destination) {
      mapRef.current?.flyTo({
        center: [destination.lng, destination.lat],
        ...FLY_TO_OPTIONS,
      })
    }

    if (source && destination) {
      fetchDirections(source, destination).then(setDirectionData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination])

  if (!userLocation) return null

  return (
    <>
      <div className="overflow-hidden rounded-lg">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: userLocation.lng,
            latitude: userLocation.lat,
            zoom: 14,
          }}
          style={{ width: '100%', height: 800, borderRadius: 10 }}
          mapStyle="mapbox://styles/sanio/closwhh3200tj01qmgdi0f3uu"
        >
          <Markers />
          {directionData?.routes?.[0] && (
            <MapBoxRoute
              coordinates={directionData.routes[0].geometry.coordinates}
            />
          )}
        </Map>
      </div>
      <div className="absolute bottom-[40px] right-[20px] z-20 hidden md:block">
        <DistantTime />
      </div>
    </>
  )
}
