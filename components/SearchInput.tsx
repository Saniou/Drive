import React from 'react'
import InputAddress from '@/components/InputAddress'
import Cars from './Cars'
import Cards from './Cards'

function SearchInput() {
    return (
        <>
            <div className='p-5 md:pb-5 border-[3px] rounded-xl border-gray-800 '>
                <p className='text-2xl font-bold'>Get a ride</p>
                <InputAddress />
                <Cars />
                <Cards />
                <button className='p-3 rounded-full bg-pink-500 w-full mt-8 text-white' >I`m drive!</button>
            </div>

        </>
    )
}

export default SearchInput
