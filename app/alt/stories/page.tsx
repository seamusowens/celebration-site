'use client'
import { useState, useEffect } from 'react'

interface Story {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

export default function AltStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [formData, setFormData] = useState({ author: '', title: '', content: '' })
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => setStories(data))
  }, [])

  useEffect(() => {
    if (stories.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % stories.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [stories.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setFormData({ author: '', title: '', content: '' })
        const res = await fetch('/api/stories')
        const data = await res.json()
        setStories(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-sky-100 p-4">
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      <div className="w-full max-w-5xl mx-auto min-h-screen shadow-2xl border-8 border-sky-400 bg-gradient-to-br from-blue-50/90 to-sky-200/90" style={{backgroundImage: 'url(/images/Stories%20Page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay'}}>
        <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-sky-800 text-center mb-4 drop-shadow-lg animate-bounce" style={{fontFamily: 'Georgia, serif'}}>THAT'S ILLEGAL!</h1>
        <p className="text-3xl text-blue-600 text-center mb-8 font-semibold animate-pulse" style={{fontFamily: 'Georgia, serif'}}>Share Your Stories</p>
        <div className="bg-white/95 rounded-3xl shadow-xl p-8 max-w-2xl mx-auto mb-8 border-4 border-sky-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full p-4 border-2 border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all focus:border-sky-500 focus:outline-none hover:scale-105" required/>
            <input type="text" placeholder="Story Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 border-2 border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all focus:border-sky-500 focus:outline-none hover:scale-105" required/>
            <textarea placeholder="Share your story..." rows={6} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-4 border-2 border-sky-300 rounded-3xl shadow-sm hover:shadow-md transition-all focus:border-sky-500 focus:outline-none hover:scale-105" required></textarea>
            <button type="submit" className="w-full bg-sky-600 text-white p-4 rounded-3xl text-2xl font-bold hover:bg-sky-700 hover:scale-105 transition-transform shadow-lg">Share Story! 🐵</button>
          </form>
        </div>

        {stories.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 rounded-3xl shadow-xl p-6 border-4 border-sky-300 transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold text-sky-800 mb-2">{stories[currentIndex].title}</h3>
              <p className="text-sm text-gray-600 mb-3">By {stories[currentIndex].author}</p>
              <p className="text-lg">{stories[currentIndex].content}</p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {stories.map((_: any, idx: number) => (
                <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-sky-600 scale-125' : 'bg-sky-300'}`}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
