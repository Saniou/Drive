import type { PackageTier } from '@/lib/types'

const packageList: PackageTier[] = [
  { id: 1, name: 'Document', emoji: '📄', charges: 1.0, hint: 'up to 1 kg' },
  { id: 2, name: 'Small', emoji: '📦', charges: 1.4, hint: 'up to 5 kg' },
  { id: 3, name: 'Medium', emoji: '🧳', charges: 2.0, hint: 'up to 15 kg' },
  { id: 4, name: 'Large', emoji: '🛅', charges: 3.0, hint: 'up to 30 kg' },
]

export default packageList
