'use client'
import { useState } from 'react'

export default function Stories() {
  return (
    <div className="min-h-screen p-8" style={{backgroundImage: 'url(/images/Stories%20Page.jpg)', backgroundSize: 'cover'}}>
      <div className="container mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-4 drop-shadow-lg">THAT'S ILLEGAL!</h1>
        <p className="text-3xl text-yellow-300 text-center mb-8 font-bold">Share Your Stories</p>
        <div className="fun-card p-8 max-w-2xl mx-auto mb-8">
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
            <input type="text" placeholder="Story Title" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
            <textarea placeholder="Share your story..." rows={6} className="w-full p-3 border-4 border-pink-500 rounded-lg" required></textarea>
            <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-lg text-2xl font-bold hover:bg-pink-700">Share Story! 🐵</button>
          </form>
        </div>
      </div>
    </div>
  )
}
