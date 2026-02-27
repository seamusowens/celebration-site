'use client'
import { useState, useEffect } from 'react'

export default function Pictures() {
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
          alert('Picture uploaded! 🎉')
        } else {
          alert('Upload failed')
        }
      } catch (err) {
        alert('Error uploading picture')
      }
    }
    reader.readAsDataURL(fileInput.files[0])
  }
  
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      <div className="w-full max-w-5xl mx-auto min-h-screen shadow-2xl border-8 border-pink-500" style={{backgroundImage: 'url(/images/Pictures%20page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 75%'}}>
        <div className="container mx-auto p-8">
        <h1 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">📸 Picture Album 🐵</h1>
        <div className="fun-card p-8 max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input type="file" accept="image/*" className="w-full p-4 border-2 border-pink-300 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-500 file:text-white file:font-semibold hover:file:bg-pink-600 transition-all shadow-sm hover:shadow-md" required/>
            </div>
            <input type="text" placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none"/>
            <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-2xl text-2xl font-bold hover:bg-pink-700 hover:scale-105 transition-transform shadow-lg">Upload Picture! 🎉</button>
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
    </div>
  )
}
