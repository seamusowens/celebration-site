import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Celebration of Life',
  description: 'A joyful celebration',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-pink-600 p-4 shadow-lg border-b-4 border-pink-800">
          <div className="container mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-300 transition">
              🐵 Home 🦩
            </Link>
            <Link href="/pictures" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-300 transition">
              📸 Pictures
            </Link>
            <Link href="/stories" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-300 transition">
              📖 Stories
            </Link>
            <Link href="/events" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-300 transition">
              🎉 Events
            </Link>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
