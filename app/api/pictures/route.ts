import { NextResponse } from 'next/server'

const pictures: any[] = []

export async function GET() {
  return NextResponse.json(pictures)
}

export async function POST(request: Request) {
  try {
    const { url, caption } = await request.json()
    const picture = { id: Date.now().toString(), url, caption, createdAt: new Date().toISOString() }
    pictures.unshift(picture)
    return NextResponse.json(picture)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create picture' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const index = pictures.findIndex(p => p.id === id)
    if (index > -1) pictures.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete picture' }, { status: 500 })
  }
}
