'use client'

import Link from 'next/link'
import { useContent } from '@/lib/content-context'

interface Service {
  icon: string
  title: string
  description: string
  count: number
}

const serviceCategories: Service[] = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'Professional websites for NGOs, Companies, E-commerce, and Real Estate',
    count: 4,
  },
  {
    icon: '🔧',
    title: 'Technical Services',
    description: 'Social Media Boosting, Wi-Fi Management, and iCloud Services',
    count: 3,
  },
  {
    icon: '📚',
    title: 'SK Academy',
    description: 'Learn Mobile Decoding, Wi-Fi Management, Social Media, and Full-Stack Development',
    count: 4,
  },
]

export default function ServiceCategories() {
  const { settings } = useContent()

  // If the admin provided a gradient, use it; otherwise use the service image if available
  // Always use the services feature image for the services section background
  const bgImage = '/images/services-feature.avif'

  const sectionStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }

  const sectionClass = 'relative pb-12'

  const fontStyle: React.CSSProperties = {
    fontFamily: settings?.fontFamily || undefined,
  }

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="container mx-auto px-4 py-12" style={fontStyle}>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="section-title text-white">Our Services</h2>
            <p className="section-subtitle text-slate-200">Comprehensive solutions for your digital needs</p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {serviceCategories.map((category, index) => (
            <div key={index} className="card-hover group bg-white/5 p-6 rounded-xl">
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{category.title}</h3>
              <p className="text-slate-300 mb-6">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-400">{category.count} Services</span>
                <Link href="/booking" className="text-blue-300 group-hover:text-blue-100 transition font-bold">
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/booking" className="btn-primary text-lg">
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
