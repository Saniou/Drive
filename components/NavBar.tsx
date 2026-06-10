'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const headerMenu = [
  { id: 1, name: 'Ride', icon: '/driver.svg', emoji: null, href: '/' },
  { id: 2, name: 'Package', icon: '/package.svg', emoji: null, href: '/package' },
  { id: 3, name: 'History', icon: null, emoji: '🕐', href: '/history' },
  { id: 4, name: 'Settings', icon: null, emoji: '⚙️', href: '/settings' },
]

function NavBar() {
  // Clerk's <UserButton> renders user-specific markup that isn't available
  // during SSR, which causes a hydration mismatch. Render it only after mount.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname])

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

  const renderLink = (
    menu: (typeof headerMenu)[number],
    mobile: boolean
  ) => {
    const active = pathname === menu.href
    return (
      <Link
        key={menu.id}
        href={menu.href}
        onClick={() => setMenuOpen(false)}
        className={`group flex items-center gap-2 rounded-full text-sm font-medium transition-all ${
          mobile ? 'px-4 py-3' : 'px-4 py-2'
        } ${
          active
            ? 'bg-brand-500/15 text-brand-400 shadow-glow'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`}
      >
        {menu.icon ? (
          <Image
            src={menu.icon}
            width={22}
            height={18}
            alt=""
            className="transition-transform group-hover:scale-110"
          />
        ) : (
          <span className="text-base grayscale transition-transform group-hover:scale-110">
            {menu.emoji}
          </span>
        )}
        <span>{menu.name}</span>
      </Link>
    )
  }

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {headerMenu.map((menu) => renderLink(menu, false))}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <span className="hidden text-xs text-white/40 sm:block">
            Inspired by the film <span className="text-brand-400">Drive</span>
          </span>
          {mounted ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-white/10" aria-hidden />
          )}

          {/* Burger (mobile only) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:bg-white/5 md:hidden"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
          {headerMenu.map((menu) => renderLink(menu, true))}
        </nav>
      )}
    </header>
  )
}

export default NavBar
