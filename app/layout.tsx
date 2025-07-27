import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'SurfStories - Travel Surf Blog',
  description: 'Discover amazing surf destinations, learn about surf culture, and get essential tips for your wave-riding journey.',
  keywords: 'surfing, travel, surf blog, destinations, surf culture, beginner tips',
  authors: [{ name: 'SurfStories Team' }],
  openGraph: {
    title: 'SurfStories - Travel Surf Blog',
    description: 'Discover amazing surf destinations, learn about surf culture, and get essential tips for your wave-riding journey.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}