'use client'
import { useState, useEffect } from 'react'

export default function AltPictures() {
  const [pictures, setPictures] = useState([])
  const [caption, setCaption] = useState('')
  
  useEffect(() => {
    fetch('/api/pictures')
      .then(res => res.json())
      .then(data => setPictures(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fileInput = (e.target as HTMLFormElement).querySelector('input[type="file"]') as HTMLInputElement
    if (!fileInput.files?.[0]) return
    
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const url = e.target?.result as string
        const response = await fetch('/api/pictures', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, caption })
        })
        
        if (response.ok) {
          setCaption('')
          fileInput.value = ''
          const res = await fetch('/api/pictures')
          const data = await res.json()
          setPictures(data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    reader.readAsDataURL(fileInput.files[0])
  }
  
  return (
    <div className="min-h-screen bg-sky-100 p-4">
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      <div className="w-full max-w-5xl mx-auto min-h-screen shadow-2xl border-8 border-sky-400 bg-gradient-to-br from-blue-50/90 to-sky-200/90" style={{backgroundImage: 'url(/images/Pictures%20page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 75%', backgroundBlendMode: 'overlay'}}>
        <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-sky-800 text-center mb-8 drop-shadow-lg animate-bounce" style={{fontFamily: 'Georgia, serif'}}>📸 Picture Album 🐵</h1>
        <div className="bg-white/95 rounded-3xl shadow-xl p-8 max-w-2xl mx-auto mb-8 border-4 border-sky-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="file" accept="image/*" className="w-full p-4 border-2 border-sky-300 rounded-3xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-sky-500 file:text-white file:font-semibold hover:file:bg-sky-600 transition-all shadow-sm hover:shadow-md hover:scale-105" required/>
            <input type="text" placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-4 border-2 border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all focus:border-sky-500 focus:outline-none hover:scale-105"/>
            <button type="submit" className="w-full bg-sky-600 text-white p-4 rounded-3xl text-2xl font-bold hover:bg-sky-700 hover:scale-105 transition-transform shadow-lg">Upload Picture! 🎉</button>
          </form>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {pictures.map((pic: any) => (
            <div key={pic.id} className="bg-white/95 rounded-3xl shadow-xl p-4 border-4 border-sky-300 hover:scale-105 transition-transform">
              <img src={pic.url} alt={pic.caption || ''} className="w-full h-64 object-cover rounded-2xl mb-2"/>
              {pic.caption && <p className="text-center font-bold text-sky-800">{pic.caption}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
