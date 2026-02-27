import { NextResponse } from 'next/server'

const rsvps: any[] = []

export async function POST(request: Request) {
  try {
    const { event, name, email, attending } = await request.json()
    const rsvp = { id: Date.now().toString(), event, name, email, attending, createdAt: new Date().toISOString() }
    rsvps.unshift(rsvp)
    return NextResponse.json(rsvp)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create RSVP' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(rsvps)
}
