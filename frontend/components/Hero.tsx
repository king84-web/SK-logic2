import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/config'

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{
        backgroundImage: `url(${SITE_CONFIG.images.serviceMain})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <img 
              src={SITE_CONFIG.images.logo}
              alt="SK Logic Logo" 
              className="w-auto h-12"
            />
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black italic animate-color-cycle">
              SK Logic
            </h2>
          </div>

          {/* Subheading/Tagline */}
          <span className="text-blue-400 font-semibold tracking-widest uppercase text-sm mb-4 block animate-fade-in">
            {SITE_CONFIG.company.tagline}
          </span>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] font-black">
            <span className="gradient-text">Think Logically,</span>
            <br />
            <span className="text-white">Build Digital.</span>
          </h1>

          {/* Body Text */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium">
            Transform your digital presence with our comprehensive web development, 
            technical services, and educational programs.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-5">
            <Link href={SITE_CONFIG.urls.booking} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25">
              Book a Service
            </Link>
            <Link href={SITE_CONFIG.urls.academy} className="px-8 py-4 border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold transition-all">
              Learn with Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
