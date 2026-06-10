'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const MIN_VISIBLE_MS = 700
const MAX_VISIBLE_MS = 2500

/**
 * Branded full-screen preloader. Stays up until the page has finished loading
 * its resources (`window.load`), with a small minimum so it doesn't flash and a
 * hard cap so it never blocks. Fades out, then unmounts itself.
 */
export default function Preloader() {
  const [hidden, setHidden] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = Date.now()

    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start))
      window.setTimeout(() => setHidden(true), wait)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    const hardStop = window.setTimeout(() => setHidden(true), MAX_VISIBLE_MS)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(hardStop)
    }
  }, [])

  if (done) return null

  return (
    <div
      onTransitionEnd={() => hidden && setDone(true)}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-[#07060a] transition-opacity duration-500 ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-500/25 blur-3xl" />
        <Image
          src="/logo.png"
          width={220}
          height={120}
          alt="Drive"
          priority
          className="h-auto w-44 animate-pulse drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]"
        />
      </div>

      <div className="relative h-1 w-44 overflow-hidden rounded-full bg-white/10">
        <div className="loader-bar absolute inset-y-0 w-1/3 rounded-full bg-brand-gradient" />
      </div>

      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
        Starting engine
      </p>
    </div>
  )
}
