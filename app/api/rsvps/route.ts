import { NextResponse } from 'next/server'
import { dynamodb, TABLES } from '@/lib/dynamodb'
import { ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

const inMemoryRsvps: any[] = []

export async function POST(request: Request) {
  try {
    const { event, name, email, attending } = await request.json()
    const rsvp = { id: Date.now().toString(), event, name, email, attending, createdAt: new Date().toISOString() }
    
    try {
      await dynamodb.send(new PutCommand({ TableName: TABLES.RSVPS, Item: rsvp }))
    } catch (dbError) {
      console.error('DynamoDB error, using in-memory:', dbError)
      inMemoryRsvps.unshift(rsvp)
    }
    
    return NextResponse.json(rsvp)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create RSVP' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { Items } = await dynamodb.send(new ScanCommand({ TableName: TABLES.RSVPS }))
    return NextResponse.json(Items || [])
  } catch (error) {
    console.error('DynamoDB error, using in-memory:', error)
    return NextResponse.json(inMemoryRsvps)
  }
}
