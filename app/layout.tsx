import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'PHIJETH KONSTRUCTION - Civil Engineering and Construction',
  description: 'PHIJETH KONSTRUCTION provides building construction, road construction, structural design, and project management with professional civil engineering standards and Experts who are Ready to serve and Deliver with speed and Top notched quality.',
  icons: {
    icon: '/images/LOGO.png',
    apple: '/images/LOGO.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
