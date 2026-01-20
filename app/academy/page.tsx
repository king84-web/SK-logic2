'use client'

import CourseCard from '@/frontend/components/CourseCard'
import { SITE_CONFIG } from '@/lib/config'

const courses = [
  {
    id: 1,
    title: 'Mobile Decoding phone',
    description: 'Learn advanced mobile device troubleshooting and decoding techniques (Online)',
    duration: '8 weeks',
    level: 'Intermediate',
    price: '$60',
  },
  {
    id: 2,
    title: 'Wi-Fi Removal',
    description: 'learn how to remove wifi (Online)',
    duration: '4 weeks',
    level: 'Beginner',
    price: '$10 ',
  },
  {
    id: 3,
    title: 'Social Media platforms Growth',
    description: 'Learn how to boast all social media platforms(Online)',
    duration: '2 weeks',
    level: 'Beginner',
    price: '$9',
  },
  {
    id: 4,
    title: 'Full-Stack Web Development',
    description: 'Complete journey from frontend to backend development (Online)',
    duration: '6 weeks',
    level: 'Advanced',
    price: '$99',
  },
]

export default function AcademyPage() {
  return (
    <div 
      className="min-h-screen pt-20 relative"
      style={{
        backgroundImage: `url(${SITE_CONFIG.images.academyBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src={SITE_CONFIG.images.logo}
              alt="SK Logic Logo" 
              className="w-auto h-12"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">SK Academy</h1>
          <p className="text-xl text-gray-400">Enhance your skills with our comprehensive courses</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Learn?</h2>
          <p className="text-gray-100 mb-6">Enroll in any course today and start your learning journey</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  )
}
