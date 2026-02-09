'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function Hero() {
  const [showAdmin, setShowAdmin] = useState(false)

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault()
        setShowAdmin(prev => !prev)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  return (
    <section 
      className="relative text-white py-20 bg-cover bg-center"
      style={{
        backgroundImage: `url(/images/home-hero-image.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container relative mx-auto px-4">
      <h1 className="text-5xl font-bold">Think Logically, Build Digital.</h1>
      <p className="mt-4 text-xl text-slate-400">Transform your digital presence.</p>
      <div className="flex gap-4 mt-8">
      <button className="bg-blue-600 px-6 py-3 rounded-lg">Book a Service</button>
      <button className="border border-slate-700 px-6 py-3 rounded-lg">Learn with Us</button>
      {showAdmin && (
      <Link href="/admin/login" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
        <Lock size={16} /> Admin Login
      </Link>
      )}
      </div>
      </div>
    </section>
  )
}
