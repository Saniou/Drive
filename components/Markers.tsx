'use client'
import { Marker } from 'react-map-gl';
import { UserLocationContext } from '@/context/UserLocationContext';
import { useContext } from 'react';
import Image from 'next/image';
import 'mapbox-gl/dist/mapbox-gl.css'
import { SourceCordiContext } from '@/context/SourceCoordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';

function Markers() {

    const { userLocation, setUserLocation } = useContext(UserLocationContext)

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext)
    const { destinationsCoordinates, setDestinationsCoordinates } = useContext(DestinationCordiContext)

    return (
        <div>
            <Marker
                style={{ width: '40px' }}
                longitude={userLocation?.lng}
                latitude={userLocation?.lat}
                anchor="bottom" >
                <Image
                    width={30}
                    height={30}
                    src="/pin11.png"
                    alt='pin' />
            </Marker>

            {sourceCoordinates.length!=0 ?
                <Marker
                    style={{ width: '40px' }}
                    longitude={sourceCoordinates?.lng}
                    latitude={sourceCoordinates?.lat}
                    anchor="bottom" >
                    <Image
                        width={30}
                        height={30}
                        src="/pin.png"
                        alt='pin' />
                </Marker> : null}

                {destinationsCoordinates.length!=0 ?
                <Marker
                    style={{ width: '40px' }}
                    longitude={destinationsCoordinates?.lng}
                    latitude={destinationsCoordinates?.lat}
                    anchor="bottom" >
                    <Image
                        width={30}
                        height={30}
                        src="/pin1.svg"
                        alt='pin' />
                </Marker> : null}
        </div >
    )
}

export default Markers
