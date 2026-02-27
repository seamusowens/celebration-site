export default function AltHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-4 relative overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
        <source src="/images/Flamingo_Background_Video_Generation.mp4" type="video/mp4" />
      </video>
      <div className="absolute left-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2 z-10">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🐵' : '🦩'}</span>)}
      </div>
      <div className="absolute right-0 top-[5%] bottom-0 flex flex-col justify-around text-4xl p-2 z-10">
        {[...Array(10)].map((_, i) => <span key={i} className="animate-pulse" style={{animationDelay: `${i * 0.2}s`}}>{i % 2 === 0 ? '🦩' : '🐵'}</span>)}
      </div>
      <div 
        className="w-full max-w-5xl min-h-screen shadow-2xl border-8 border-sky-400 flex items-center justify-center relative z-20 bg-gradient-to-br from-blue-50/90 to-sky-200/90"
        style={{
          backgroundImage: `url(/images/Main%20Landing%20Page.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="text-center p-8">
          <h1 className="text-6xl md:text-9xl font-bold text-sky-800 drop-shadow-2xl animate-bounce" style={{fontFamily: 'Georgia, serif', textShadow: '2px 2px 4px rgba(135,206,235,0.8)'}}>
            WHAT ARE YOU WEARING?!
          </h1>
          <p className="text-3xl md:text-5xl text-blue-600 mt-8 font-semibold drop-shadow-lg animate-pulse" style={{fontFamily: 'Georgia, serif'}}>
            🐵 A Celebration of Life 🦩
          </p>
        </div>
      </div>
    </div>
  )
}
