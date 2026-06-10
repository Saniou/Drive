import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rides = await prisma.ride.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json({ rides })
}

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const required = [
    'type',
    'pickupLabel',
    'pickupLng',
    'pickupLat',
    'dropoffLabel',
    'dropoffLng',
    'dropoffLat',
    'optionName',
    'paymentName',
  ]
  for (const key of required) {
    if (body[key] === undefined || body[key] === null) {
      return NextResponse.json(
        { error: `Missing field: ${key}` },
        { status: 400 }
      )
    }
  }

  const ride = await prisma.ride.create({
    data: {
      userId,
      type: String(body.type),
      pickupLabel: String(body.pickupLabel),
      pickupLng: Number(body.pickupLng),
      pickupLat: Number(body.pickupLat),
      dropoffLabel: String(body.dropoffLabel),
      dropoffLng: Number(body.dropoffLng),
      dropoffLat: Number(body.dropoffLat),
      optionName: String(body.optionName),
      paymentName: String(body.paymentName),
      distance: Number(body.distance) || 0,
      duration: Number(body.duration) || 0,
      price: Number(body.price) || 0,
    },
  })

  return NextResponse.json({ ride }, { status: 201 })
}
