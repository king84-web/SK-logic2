'use client'

import Link from 'next/link'

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
  return (
    <section className="section bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Comprehensive solutions for your digital needs</p>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div key={index} className="card-hover group">
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
              <p className="text-gray-400 mb-6">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-400">{category.count} Services</span>
                <Link href="/booking" className="text-blue-600 group-hover:text-blue-400 transition font-bold">
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
