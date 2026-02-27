import { NextResponse } from 'next/server'
import { dynamodb, TABLES } from '@/lib/dynamodb'
import { ScanCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

export async function GET() {
  try {
    const { Items } = await dynamodb.send(new ScanCommand({ TableName: TABLES.STORIES }))
    return NextResponse.json(Items || [])
  } catch (error) {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, author } = await request.json()
    const story = { id: Date.now().toString(), title, content, author, createdAt: new Date().toISOString() }
    await dynamodb.send(new PutCommand({ TableName: TABLES.STORIES, Item: story }))
    return NextResponse.json(story)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await dynamodb.send(new DeleteCommand({ TableName: TABLES.STORIES, Key: { id } }))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}
