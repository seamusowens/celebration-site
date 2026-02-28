'use client'
import { useState, useEffect } from 'react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

const dynamoClient = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
  }
})
const dynamodb = DynamoDBDocumentClient.from(dynamoClient)

export default function Pictures() {
  const [pictures, setPictures] = useState<any[]>([])
  const [caption, setCaption] = useState('')
  
  useEffect(() => {
    loadPictures()
  }, [])

  const loadPictures = async () => {
    try {
      const { Items } = await dynamodb.send(new ScanCommand({ TableName: 'celebration-pictures' }))
      setPictures(Items || [])
    } catch (err) {
      console.error('Error loading pictures:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fileInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement
    if (!fileInput.files?.[0]) return
    
    try {
      const file = fileInput.files[0]
      const id = Date.now().toString()
      const key = `${id}.jpg`
      const s3Url = `https://celebration-site-pictures.s3.amazonaws.com/${key}`
      
      // Upload directly to S3
      await fetch(s3Url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      })
      
      // Save metadata to DynamoDB
      const picture = { id, url: s3Url, caption, createdAt: new Date().toISOString() }
      await dynamodb.send(new PutCommand({ TableName: 'celebration-pictures', Item: picture }))
      
      setCaption('')
      fileInput.value = ''
      await loadPictures()
      alert('Picture uploaded! 🎉')
    } catch (err) {
      console.error('Upload error:', err)
      alert('Error uploading picture')
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      
      <div className="w-full max-w-5xl mx-auto shadow-2xl border-8 border-pink-500">
        <div className="min-h-screen relative flex flex-col" style={{backgroundImage: 'url(/images/Pictures%20page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="container mx-auto p-8 flex-1">
            <h1 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">📸 Picture Album 🐵</h1>
          </div>
          
          <div className="p-8">
            <div className="fun-card p-4 max-w-full mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-center justify-center">
                <input type="file" accept="image/*" className="flex-1 min-w-[200px] p-3 border-2 border-pink-300 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-500 file:text-white file:font-semibold hover:file:bg-pink-600 transition-all shadow-sm hover:shadow-md" required/>
                <input type="text" placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="flex-1 min-w-[200px] p-3 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none"/>
                <button type="submit" className="bg-pink-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:bg-pink-700 hover:scale-105 transition-transform shadow-lg whitespace-nowrap">Click Here to Upload Pictures</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 p-8">
          <div className="grid md:grid-cols-3 gap-6">
            {pictures.map((pic: any) => (
              <div key={pic.id} className="fun-card p-4">
                <img src={pic.url} alt={pic.caption || ''} className="w-full h-64 object-cover rounded-lg mb-2"/>
                {pic.caption && <p className="text-center font-bold">{pic.caption}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
