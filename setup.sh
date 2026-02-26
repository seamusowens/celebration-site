#!/bin/bash
cd ~/celebration-site

# Create remaining pages
mkdir -p app/pictures app/stories app/events app/api/pictures app/api/stories app/api/rsvp

# Pictures page
cat > app/pictures/page.tsx << 'EOPAGE'
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
EOPAGE

# Stories page
cat > app/stories/page.tsx << 'EOPAGE'
'use client'
import { useState } from 'react'

export default function Stories() {
  return (
    <div className="min-h-screen p-8" style={{backgroundImage: 'linear-gradient(rgba(255,105,180,0.3), rgba(255,20,147,0.3)), url(/images/Stories Page.jpg)', backgroundSize: 'cover'}}>
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
EOPAGE

# Events page
cat > app/events/page.tsx << 'EOPAGE'
'use client'
import { useState } from 'react'

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState('')
  
  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-black text-white text-center mb-8 drop-shadow-lg">🎉 Celebrations of Life 🎉</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="fun-card p-6" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(/images/St Pete Celebration Page.jpg)', backgroundSize: 'cover'}}>
            <h2 className="text-3xl font-bold text-pink-600 mb-4">St. Petersburg, Florida 🦩</h2>
            <p className="text-xl mb-4">Date: TBD</p>
            <button onClick={() => setSelectedEvent('stpete')} className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700">RSVP for St. Pete</button>
          </div>
          
          <div className="fun-card p-6" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(/images/Heinnies.jpg)', backgroundSize: 'cover'}}>
            <h2 className="text-3xl font-bold text-pink-600 mb-4">South Bend, Indiana 🐵</h2>
            <p className="text-xl mb-4">Date: TBD</p>
            <button onClick={() => setSelectedEvent('southbend')} className="bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700">RSVP for South Bend</button>
          </div>
        </div>
        
        {selectedEvent && (
          <div className="fun-card p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-pink-600 mb-6">RSVP for {selectedEvent === 'stpete' ? 'St. Petersburg' : 'South Bend'}</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
              <input type="email" placeholder="Email" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
              <input type="number" placeholder="Number Attending" min="1" className="w-full p-3 border-4 border-pink-500 rounded-lg" required/>
              <button type="submit" className="w-full bg-pink-600 text-white p-4 rounded-lg text-2xl font-bold hover:bg-pink-700">Submit RSVP! 🎊</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
EOPAGE

# Create tsconfig
cat > tsconfig.json << 'EOTS'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOTS

# Create next config
cat > next.config.js << 'EONEXT'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
EONEXT

echo "Setup complete!"
