'use client'

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'John flomo',
    role: 'NGO Director',
    content: ' I am John flomo from Nimbia county, liberia SK Logic transformed our online presence. Their team was professional, responsive, and delivered beyond expectations.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'E-commerce Owner',
    content: 'The e-commerce solution they built increased our sales by 40%. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Mike Davis',
    role: 'Academy Student',
    content: 'The Full-Stack Development course was comprehensive and practical. I landed a job within a month of completion.',
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    role: 'Social Media Manager',
    content: 'Their social media boosting service helped us grow our followers by 10x in 3 months.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="section bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-white">Verified Services & Testimonials</h2>
        <p className="section-subtitle text-slate-300">What our clients and students say about us</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-6 border-2 border-blue-400 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-400/20 transition duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-200 mb-4 line-clamp-4">{testimonial.content}</p>
              <div className="border-t border-slate-600 pt-4">
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-blue-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
