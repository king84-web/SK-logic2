'use client'

import { useState } from 'react'

interface Service {
  id: string
  category: string
  title: string
  description: string
  price: string
}

interface ServiceGridProps {
  services: Service[]
  selectedService: string | null
  onSelect: (id: string) => void
}

export default function ServiceGrid({ services, selectedService, onSelect }: ServiceGridProps) {
  const [filterCategory, setFilterCategory] = useState('All')

  const categories = ['All', ...new Set(services.map(s => s.category))]
  const filtered = filterCategory === 'All' ? services : services.filter(s => s.category === filterCategory)

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((service) => (
          <div
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`p-6 rounded-lg border-2 cursor-pointer transition ${
              selectedService === service.id
                ? 'bg-blue-600 border-blue-400'
                : 'bg-slate-800 border-slate-700 hover:border-blue-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-blue-400">{service.category}</span>
                <h3 className="text-xl font-bold mt-1">{service.title}</h3>
                <p className="text-gray-300 mt-2">{service.description}</p>
              </div>
              <span className="text-lg font-bold text-yellow-400">{service.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
