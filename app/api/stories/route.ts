import { NextResponse } from 'next/server'
import { dynamodb, TABLES } from '@/lib/dynamodb'
import { ScanCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

const inMemoryStories: any[] = []

export async function GET() {
  try {
    const { Items } = await dynamodb.send(new ScanCommand({ TableName: TABLES.STORIES }))
    return NextResponse.json(Items || [])
  } catch (error) {
    console.error('DynamoDB error, using in-memory:', error)
    return NextResponse.json(inMemoryStories)
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, author } = await request.json()
    const story = { id: Date.now().toString(), title, content, author, createdAt: new Date().toISOString() }
    
    try {
      await dynamodb.send(new PutCommand({ TableName: TABLES.STORIES, Item: story }))
    } catch (dbError) {
      console.error('DynamoDB error, using in-memory:', dbError)
      inMemoryStories.unshift(story)
    }
    
    return NextResponse.json(story)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    
    try {
      await dynamodb.send(new DeleteCommand({ TableName: TABLES.STORIES, Key: { id } }))
    } catch (dbError) {
      const index = inMemoryStories.findIndex(s => s.id === id)
      if (index > -1) inMemoryStories.splice(index, 1)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}
