import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const stories = await prisma.story.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(stories)
}

export async function POST(request: Request) {
  const { title, content, author } = await request.json()
  const story = await prisma.story.create({
    data: { title, content, author }
  })
  return NextResponse.json(story)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.story.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
