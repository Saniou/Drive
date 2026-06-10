export interface SavedPlace {
  label: string
  lng: number
  lat: number
}

const KEY_HOME = 'drive:home'
const KEY_WORK = 'drive:work'
const KEY_RECENT = 'drive:recent'
const RECENT_LIMIT = 5

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export const getHome = () => read<SavedPlace | null>(KEY_HOME, null)
export const setHome = (p: SavedPlace | null) => write(KEY_HOME, p)

export const getWork = () => read<SavedPlace | null>(KEY_WORK, null)
export const setWork = (p: SavedPlace | null) => write(KEY_WORK, p)

export const getRecent = () => read<SavedPlace[]>(KEY_RECENT, [])

export function addRecent(place: SavedPlace) {
  const list = getRecent().filter((p) => p.label !== place.label)
  list.unshift(place)
  write(KEY_RECENT, list.slice(0, RECENT_LIMIT))
}

export const clearRecent = () => write(KEY_RECENT, [])
