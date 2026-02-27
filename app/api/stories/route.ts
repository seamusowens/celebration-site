import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(stories)
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, author } = await request.json()
    const story = await prisma.story.create({
      data: { title, content, author }
    })
    return NextResponse.json(story)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.story.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}
