import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {

    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            icon: '/driver.svg'
        },
        {
            id: 2,
            name: 'Package',
            icon: '/package.svg'
        },
    ]

    return (
        <div className='p-4 pb-3 pl-10 border-b-[4px] border-gray-800 items-center flex justify-between'>
            <div className='flex gap-2 items-center'>
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <div className='flex gap-6 items-center'>
                    {headerMenu.map((menu) => (
                        <div key={menu.id} className='flex gap-2 items-center'>
                            <Image src={menu.icon} width={30} height={20} alt='asr'/>
                            <h2 className=' text-[14px] font-medium'>{menu.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <UserButton/>
        </div>
    )
}

export default Header
