import { NextResponse } from 'next/server'
import { dynamodb, TABLES } from '@/lib/dynamodb'
import { ScanCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

const inMemoryPictures: any[] = []

export async function GET() {
  try {
    const { Items } = await dynamodb.send(new ScanCommand({ TableName: TABLES.PICTURES }))
    return NextResponse.json(Items || [])
  } catch (error) {
    console.error('DynamoDB error, using in-memory:', error)
    return NextResponse.json(inMemoryPictures)
  }
}

export async function POST(request: Request) {
  try {
    const { url, caption } = await request.json()
    const picture = { id: Date.now().toString(), url, caption, createdAt: new Date().toISOString() }
    
    try {
      await dynamodb.send(new PutCommand({ TableName: TABLES.PICTURES, Item: picture }))
    } catch (dbError) {
      console.error('DynamoDB error, using in-memory:', dbError)
      inMemoryPictures.unshift(picture)
    }
    
    return NextResponse.json(picture)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create picture' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    
    try {
      await dynamodb.send(new DeleteCommand({ TableName: TABLES.PICTURES, Key: { id } }))
    } catch (dbError) {
      const index = inMemoryPictures.findIndex(p => p.id === id)
      if (index > -1) inMemoryPictures.splice(index, 1)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete picture' }, { status: 500 })
  }
}
