import { NextResponse } from 'next/server'

const stories: any[] = []

export async function GET() {
  return NextResponse.json(stories)
}

export async function POST(request: Request) {
  try {
    const { title, content, author } = await request.json()
    const story = { id: Date.now().toString(), title, content, author, createdAt: new Date().toISOString() }
    stories.unshift(story)
    return NextResponse.json(story)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const index = stories.findIndex(s => s.id === id)
    if (index > -1) stories.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}
