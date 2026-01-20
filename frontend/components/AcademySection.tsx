import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/config'

export default function AcademySection() {
  return (
    <section 
      className="section relative py-20 bg-cover bg-center"
      style={{
        backgroundImage: `url(${SITE_CONFIG.images.hero})`,
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">{SITE_CONFIG.academy.name}</h2>
            <p className="text-lg text-gray-100 mb-8 leading-relaxed">
              {SITE_CONFIG.academy.description}
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl">✓</span>
                <span>Expert instructors with real-world experience</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl">✓</span>
                <span>Hands-on projects and practical assignments</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl">✓</span>
                <span>Flexible learning schedule</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl">✓</span>
                <span>Industry-recognized certificates</span>
              </div>
            </div>
            <Link href={SITE_CONFIG.urls.academy} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block">
              Explore Courses
            </Link>
          </div>
          <div className="bg-blue-900/60 rounded-lg p-8 border border-blue-400/50">
            <h3 className="text-2xl font-bold mb-6 text-white">Featured Courses</h3>
            <ul className="space-y-4">
              {SITE_CONFIG.academy.courses.slice(0, 4).map((course, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <span className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm font-bold text-blue-900">{index + 1}</span>
                  <span>{course.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
