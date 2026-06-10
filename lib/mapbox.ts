import type { Coordinates, DirectionData } from './types'

// A single session token reused across the Search Box "suggest" + "retrieve"
// calls, as required by the Mapbox Search Box API for billing/session grouping.
export const SESSION_TOKEN = '06675752-1b97-4391-88ba-e20ff3c0942c'

const RETRIEVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'
const DIRECTIONS_URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''

/** Resolve a suggestion's `mapbox_id` to concrete coordinates. */
export async function retrieveCoordinates(
  mapboxId: string
): Promise<Coordinates | null> {
  try {
    const params = new URLSearchParams({
      session_token: SESSION_TOKEN,
      access_token: ACCESS_TOKEN,
    })
    const res = await fetch(`${RETRIEVE_URL}${mapboxId}?${params.toString()}`)
    if (!res.ok) return null

    const data = await res.json()
    const coords = data?.features?.[0]?.geometry?.coordinates
    if (!Array.isArray(coords) || coords.length < 2) return null

    return { lng: coords[0], lat: coords[1] }
  } catch {
    return null
  }
}

/** Fetch a driving route between two points. */
export async function fetchDirections(
  source: Coordinates,
  destination: Coordinates
): Promise<DirectionData | null> {
  try {
    const path = `${source.lng},${source.lat};${destination.lng},${destination.lat}`
    const params = new URLSearchParams({
      overview: 'full',
      geometries: 'geojson',
      access_token: ACCESS_TOKEN,
    })
    const res = await fetch(`${DIRECTIONS_URL}${path}?${params.toString()}`)
    if (!res.ok) return null

    return (await res.json()) as DirectionData
  } catch {
    return null
  }
}
