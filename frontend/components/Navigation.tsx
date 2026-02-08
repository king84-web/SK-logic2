'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/config'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Brand/Logo Section */}
          <Link href={SITE_CONFIG.urls.home} className="text-2xl font-bold flex items-center gap-2 animate-color-cycle">
            <span className="animate-bounce-smooth">⚡</span>
            SK Logic
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={SITE_CONFIG.urls.home} className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href={SITE_CONFIG.urls.booking} className="text-gray-300 hover:text-white transition">Booking</Link>
            <Link href={SITE_CONFIG.urls.academy} className="text-gray-300 hover:text-white transition">Academy</Link>
            <Link href={SITE_CONFIG.urls.contact} className="text-gray-300 hover:text-white transition">Contact</Link>
            
            <Link 
              href={SITE_CONFIG.urls.booking} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-slate-800 mt-2">
            <Link href={SITE_CONFIG.urls.home} onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white transition py-2 px-4">Home</Link>
            <Link href={SITE_CONFIG.urls.booking} onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white transition py-2 px-4">Booking</Link>
            <Link href={SITE_CONFIG.urls.academy} onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white transition py-2 px-4">Academy</Link>
            <Link href={SITE_CONFIG.urls.contact} onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white transition py-2 px-4">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  )
}