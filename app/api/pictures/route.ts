import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pictures = await prisma.picture.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(pictures)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const { url, caption } = await request.json()
    const picture = await prisma.picture.create({
      data: { url, caption }
    })
    return NextResponse.json(picture)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create picture' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.picture.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete picture' }, { status: 500 })
  }
}
