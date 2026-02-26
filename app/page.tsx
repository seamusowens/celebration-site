export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 105, 180, 0.3), rgba(255, 20, 147, 0.3)), url(/images/Main Landing Page.jpg)`,
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
