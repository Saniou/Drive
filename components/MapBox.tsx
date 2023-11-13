'use client'

import { Map } from 'react-map-gl';
import { UserLocationContext } from '@/context/UserLocationContext';
import { useContext, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'
import Markers from './Markers';
import { SourceCordiContext } from '@/context/SourceCoordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import MapBoxRoute from './MapBoxRoute';
import DistantTime from './DistantTime';

const MAPBOX_DRIVING_ENDPOINT = "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "06675752-1b97-4391-88ba-e20ff3c0942c";

function MapBox() {

  const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext)
  const { destinationsCoordinates, setDestinationsCoordinates } = useContext(DestinationCordiContext)
  const { directionData, setDirectionData } = useContext(DirectionDataContext)

  const mapRef = useRef<any>()
  const { userLocation, setUserLocation } = useContext(UserLocationContext)

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [
          sourceCoordinates.lng,
          sourceCoordinates.lat
        ],
        duration: 2500,
        zoom: 12
      })
    }
  }, [sourceCoordinates])

  useEffect(() => {
    if (destinationsCoordinates) {
      mapRef.current?.flyTo({
        center: [
          destinationsCoordinates.lng,
          destinationsCoordinates.lat
        ],
        duration: 2500,
        zoom: 12
      })
    }

    if (sourceCoordinates && destinationsCoordinates) {
      getDirectionRoute()
    }

  }, [destinationsCoordinates])

  const getDirectionRoute = async () => {
    const res = await fetch(MAPBOX_DRIVING_ENDPOINT + sourceCoordinates.lng + ',' + sourceCoordinates.lat + ';' + destinationsCoordinates.lng + ',' + destinationsCoordinates.lat + '?overview=full&geometries=geojson' + '&access_token=' + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    );
    const result = await res.json()
    console.log(result)
    setDirectionData(result)
  }

  return (
    <>
      <div className='rounded-lg overflow-hidden'>
        {userLocation ?
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14
            }}
            style={{ width: '100%', height: 800, borderRadius: 10 }}
            mapStyle="mapbox://styles/sanio/closwhh3200tj01qmgdi0f3uu"
          >

            <Markers />
            {directionData?.routes ? (
              <MapBoxRoute coordinates={directionData?.routes[0]?.geometry?.coordinates} />
            ) : null}
          </Map> : null}
      </div>
      <div className='absolute bottom-[40px] z-20 right-[20px] hidden md:block'>
        <DistantTime />
      </div>
    </>
  );
}

export default MapBox