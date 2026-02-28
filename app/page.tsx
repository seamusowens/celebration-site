import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Link href="/admin" className="fixed bottom-4 right-4 text-xs text-gray-400 hover:text-gray-200 transition z-50">
        Admin
      </Link>
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2">
        {[...Array(10)].map((_, i) => <span key={i}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      <div 
        className="w-full max-w-5xl min-h-screen shadow-2xl border-8 border-pink-500 flex items-center justify-center"
        style={{
          backgroundImage: `url(/images/Main%20Landing%20Page.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center p-8">
          <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl animate-pop" style={{textShadow: '4px 4px 8px rgba(0,0,0,0.8), -2px -2px 4px rgba(255,255,255,0.5)'}}>
            What Are You Wearing?!
          </h1>
        </div>
      </div>
    </div>
  )
}
