'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [images] = useState([
    '/images/Main Landing Page.jpg',
    '/images/Pictures page.jpg',
    '/images/Stories Page.jpg',
    '/images/St Pete Celebration Page.jpg',
    '/images/Heinnies.jpg'
  ])
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 105, 180, 0.3), rgba(255, 20, 147, 0.3)), url(${images[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center p-8">
        <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl animate-pop" style={{textShadow: '4px 4px 8px rgba(0,0,0,0.8), -2px -2px 4px rgba(255,255,255,0.5)'}}>
          WHAT ARE YOU WEARING?!
        </h1>
        <p className="text-3xl md:text-5xl text-yellow-300 mt-8 font-bold drop-shadow-lg">
          🐵 A Celebration of Life 🦩
        </p>
      </div>
    </div>
  )
}
