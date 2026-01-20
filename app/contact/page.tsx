'use client'

import React from 'react'
import ContactForm from '@/frontend/components/ContactForm'
import Testimonials from '@/frontend/components/Testimonials'
import { SITE_CONFIG } from '@/lib/config'

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero section with background */}
      <div 
        className="relative bg-cover bg-center pt-20 pb-12"
        style={{
          backgroundImage: `url(${SITE_CONFIG.images.contactBg})`,
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-4 py-12 text-white">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={SITE_CONFIG.images.logo}
              alt="SK Logic Logo" 
              className="w-auto h-10"
            />
          </div>
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Have questions? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>
      </div>

      {/* Contact content */}
      <div className="bg-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-400 mb-8">
                Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-400">kamarasolomon164@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-lg text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">WhatsApp</h3>
                    <p className="text-gray-400">+250 792 405 593</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Office Location</h3>
                    <p className="text-gray-400">Musanze, Northern Province, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-slate-900">
        <Testimonials />
      </div>
    </div>
  )
} // <--- THIS WAS MISSING