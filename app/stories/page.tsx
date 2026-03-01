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

interface Story {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const [formData, setFormData] = useState({ author: '', title: '', content: '' })

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      const { Items } = await dynamodb.send(new ScanCommand({ TableName: 'celebration-stories' }))
      setStories(Items as Story[] || [])
    } catch (err) {
      console.error('Error loading stories:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const id = Date.now().toString()
      const story = { id, ...formData, createdAt: new Date().toISOString() }
      
      await dynamodb.send(new PutCommand({ TableName: 'celebration-stories', Item: story }))
      
      setFormData({ author: '', title: '', content: '' })
      await loadStories()
      alert('Story shared! 🐵')
    } catch (err) {
      console.error('Error sharing story:', err)
      alert('Error sharing story')
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
        <div className="min-h-screen relative" style={{backgroundImage: 'url(/images/Stories%20Page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        </div>
        
        <div className="bg-gray-900 p-8">
          <h1 className="text-5xl font-black text-white text-center mb-4 drop-shadow-lg">That's Illegal!</h1>
          <p className="text-3xl text-yellow-300 text-center mb-8 font-bold">Share Your Stories</p>
          
          <div className="fun-card p-4 max-w-full mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-center justify-center">
              <input type="text" placeholder="Your Name" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="flex-1 min-w-[150px] p-3 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
              <input type="text" placeholder="Story Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="flex-1 min-w-[150px] p-3 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
              <textarea placeholder="Share your story..." rows={2} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="flex-1 min-w-[200px] p-3 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required></textarea>
              <button type="submit" className="bg-pink-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:bg-pink-700 hover:scale-105 transition-transform shadow-lg whitespace-nowrap">Share Story! 🐵</button>
            </form>
          </div>
        </div>

        {stories.length > 0 && (
          <div className="bg-gray-900 p-8 space-y-6">
            {stories.map((story) => (
              <div key={story.id} className="max-w-4xl mx-auto">
                <div className="fun-card p-6">
                  <h3 className="text-2xl font-bold text-pink-600 mb-2">{story.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">By {story.author}</p>
                  <p className="text-lg">{story.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
