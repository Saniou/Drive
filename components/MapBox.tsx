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
  const containerRef = useRef<HTMLDivElement>(null)

  // Mapbox doesn't repaint when only its container resizes (e.g. dragging the
  // split divider), leaving a blank gap. Resize the map on any container change.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => mapRef.current?.resize())
    observer.observe(el)
    return () => observer.disconnect()
  }, [userLocation])

  // Fly to a single point only while the other end isn't set yet.
  useEffect(() => {
    if (source && !destination) {
      mapRef.current?.flyTo({ center: [source.lng, source.lat], ...FLY_TO_OPTIONS })
    }
  }, [source, destination])

  useEffect(() => {
    if (destination && !source) {
      mapRef.current?.flyTo({
        center: [destination.lng, destination.lat],
        ...FLY_TO_OPTIONS,
      })
    }
  }, [destination, source])

  // Build the route whenever both ends are set (order-independent) and frame
  // both points so the whole path is visible.
  useEffect(() => {
    if (!source || !destination) return

    fetchDirections(source, destination).then(setDirectionData)

    mapRef.current?.fitBounds(
      [
        [source.lng, source.lat],
        [destination.lng, destination.lat],
      ],
      { padding: 80, duration: 2000 }
    )
  }, [source, destination, setDirectionData])

  if (!userLocation) return null

  return (
    <div
      ref={containerRef}
      className="relative h-[60vh] overflow-hidden rounded-3xl border border-white/10 shadow-glow ring-1 ring-brand-500/20 md:h-[calc(100vh-7.5rem)]"
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: userLocation.lng,
          latitude: userLocation.lat,
          zoom: 14,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/sanio/closwhh3200tj01qmgdi0f3uu"
      >
        <Markers />
        {directionData?.routes?.[0] && (
          <MapBoxRoute
            coordinates={directionData.routes[0].geometry.coordinates}
          />
        )}
      </Map>
      <div className="absolute bottom-5 right-5 z-20">
        <DistantTime />
      </div>
    </div>
  )
}
