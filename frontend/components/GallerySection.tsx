'use client'

import { useState } from 'react'
import { useContent } from '@/lib/content-context'
import { motion } from 'framer-motion'
import { Trash2, Plus } from 'lucide-react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  category?: string
}

export default function GallerySection() {
  const { gallery, updateGallery } = useContent()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    title: '',
    category: 'general',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.src || !formData.alt || !formData.title) {
      setError('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/content/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newImage = await response.json()
        setSuccess('Image added successfully!')
        setFormData({ src: '', alt: '', title: '', category: 'general' })

        // Trigger gallery update
        if (updateGallery) {
          updateGallery([...gallery, newImage])
        }

        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to add image')
      }
    } catch (err) {
      setError('Error adding image')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`/api/admin/content/gallery/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSuccess('Image removed successfully!')
        // Remove from local state
        if (updateGallery) {
          updateGallery(gallery.filter((img: GalleryImage) => img.id !== id))
        }
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to remove image')
      }
    } catch (err) {
      setError('Error removing image')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Add Image Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Add New Gallery Image
        </h2>

        <form onSubmit={handleAddImage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="src"
              value={formData.src}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Image title"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="general">General</option>
                <option value="portfolio">Portfolio</option>
                <option value="services">Services</option>
                <option value="team">Team</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Alt Text *
            </label>
            <input
              type="text"
              name="alt"
              value={formData.alt}
              onChange={handleInputChange}
              placeholder="Description for accessibility"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {error && <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm">{error}</div>}
          {success && <div className="p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-200 text-sm">{success}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-lg transition-colors"
          >
            {isLoading ? 'Adding...' : 'Add Image'}
          </button>
        </form>
      </motion.div>

      {/* Gallery Images List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Gallery Images ({gallery.length})</h2>

        {gallery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No gallery images yet. Add one above to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image: GalleryImage) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition"
              >
                {/* Image */}
                <div className="aspect-square bg-slate-800 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-family="sans-serif" font-size="24"%3EImage Error%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-4 bg-slate-900">
                  <h3 className="font-semibold text-white text-sm truncate">{image.title}</h3>
                  {image.category && (
                    <p className="text-xs text-slate-400 mt-1">
                      Category: <span className="text-slate-300">{image.category}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-2 truncate">{image.src}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  disabled={isLoading}
                  className="absolute top-2 right-2 p-2 bg-red-600/80 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
