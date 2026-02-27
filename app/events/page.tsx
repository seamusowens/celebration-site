'use client'
import { useState, useEffect } from 'react'

export default function Events() {
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
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      <div className="w-full max-w-5xl mx-auto min-h-screen shadow-2xl border-8 border-pink-500" style={{backgroundImage: 'url(/images/St%20Pete%20Celebration%20Page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto p-8">
        <h1 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">🎉 Celebrations of Life 🎉</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="fun-card p-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">St. Petersburg, Florida 🦩</h2>
            <p className="text-xl mb-4">Date: TBD</p>
            <button onClick={() => setSelectedEvent('stpete')} className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700">RSVP for St. Pete</button>
          </div>
          
          <div className="fun-card p-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">South Bend, Indiana 🐵</h2>
            <p className="text-xl mb-4">Date: TBD</p>
            <button onClick={() => setSelectedEvent('southbend')} className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700">RSVP for South Bend</button>
          </div>
        </div>
        
        {selectedEvent && (
          <div className="fun-card p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-pink-600 mb-6">RSVP for {selectedEvent === 'stpete' ? 'St. Petersburg' : 'South Bend'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
              <input type="number" placeholder="Number Attending" min="1" value={formData.attending} onChange={(e) => setFormData({...formData, attending: parseInt(e.target.value)})} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
              <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-2xl text-2xl font-bold hover:bg-pink-700 hover:scale-105 transition-transform shadow-lg">Submit RSVP! 🎊</button>
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
