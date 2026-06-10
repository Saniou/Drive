'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const headerMenu = [
  { id: 1, name: 'Ride', icon: '/driver.svg', href: '/' },
  { id: 2, name: 'Package', icon: '/package.svg', href: '/package' },
]

function NavBar() {
  // Clerk's <UserButton> renders user-specific markup that isn't available
  // during SSR, which causes a hydration mismatch. Render it only after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
    },
    { scope: navRef }
  )

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl md:px-8"
    >
      <div className="flex items-center gap-4 md:gap-8">
        <Link href="/" className="transition-transform hover:scale-[1.03]">
          <Image
            src="/logo.png"
            priority
            width={150}
            height={150}
            loading="eager"
            alt="Drive"
            className="h-10 w-auto drop-shadow-[0_0_12px_rgba(236,72,153,0.5)]"
          />
        </Link>

        <nav className="flex items-center gap-2">
          {headerMenu.map((menu) => {
            const active = pathname === menu.href
            return (
              <Link
                key={menu.id}
                href={menu.href}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand-500/15 text-brand-400 shadow-glow'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Image
                  src={menu.icon}
                  width={22}
                  height={18}
                  alt=""
                  className="transition-transform group-hover:scale-110"
                />
                <span>{menu.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden text-xs text-white/40 sm:block">
          Inspired by the film <span className="text-brand-400">Drive</span>
        </span>
        {mounted ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-white/10" aria-hidden />
        )}
      </div>
    </header>
  )
}

export default NavBar
