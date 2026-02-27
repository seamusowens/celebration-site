'use client'
import { useState, useEffect } from 'react'

export default function AltEvents() {
  const [selectedEvent, setSelectedEvent] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', attending: 1 })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/rsvps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, event: selectedEvent })
    })
    setFormData({ name: '', email: '', attending: 1 })
    setSelectedEvent('')
    alert('RSVP submitted! 🎉')
  }
  
  return (
    <div className="min-h-screen bg-sky-100 p-4">
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      <div className="w-full max-w-5xl mx-auto min-h-screen shadow-2xl border-8 border-sky-400 bg-gradient-to-br from-blue-50/90 to-sky-200/90" style={{backgroundImage: 'url(/images/St%20Pete%20Celebration%20Page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay'}}>
        <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-sky-800 text-center mb-8 drop-shadow-lg animate-bounce" style={{fontFamily: 'Georgia, serif'}}>🎉 Celebrations of Life 🎉</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/95 rounded-3xl shadow-xl p-6 border-4 border-sky-300 hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold text-sky-600 mb-4">St. Petersburg, Florida 🦩</h2>
            <p className="text-xl mb-4">Date: TBD</p>
            <button onClick={() => setSelectedEvent('stpete')} className="bg-sky-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-sky-700 hover:scale-105 transition-transform">RSVP for St. Pete</button>
          </div>
          
          <div className="bg-white/95 rounded-3xl shadow-xl p-6 border-4 border-sky-300 hover:scale-105 transition-transform">
            <h2 className="text-3xl font-bold text-sky-600 mb-4">South Bend, Indiana 🐵</h2>
            <p className="text-xl mb-4">Date: TBD</p>
            <button onClick={() => setSelectedEvent('southbend')} className="bg-sky-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-sky-700 hover:scale-105 transition-transform">RSVP for South Bend</button>
          </div>
        </div>
        
        {selectedEvent && (
          <div className="bg-white/95 rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border-4 border-sky-300 animate-pulse">
            <h3 className="text-3xl font-bold text-sky-600 mb-6">RSVP for {selectedEvent === 'stpete' ? 'St. Petersburg' : 'South Bend'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 border-2 border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all focus:border-sky-500 focus:outline-none hover:scale-105" required/>
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 border-2 border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all focus:border-sky-500 focus:outline-none hover:scale-105" required/>
              <input type="number" placeholder="Number Attending" min="1" value={formData.attending} onChange={(e) => setFormData({...formData, attending: parseInt(e.target.value)})} className="w-full p-4 border-2 border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all focus:border-sky-500 focus:outline-none hover:scale-105" required/>
              <button type="submit" className="w-full bg-sky-600 text-white p-4 rounded-3xl text-2xl font-bold hover:bg-sky-700 hover:scale-105 transition-transform shadow-lg">Submit RSVP! 🎊</button>
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
