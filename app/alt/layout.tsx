import '../globals.css'

export const metadata = {
  title: 'Celebration of Life - Alt',
  description: 'A joyful celebration',
}

export default function AltLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
