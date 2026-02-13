'use client'

interface Course {
  id: number
  title: string
  description: string
  duration: string
  level: string
  price: string
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const handleEnrollClick = () => {
    const text = `Hello! My name is [your name]. I would like to enroll in the ${course.title} course.`;
    window.open(`https://wa.me/250792405593?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="card-hover">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block bg-blue-600/30 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
            {course.level}
          </span>
          <h3 className="text-xl font-bold">{course.title}</h3>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">{course.description}</p>
      <div className="space-y-2 mb-6 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <span>⏱️</span>
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>💰</span>
          <span className="text-lg font-bold text-blue-400">{course.price}</span>
        </div>
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
        onClick={handleEnrollClick}
      >
        Enroll Now
      </button>
    </div>
  )
}
