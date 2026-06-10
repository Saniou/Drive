import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import { prisma } from '@/lib/prisma'

const MILES_PER_METER = 0.00062137

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const rides = await prisma.ride.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl p-4 md:p-6">
        <h1 className="bg-brand-gradient bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Your trips
        </h1>
        <p className="mt-1 text-sm text-white/40">
          {rides.length} {rides.length === 1 ? 'trip' : 'trips'} so far
        </p>

        {rides.length === 0 ? (
          <div className="glass mt-8 flex flex-col items-center gap-3 rounded-3xl p-12 text-center">
            <span className="text-4xl">🛣️</span>
            <p className="text-white/60">No trips yet.</p>
            <Link href="/" className="btn-brand px-6 py-2.5 text-sm">
              Book your first ride
            </Link>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {rides.map((ride) => (
              <li
                key={ride.id}
                className="glass rounded-2xl p-4 transition-colors hover:border-brand-500/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <span className="text-lg">
                      {ride.type === 'package' ? '📦' : '🚗'}
                    </span>
                    {ride.optionName}
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/40">
                      {ride.type}
                    </span>
                  </span>
                  <span className="text-lg font-bold text-brand-400">
                    {ride.price}$
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <p className="flex items-start gap-2 text-white/70">
                    <span className="text-brand-400/70">●</span>
                    <span className="truncate">{ride.pickupLabel}</span>
                  </p>
                  <p className="flex items-start gap-2 text-white/70">
                    <span className="text-brand-400">◉</span>
                    <span className="truncate">{ride.dropoffLabel}</span>
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
                  <span>{(ride.distance * MILES_PER_METER).toFixed(1)} mi</span>
                  <span>{(ride.duration / 60).toFixed(0)} min</span>
                  <span>{ride.paymentName}</span>
                  <span className="ml-auto">
                    {new Date(ride.createdAt).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
