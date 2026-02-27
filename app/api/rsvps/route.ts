import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { event, name, email, attending } = await request.json()
    const rsvp = await prisma.rSVP.create({
      data: { event, name, email, attending }
    })
    return NextResponse.json(rsvp)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create RSVP' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const rsvps = await prisma.rSVP.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(rsvps)
  } catch (error) {
    return NextResponse.json([])
  }
}
