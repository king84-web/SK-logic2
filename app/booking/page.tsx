'use client'

import { useState } from 'react'
import BookingForm from '@/frontend/components/BookingForm'
import ServiceGrid from '@/frontend/components/ServiceGrid'
import { SITE_CONFIG } from '@/lib/config'

const services = [
  {
    id: 'web-dev-ngo',
    category: 'Web Development',
    title: 'NGO Website',
    description: 'Professional website for Non-Governmental Organizations',
    price: 'Custom Quote',
  },
  {
    id: 'web-dev-company',
    category: 'Web Development',
    title: 'Company Website',
    description: 'Corporate website with advanced features',
    price: 'Custom Quote',
  },
  {
    id: 'web-dev-ecommerce',
    category: 'Web Development',
    title: 'E-Commerce Store',
    description: 'Full-featured online store with payment integration',
    price: 'Custom Quote',
  },
  {
    id: 'web-dev-realestate',
    category: 'Web Development',
    title: 'Real Estate Portal',
    description: 'Property listing and management system',
    price: 'Custom Quote',
  },
  {
    id: 'tech-social-media',
    category: 'Technical Services',
    title: 'Social Media Boosting',
    description: 'Grow your social media presence organically',
    price: 'Starting from $9',
  },
  {
    id: 'tech-wifi',
    category: 'Technical Services',
    title: 'Wi-Fi Removal/Fixes',
    description: 'Expert Wi-Fi troubleshooting and optimization',
    price: 'Starting from $49',
  },
  {
    id: 'tech-icloud',
    category: 'Technical Services',
    title: 'iCloud Services',
    description: 'Comprehensive iCloud account management',
    price: 'Starting from $79',
  },
]

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero section with background */}
      <div 
        className="relative bg-cover bg-center py-20 mb-12"
        style={{
          backgroundImage: `url(${SITE_CONFIG.images.hero})`,
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={SITE_CONFIG.images.logo}
              alt="SK Logic Logo" 
              className="w-auto h-12"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Digital Vision?</h1>
          <p className="text-2xl text-gray-200 max-w-2xl mx-auto">
            Are you ready to build your website with us or thinking about learning something new?
          </p>
        </div>
      </div>

      {/* Services and booking section */}
      <div className="bg-dark">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ServiceGrid services={services} selectedService={selectedService} onSelect={setSelectedService} />
            </div>
            <div className="lg:col-span-1">
              <BookingForm selectedService={selectedService} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
