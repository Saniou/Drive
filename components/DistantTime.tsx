import { DirectionDataContext } from '@/context/DirectionDataContext'
import React, { useContext } from 'react'

function DistantTime() {
    const { directionData, setDirectionData } = useContext(DirectionDataContext)
    return (
        <>
            {directionData?.routes ? (
                <div className='bg-black p-5'>
                <h2 className='text-yellow opacity-80 text-[15px]'>
                    Distance:{" "}
                    <span className='font-bold mr-3 text-pink-500'>{(directionData.routes[0].distance * 0.0006213).toFixed(2)} Miles</span>
                    Duration:{" "}
                    <span className='font-bold mr-3 text-pink-500'>{(directionData.routes[0].duration / 60).toFixed(2)} Min</span>
                </h2>
                </div>
            ) : null}
        </>
    )
}

export default DistantTime
