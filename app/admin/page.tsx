'use client'
import { useState, useEffect } from 'react'

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [rsvps, setRsvps] = useState([])

  useEffect(() => {
    if (authenticated) {
      fetch('/api/rsvps')
        .then(res => res.json())
        .then(data => setRsvps(data))
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
      </div>
    </div>
  )
}
