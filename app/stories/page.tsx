'use client'
import { useState, useEffect } from 'react'

export default function Stories() {
  const [stories, setStories] = useState([])
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
    await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setFormData({ author: '', title: '', content: '' })
    const res = await fetch('/api/stories')
    setStories(await res.json())
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-5xl mx-auto min-h-screen shadow-2xl border-8 border-pink-500" style={{backgroundImage: 'url(/images/Stories%20Page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto p-8">
        <h1 className="text-5xl font-black text-white text-center mb-4 drop-shadow-lg">THAT'S ILLEGAL!</h1>
        <p className="text-3xl text-yellow-300 text-center mb-8 font-bold">Share Your Stories</p>
        <div className="fun-card p-8 max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
            <input type="text" placeholder="Story Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required/>
            <textarea placeholder="Share your story..." rows={6} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-4 border-2 border-pink-300 rounded-2xl shadow-sm hover:shadow-md transition-all focus:border-pink-500 focus:outline-none" required></textarea>
            <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-2xl text-2xl font-bold hover:bg-pink-700 hover:scale-105 transition-transform shadow-lg">Share Story! 🐵</button>
          </form>
        </div>

        {stories.length > 0 && (
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
        )}
      </div>
    </div>
    </div>
  )
}
