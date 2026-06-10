'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import NavBar from './NavBar'
import MapBox from './MapBox'
import SplitPane from './SplitPane'
import Preloader from './Preloader'
import { RideProvider, useRide } from '@/context/RideContext'

function ShellInner({ children }: { children: ReactNode }) {
  const { setUserLocation } = useRide()

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => console.warn('Geolocation unavailable:', err.message)
    )
  }, [setUserLocation])

  return (
    <>
      <Preloader />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid rgba(236, 72, 153, 0.4)',
          },
          success: { iconTheme: { primary: '#ec4899', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ec4899', secondary: '#fff' } },
        }}
      />
      <NavBar />
      <div className="p-4 md:p-6">
        <SplitPane left={children} right={<MapBox />} />
      </div>
    </>
  )
}

export default function ServiceShell({ children }: { children: ReactNode }) {
  return (
    <RideProvider>
      <ShellInner>{children}</ShellInner>
    </RideProvider>
  )
}
