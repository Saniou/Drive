'use client'

export default function MapSkeleton({ label = 'Loading map…' }: { label?: string }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0c0a12]">
      {/* Sweeping shimmer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 animate-shimmer bg-gradient-to-r from-transparent via-brand-500/10 to-transparent" />
      </div>

      <span className="h-10 w-10 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
      <p className="text-sm text-white/50">{label}</p>
    </div>
  )
}
