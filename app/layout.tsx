import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/frontend/components/Navigation'
import Footer from '@/frontend/components/Footer'
import { Providers } from '@/frontend/components/Providers'
import BackgroundWrapper from '@/app/background-wrapper'

export const dynamic = 'force-dynamic';

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark text-white">
        <Providers>
          <BackgroundWrapper>
            <Navigation />
            {children}
            <Footer />
          </BackgroundWrapper>
        </Providers>
      </body>
    </html>
  )
}