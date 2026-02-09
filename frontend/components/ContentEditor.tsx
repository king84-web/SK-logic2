'use client'

import { useState, useEffect } from 'react'
import { useContent } from '@/lib/content-context'
import { Loader2, CheckCircle } from 'lucide-react'

export default function ContentEditor() {
  const { hero, updateHero, isLoading: contextLoading } = useContent()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [mainImage, setMainImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (hero) {
      setTitle(hero.title || '')
      setSubtitle(hero.subtitle || '')
      setMainImage(hero.mainImage || '')
    }
  }, [hero])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      await updateHero({
        title,
        subtitle,
        mainImage,
      })
      setMessage('Hero section updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Failed to update hero section')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (contextLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section Editor */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Hero Section</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="SK Logic"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="Think Logically, Build Digital."
            />
          </div>

          {/* Main Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Main Image URL
            </label>
            <input
              type="url"
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="/images/home-hero-image.jpg"
            />
            {mainImage && (
              <div className="mt-4">
                <p className="text-sm text-slate-400 mb-2">Preview:</p>
                <img 
                  src={mainImage} 
                  alt="Hero preview" 
                  className="max-w-xs h-auto rounded-lg border border-slate-600"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {message && (
            <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-400 text-sm flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

