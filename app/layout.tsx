import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/frontend/components/Navigation'
import Footer from '@/frontend/components/Footer'

export const metadata: Metadata = {
  title: 'SK Logic - Think Logically, Build Digital',
  description: 'Professional service-booking platform for web development, technical device services, and digital education.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
