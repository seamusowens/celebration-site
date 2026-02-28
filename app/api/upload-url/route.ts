import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({ region: process.env.REGION || 'us-east-1' })
const BUCKET = 'celebration-site-pictures'

export async function POST(request: Request) {
  try {
    const { filename } = await request.json()
    const key = `${Date.now()}-${filename}`
    
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: 'image/jpeg'
    })
    
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
    const publicUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`
    
    return NextResponse.json({ uploadUrl, publicUrl, key })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
