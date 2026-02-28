import { NextResponse } from 'next/server'
import { dynamodb, TABLES } from '@/lib/dynamodb'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { ScanCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

const s3 = new S3Client({ region: process.env.REGION || 'us-east-1' })
const BUCKET = 'celebration-site-pictures'
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
    const id = Date.now().toString()
    
    try {
      // Upload base64 image to S3
      const base64Data = url.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')
      const key = `${id}.jpg`
      
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: 'image/jpeg'
      }))
      
      const s3Url = `https://${BUCKET}.s3.amazonaws.com/${key}`
      const picture = { id, url: s3Url, caption, createdAt: new Date().toISOString() }
      
      await dynamodb.send(new PutCommand({ TableName: TABLES.PICTURES, Item: picture }))
      console.log('Picture saved to S3 and DynamoDB:', id)
      
      return NextResponse.json(picture)
    } catch (dbError) {
      console.error('S3/DynamoDB error:', dbError)
      const picture = { id, url, caption, createdAt: new Date().toISOString() }
      inMemoryPictures.unshift(picture)
      return NextResponse.json(picture)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create picture' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    
    try {
      // Delete from S3
      await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: `${id}.jpg` }))
      // Delete from DynamoDB
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
