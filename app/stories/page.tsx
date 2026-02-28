'use client'
import { useState, useEffect } from 'react'

interface Story {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
}

export default function Stories() {
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
        alert('Story shared! 🐵')
      } else {
        alert('Failed to share story')
      }
    } catch (err) {
      alert('Error sharing story')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      
      <div className="w-full max-w-5xl mx-auto shadow-2xl border-8 border-pink-500">
        <div className="min-h-screen relative flex flex-col" style={{backgroundImage: 'url(/images/Stories%20Page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="container mx-auto p-8 flex-1">
            <h1 className="text-5xl font-black text-white text-center mb-4 drop-shadow-lg">THAT'S ILLEGAL!</h1>
            <p className="text-3xl text-yellow-300 text-center mb-8 font-bold">Share Your Stories</p>
          </div>
          
          <div className="p-8">
            <div className="fun-card p-4 max-w-full mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-center justify-center">
                <input type="text" placeholder="Your Name" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="flex-1 min-w-[150px] p-3 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
                <input type="text" placeholder="Story Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="flex-1 min-w-[150px] p-3 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
                <textarea placeholder="Share your story..." rows={2} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="flex-1 min-w-[200px] p-3 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required></textarea>
                <button type="submit" className="bg-pink-600 text-white px-6 py-3 rounded-2xl text-lg font-bold hover:bg-pink-700 hover:scale-105 transition-transform shadow-lg whitespace-nowrap">Share Story! 🐵</button>
              </form>
            </div>
          </div>
        </div>

        {stories.length > 0 && (
          <div className="bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="fun-card p-6 transition-all duration-500">
                <h3 className="text-2xl font-bold text-pink-600 mb-2">{stories[currentIndex].title}</h3>
                <p className="text-sm text-gray-600 mb-3">By {stories[currentIndex].author}</p>
                <p className="text-lg">{stories[currentIndex].content}</p>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {stories.map((_: any, idx: number) => (
                  <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-pink-600' : 'bg-pink-300'}`}/>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
