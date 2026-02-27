import '../globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Celebration of Life - Alt',
  description: 'A joyful celebration',
}

export default function AltLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-sky-600 p-4 shadow-lg border-b-4 border-sky-800">
          <div className="container mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/alt" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-200 transition hover:scale-110 transform" style={{fontFamily: 'Georgia, serif'}}>
              🐵 Home 🦩
            </Link>
            <Link href="/alt/pictures" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-200 transition hover:scale-110 transform" style={{fontFamily: 'Georgia, serif'}}>
              📸 Pictures
            </Link>
            <Link href="/alt/stories" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-200 transition hover:scale-110 transform" style={{fontFamily: 'Georgia, serif'}}>
              📖 Stories
            </Link>
            <Link href="/alt/events" className="text-white text-xl md:text-2xl font-bold hover:text-yellow-200 transition hover:scale-110 transform" style={{fontFamily: 'Georgia, serif'}}>
              🎉 Events
            </Link>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
