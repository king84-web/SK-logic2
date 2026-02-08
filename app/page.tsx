'use client'

import Hero from '@/frontend/components/Hero'
import ServiceCategories from '@/frontend/components/ServiceCategories'
import AcademySection from '@/frontend/components/AcademySection'
import Testimonials from '@/frontend/components/Testimonials'
import CTA from '@/frontend/components/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceCategories />
      <AcademySection />
      <Testimonials />
      <CTA />
    </main>
  )
}
