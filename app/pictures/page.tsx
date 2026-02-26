'use client'
import { useState } from 'react'

export default function Pictures() {
  return (
    <div className="min-h-screen p-8" style={{backgroundImage: 'linear-gradient(rgba(255,105,180,0.3), rgba(255,20,147,0.3)), url(/images/Pictures page.jpg)', backgroundSize: 'cover'}}>
      <div className="container mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">📸 Picture Album 📸</h1>
        <div className="fun-card p-8 max-w-2xl mx-auto">
          <form className="space-y-4">
            <input type="file" accept="image/*" className="w-full p-3 border-4 border-pink-500 rounded-lg"/>
            <input type="text" placeholder="Caption (optional)" className="w-full p-3 border-4 border-pink-500 rounded-lg"/>
            <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-lg text-2xl font-bold hover:bg-pink-700">Upload Picture! 🎉</button>
          </form>
        </div>
      </div>
    </div>
  )
}
