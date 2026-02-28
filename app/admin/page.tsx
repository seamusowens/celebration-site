'use client'
import { useState, useEffect } from 'react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

const dynamoClient = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
  }
})
const dynamodb = DynamoDBDocumentClient.from(dynamoClient)

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [rsvps, setRsvps] = useState<any[]>([])
  const [pictures, setPictures] = useState<any[]>([])
  const [stories, setStories] = useState<any[]>([])
  const [tab, setTab] = useState('rsvps')

  useEffect(() => {
    if (authenticated) {
      loadData()
    }
  }, [authenticated])

  const loadData = async () => {
    try {
      const [rsvpRes, picRes, storyRes] = await Promise.all([
        dynamodb.send(new ScanCommand({ TableName: 'celebration-rsvps' })),
        dynamodb.send(new ScanCommand({ TableName: 'celebration-pictures' })),
        dynamodb.send(new ScanCommand({ TableName: 'celebration-stories' }))
      ])
      
      setRsvps(rsvpRes.Items || [])
      setPictures(picRes.Items || [])
      setStories(storyRes.Items || [])
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'john@admin.com' && password === 'admin123') {
      setAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
    } else {
      alert('Incorrect credentials')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem('adminAuth')
  }

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth') === 'true'
    if (isAuth) {
      setAuthenticated(true)
    }
  }, [])

  const deletePicture = async (id: string) => {
    try {
      await dynamodb.send(new DeleteCommand({ TableName: 'celebration-pictures', Key: { id } }))
      loadData()
    } catch (err) {
      console.error('Error deleting picture:', err)
    }
  }

  const deleteStory = async (id: string) => {
    try {
      await dynamodb.send(new DeleteCommand({ TableName: 'celebration-stories', Key: { id } }))
      loadData()
    } catch (err) {
      console.error('Error deleting story:', err)
    }
  }

  const deleteRsvp = async (id: string) => {
    try {
      await dynamodb.send(new DeleteCommand({ TableName: 'celebration-rsvps', Key: { id } }))
      loadData()
    } catch (err) {
      console.error('Error deleting RSVP:', err)
    }
  }

  const addPicture = async (e: React.FormEvent) => {
    e.preventDefault()
    const fileInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement
    if (!fileInput.files?.[0]) return
    
    const reader = new FileReader()
    reader.onload = async (e) => {
      const url = e.target?.result as string
      await fetch('/api/pictures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, caption: newPicCaption })
      })
      setNewPicCaption('')
      fileInput.value = ''
      loadData()
    }
    reader.readAsDataURL(fileInput.files[0])
  }

  const addStory = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStory)
    })
    setNewStory({ author: '', title: '', content: '' })
    loadData()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600">
        <div className="fun-card p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm focus:border-pink-500 focus:outline-none" required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm focus:border-pink-500 focus:outline-none" required/>
            <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-2xl text-xl font-bold hover:bg-pink-700">Login</button>
          </form>
        </div>
      </div>
    )
  }

  const stPeteRsvps = rsvps.filter((r: any) => r.event === 'stpete')
  const southBendRsvps = rsvps.filter((r: any) => r.event === 'southbend')

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-400 to-pink-600">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-black text-white text-center flex-1 drop-shadow-lg">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-white text-pink-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-100">Logout</button>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setTab('rsvps')} className={`px-6 py-3 rounded-2xl font-bold ${tab === 'rsvps' ? 'bg-white text-pink-600' : 'bg-pink-600 text-white'}`}>RSVPs</button>
          <button onClick={() => setTab('pictures')} className={`px-6 py-3 rounded-2xl font-bold ${tab === 'pictures' ? 'bg-white text-pink-600' : 'bg-pink-600 text-white'}`}>Pictures</button>
          <button onClick={() => setTab('stories')} className={`px-6 py-3 rounded-2xl font-bold ${tab === 'stories' ? 'bg-white text-pink-600' : 'bg-pink-600 text-white'}`}>Stories</button>
        </div>

        {tab === 'rsvps' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="fun-card p-6">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">St. Petersburg RSVPs ({stPeteRsvps.length})</h2>
              {stPeteRsvps.length === 0 ? (
                <p className="text-gray-500">No RSVPs yet</p>
              ) : (
                <div className="space-y-3">
                  {stPeteRsvps.map((rsvp: any) => (
                    <div key={rsvp.id} className="bg-pink-50 p-3 rounded-lg">
                      <p className="font-bold">{rsvp.name}</p>
                      <p className="text-sm">{rsvp.email}</p>
                      <p className="text-sm">Attending: {rsvp.attending}</p>
                      <button onClick={() => deleteRsvp(rsvp.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 mt-2">Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fun-card p-6">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">South Bend RSVPs ({southBendRsvps.length})</h2>
              {southBendRsvps.length === 0 ? (
                <p className="text-gray-500">No RSVPs yet</p>
              ) : (
                <div className="space-y-3">
                  {southBendRsvps.map((rsvp: any) => (
                    <div key={rsvp.id} className="bg-pink-50 p-3 rounded-lg">
                      <p className="font-bold">{rsvp.name}</p>
                      <p className="text-sm">{rsvp.email}</p>
                      <p className="text-sm">Attending: {rsvp.attending}</p>
                      <button onClick={() => deleteRsvp(rsvp.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 mt-2">Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'pictures' && (
          <div className="fun-card p-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Pictures ({pictures.length})</h2>
            {pictures.length === 0 ? (
              <p className="text-gray-500">No pictures yet</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {pictures.map((pic: any) => (
                  <div key={pic.id} className="bg-pink-50 p-3 rounded-lg">
                    <img src={pic.url} alt={pic.caption || ''} className="w-full h-32 object-cover rounded mb-2"/>
                    <p className="text-sm mb-2">{pic.caption}</p>
                    <button onClick={() => deletePicture(pic.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'stories' && (
          <div className="fun-card p-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Stories ({stories.length})</h2>
            {stories.length === 0 ? (
              <p className="text-gray-500">No stories yet</p>
            ) : (
              <div className="space-y-4">
                {stories.map((story: any) => (
                  <div key={story.id} className="bg-pink-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg">{story.title}</h3>
                    <p className="text-sm text-gray-600">By {story.author}</p>
                    <p className="text-sm mt-2">{story.content}</p>
                    <button onClick={() => deleteStory(story.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 mt-2">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
