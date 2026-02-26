import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { event, name, email, attending } = await request.json()
  const rsvp = await prisma.rSVP.create({
    data: { event, name, email, attending }
  })
  return NextResponse.json(rsvp)
}

export async function GET() {
  const rsvps = await prisma.rSVP.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(rsvps)
}
