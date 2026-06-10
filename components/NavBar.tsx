'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const headerMenu = [
  { id: 1, name: 'Ride', icon: '/driver.svg' },
  { id: 2, name: 'Package', icon: '/package.svg' },
]

function NavBar() {
  // Clerk's <UserButton> renders user-specific markup that isn't available
  // during SSR, which causes a hydration mismatch. Render it only after the
  // component has mounted on the client so SSR and first client render agree.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="flex items-center justify-between border-b-[4px] border-gray-800 p-4 pb-3 pl-10">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          priority
          width={200}
          height={200}
          loading="eager"
          alt="Drive-Logo"
        />
        <div className="flex items-center gap-6">
          {headerMenu.map((menu) => (
            <div key={menu.id} className="flex items-center gap-2">
              <Image src={menu.icon} width={30} height={20} alt={menu.name} />
              <h2 className="text-[14px] font-medium">{menu.name}</h2>
            </div>
          ))}
        </div>
      </div>

      {mounted ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gray-700" aria-hidden />
      )}
    </div>
  )
}

export default NavBar
