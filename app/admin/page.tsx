'use client'
import { useState, useEffect } from 'react'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [rsvps, setRsvps] = useState([])
  const [pictures, setPictures] = useState([])
  const [stories, setStories] = useState([])
  const [tab, setTab] = useState('rsvps')

  useEffect(() => {
    if (authenticated) {
      fetch('/api/rsvps').then(res => res.json()).then(setRsvps)
      fetch('/api/pictures').then(res => res.json()).then(setPictures)
      fetch('/api/stories').then(res => res.json()).then(setStories)
    }
  }, [authenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  const deletePicture = async (id: string) => {
    await fetch('/api/pictures', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setPictures(pictures.filter((p: any) => p.id !== id))
  }

  const deleteStory = async (id: string) => {
    await fetch('/api/stories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setStories(stories.filter((s: any) => s.id !== id))
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600">
        <div className="fun-card p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
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
        <h1 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">Admin Dashboard</h1>
        
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setTab('rsvps')} className={`px-6 py-3 rounded-2xl font-bold ${tab === 'rsvps' ? 'bg-white text-pink-600' : 'bg-pink-600 text-white'}`}>RSVPs</button>
          <button onClick={() => setTab('pictures')} className={`px-6 py-3 rounded-2xl font-bold ${tab === 'pictures' ? 'bg-white text-pink-600' : 'bg-pink-600 text-white'}`}>Pictures</button>
          <button onClick={() => setTab('stories')} className={`px-6 py-3 rounded-2xl font-bold ${tab === 'stories' ? 'bg-white text-pink-600' : 'bg-pink-600 text-white'}`}>Stories</button>
        </div>

        {tab === 'rsvps' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="fun-card p-6">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">St. Petersburg RSVPs ({stPeteRsvps.length})</h2>
              <div className="space-y-3">
                {stPeteRsvps.map((rsvp: any) => (
                  <div key={rsvp.id} className="bg-pink-50 p-3 rounded-lg">
                    <p className="font-bold">{rsvp.name}</p>
                    <p className="text-sm">{rsvp.email}</p>
                    <p className="text-sm">Attending: {rsvp.attending}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fun-card p-6">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">South Bend RSVPs ({southBendRsvps.length})</h2>
              <div className="space-y-3">
                {southBendRsvps.map((rsvp: any) => (
                  <div key={rsvp.id} className="bg-pink-50 p-3 rounded-lg">
                    <p className="font-bold">{rsvp.name}</p>
                    <p className="text-sm">{rsvp.email}</p>
                    <p className="text-sm">Attending: {rsvp.attending}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'pictures' && (
          <div className="fun-card p-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Pictures ({pictures.length})</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {pictures.map((pic: any) => (
                <div key={pic.id} className="bg-pink-50 p-3 rounded-lg">
                  <img src={pic.url} alt={pic.caption || ''} className="w-full h-32 object-cover rounded mb-2"/>
                  <p className="text-sm mb-2">{pic.caption}</p>
                  <button onClick={() => deletePicture(pic.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'stories' && (
          <div className="fun-card p-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Stories ({stories.length})</h2>
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
          </div>
        )}
      </div>
    </div>
  )
}
