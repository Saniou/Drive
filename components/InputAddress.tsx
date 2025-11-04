"use client"
import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { SourceCordiContext } from '@/context/SourceCoordiContext'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'

const session_token = '06675752-1b97-4391-88ba-e20ff3c0942c'
const MAPBOX_RETRIVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'

function InputAddress() {

    const [source, setSource] = useState<any>('')
    const [sourceChange, setSourceChange] = useState<any>(false)
    const [destinationChange, setDestinationChange] = useState<any>(false)

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext)
    const { destinationsCoordinates, setDestinationsCoordinates } = useContext(DestinationCordiContext)

    const [addressList, setAddressList] = useState<any>(null)
    const [destination, setDestination] = useState<any>('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddressList();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [source, destination]);

    const getAddressList = async () => {
        setAddressList(null);
        const query = sourceChange ? source : destination;

        if (query) {
            try {
                const params = new URLSearchParams({
                    q: query,
                    session_token
                });

                const res = await fetch(`/api/search-address?${params.toString()}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) {
                    console.error('Failed to fetch address suggestions', res.statusText);
                    setAddressList({ suggestions: [] });
                    return;
                }

                const result = await res.json();
                setAddressList(result);
            } catch (error) {
                console.error('Unable to fetch address suggestions', error);
                setAddressList({ suggestions: [] });
            }
        } else {
            setAddressList({ suggestions: [] });
        }
    };

    const onSourceAddressClick = async (item: any) => {
        setSource(item.full_address);
        setAddressList([]);
        setSourceChange(false)
        const res = await fetch(MAPBOX_RETRIVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)

        const result = await res.json()

        setSourceCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1],
        })

        console.log(result)
    }

    const onDestinationAddressClick = async (item: any) => {
        setDestination(item.full_address);
        setAddressList([]);
        setDestinationChange(false)
        const res = await fetch(MAPBOX_RETRIVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        const result = await res.json()

        setDestinationsCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1],
        })

        console.log(result)
    }



    return (
        <>
            <div className='flex shadow-md shadow-pink-500 bg-pink-900/40 p-3 rounded-lg mt-8 items-center gap-4 relative'>
                <Image src='/location.svg' width={15} height={15} alt='alt' />
                <input className='bg-transparent w-full outline-none text-white placeholder:text-pink-200' type='text' placeholder='Pickup Location' value={source} onChange={(e) => { setSource(e.target.value); setSourceChange(true); }} />
            </div>
            {addressList?.suggestions && sourceChange ? (
                <div className='shadow-md shadow-pink-500 p-1 rounded-lg absolute z-10 bg-black w-[535px]'>
                    {addressList?.suggestions.map((item: any, index: number) => (
                        <h2 className='p-3 hover:text-pink-400 hover-bg-slate-700 cursor-pointer' onClick={() => {onSourceAddressClick(item)}} key={index}>
                            {item.full_address}
                        </h2>
                    ))}
                </div>
            ) : null}

            <div className='flex shadow-md shadow-pink-500 bg-pink-900/40 p-3 rounded-lg mt-8 items-center gap-4'>
                <Image src='/dest.svg' width={15} height={15} alt='alt' />
                <input className='bg-transparent w-full outline-none text-white placeholder:text-pink-200' type='text' placeholder="Drop Off Location" value={destination} onChange={(e) => { setDestination(e.target.value); setDestinationChange(true); }} />
            </div>
            {addressList?.suggestions && destinationChange ? (
                <div className='shadow-md shadow-pink-500 p-1 rounded-lg absolute z-10 bg-black w-[535px]'>
                    {addressList?.suggestions.map((item: any, index: number) => (
                        <h2 className='p-3 hover:text-pink-400 hover-bg-slate-700 cursor-pointer' onClick={() => {onDestinationAddressClick(item)}} key={index}>
                            {item.full_address}
                        </h2>
                    ))}
                </div>
            ) : null}
        </>
    );
}

export default InputAddress;