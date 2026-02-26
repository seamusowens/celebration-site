'use client'
import { useState, useEffect } from 'react'

export default function Stories() {
  const [stories, setStories] = useState([])
  const [formData, setFormData] = useState({ author: '', title: '', content: '' })

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => setStories(data))
  }, [])

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
    <div className="min-h-screen p-8" style={{backgroundImage: 'url(/images/Stories%20Page.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom'}}>
      <div className="container mx-auto">
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

        <div className="space-y-6 max-w-4xl mx-auto">
          {stories.map((story: any) => (
            <div key={story.id} className="fun-card p-6">
              <h3 className="text-2xl font-bold text-pink-600 mb-2">{story.title}</h3>
              <p className="text-sm text-gray-600 mb-3">By {story.author}</p>
              <p className="text-lg">{story.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
