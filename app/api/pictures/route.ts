import { NextResponse } from 'next/server'
import { dynamodb, TABLES } from '@/lib/dynamodb'
import { ScanCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

const inMemoryPictures: any[] = []

export async function GET() {
  try {
    console.log('Fetching pictures from DynamoDB table:', TABLES.PICTURES)
    const { Items } = await dynamodb.send(new ScanCommand({ TableName: TABLES.PICTURES }))
    console.log('DynamoDB returned items:', Items?.length || 0)
    return NextResponse.json(Items || [])
  } catch (error) {
    console.error('DynamoDB error, using in-memory:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(inMemoryPictures)
  }
}

export async function POST(request: Request) {
  try {
    const { url, caption } = await request.json()
    const picture = { id: Date.now().toString(), url, caption, createdAt: new Date().toISOString() }
    
    try {
      console.log('Saving picture to DynamoDB:', picture.id)
      await dynamodb.send(new PutCommand({ TableName: TABLES.PICTURES, Item: picture }))
      console.log('Picture saved successfully')
    } catch (dbError) {
      console.error('DynamoDB error, using in-memory:', dbError)
      console.error('Error details:', JSON.stringify(dbError, null, 2))
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
