export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(/images/Main%20Landing%20Page.jpg)`,
        backgroundSize: '100% 100%',
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
