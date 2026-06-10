// Shared domain types for the Drive app.

export interface Coordinates {
  lng: number
  lat: number
}

export interface AddressSuggestion {
  mapbox_id: string
  /** Primary line — street / place / POI name (e.g. "Проспект Алішера Навої"). */
  name: string
  /** Secondary line — locality, postcode, country (e.g. "02125, Київ, Україна"). */
  place_formatted: string
  /** Complete address used as the input value once selected. */
  full_address: string
}

export interface Car {
  id: number
  name: string
  image: string
  /** Price multiplier per mile. */
  charges: number
}

export interface PaymentMethod {
  id: number
  name: string
  image: string
}

export interface PackageTier {
  id: number
  name: string
  emoji: string
  /** Price multiplier per mile. */
  charges: number
  hint: string
}

export interface DirectionRoute {
  distance: number
  duration: number
  geometry: {
    coordinates: [number, number][]
  }
}

export interface DirectionData {
  routes: DirectionRoute[]
}
