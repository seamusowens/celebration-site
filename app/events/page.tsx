'use client'
import { useState } from 'react'

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState('')
  
  return (
    <div className="min-h-screen p-8" style={{backgroundImage: 'url(/images/St Pete Celebration Page.jpg)', backgroundSize: 'cover'}}>
      <div className="container mx-auto">
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
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
              <input type="email" placeholder="Email" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
              <input type="number" placeholder="Number Attending" min="1" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
              <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-lg text-2xl font-bold hover:bg-pink-700">Submit RSVP! 🎊</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
