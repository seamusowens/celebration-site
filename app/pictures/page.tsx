'use client'
import { useState, useEffect } from 'react'

export default function Pictures() {
  const [pictures, setPictures] = useState([])
  
  useEffect(() => {
    fetch('/api/pictures')
      .then(res => res.json())
      .then(data => setPictures(data))
  }, [])
  
  return (
    <div className="min-h-screen p-8" style={{backgroundImage: 'url(/images/Pictures page.jpg)', backgroundSize: 'cover'}}>
      <div className="absolute top-20 right-10 w-24">
        <img src="/monkey-meme.svg" alt="monkey" />
      </div>
      <div className="container mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">📸 Picture Album 🐵</h1>
        <div className="fun-card p-8 max-w-2xl mx-auto mb-8">
          <form className="space-y-4">
            <input type="file" accept="image/*" className="w-full p-3 border-4 border-pink-500 rounded-lg"/>
            <input type="text" placeholder="Caption (optional)" className="w-full p-3 border-4 border-pink-500 rounded-lg"/>
            <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-lg text-2xl font-bold hover:bg-pink-700">Upload Picture! 🎉</button>
          </form>
        </div>
        
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
  )
}
