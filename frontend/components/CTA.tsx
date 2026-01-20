import Link from 'next/link'
import { SITE_CONFIG } from '@/backend/lib/config'

export default function CTA() {
  return (
    <section className="section bg-gradient-to-r from-blue-600 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-100 mb-8">
            Whether you need a professional website, technical support, or want to upskill yourself, {SITE_CONFIG.company.name} is your trusted partner. Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={SITE_CONFIG.urls.booking} className="btn-primary">
              Book a Service Today
            </Link>
            <Link href={SITE_CONFIG.urls.academy} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
