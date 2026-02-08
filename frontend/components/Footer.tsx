import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/config'

export default function Footer() {
  return (
    <footer 
      className="relative py-12 overflow-hidden"
      style={{
        backgroundImage: `url(/images/footer-bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1a1a2e',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-emerald-300 font-black text-lg animate-glow mb-4">{SITE_CONFIG.company.name}</h3>
            <p className="text-gray-100 text-sm">{SITE_CONFIG.company.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-gray-100">
              <li><Link href={SITE_CONFIG.urls.booking} className="hover:text-emerald-300 hover:font-semibold transition">Web Development</Link></li>
              <li><Link href={SITE_CONFIG.urls.booking} className="hover:text-emerald-300 hover:font-semibold transition">Technical Services</Link></li>
              <li><Link href={SITE_CONFIG.urls.academy} className="hover:text-emerald-300 hover:font-semibold transition">SK Academy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-100">
              <li><Link href={SITE_CONFIG.urls.home} className="hover:text-emerald-300 hover:font-semibold transition">About Us</Link></li>
              <li><Link href={SITE_CONFIG.urls.booking} className="hover:text-emerald-300 hover:font-semibold transition">Services</Link></li>
              <li><Link href={SITE_CONFIG.urls.academy} className="hover:text-emerald-300 hover:font-semibold transition">Academy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-100">
              <li><a href={SITE_CONFIG.social.email} className="hover:text-emerald-300 hover:font-semibold transition">{SITE_CONFIG.contact.email}</a></li>
              <li><a href={SITE_CONFIG.social.whatsapp} className="hover:text-emerald-300 hover:font-semibold transition">{SITE_CONFIG.contact.whatsapp}</a></li>
              <li className="text-gray-200 text-xs">{SITE_CONFIG.location.fullAddress}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/30 pt-8 text-center text-gray-100 text-sm">
          <p><span className="text-emerald-300 font-bold animate-pulse-glow">&copy; 2026 SK Logic</span>. All rights reserved.</p>
          <p className="text-xs mt-2 text-gray-200">{SITE_CONFIG.owner.name} | {SITE_CONFIG.company.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
