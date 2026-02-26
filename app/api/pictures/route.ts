import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const pictures = await prisma.picture.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(pictures)
}

export async function POST(request: Request) {
  const { url, caption } = await request.json()
  const picture = await prisma.picture.create({
    data: { url, caption }
  })
  return NextResponse.json(picture)
}
