'use client'

import { useState, useEffect } from 'react'
import { useContent } from '@/lib/content-context'
import { Loader2, CheckCircle } from 'lucide-react'

export default function SettingsPanel() {
  const { settings, updateSettings, isLoading: contextLoading } = useContent()
  const [pageBackgroundColor, setPageBackgroundColor] = useState('')
  const [pageBackgroundGradient, setPageBackgroundGradient] = useState('')
  const [accentColor, setAccentColor] = useState('')
  const [textColor, setTextColor] = useState('')
  const [fontFamily, setFontFamily] = useState('')
  const [baseFontSize, setBaseFontSize] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (settings) {
      setPageBackgroundColor(settings.pageBackgroundColor || '')
      setPageBackgroundGradient(settings.pageBackgroundGradient || '')
      setAccentColor(settings.accentColor || '')
      setTextColor(settings.textColor || '')
      setFontFamily(settings.fontFamily || '')
      setBaseFontSize(settings.baseFontSize || '')
    }
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      await updateSettings({
        pageBackgroundColor,
        pageBackgroundGradient,
        accentColor,
        textColor,
        fontFamily,
        baseFontSize,
      })
      setMessage('Settings updated successfully! Changes will appear across all pages.')
      setTimeout(() => setMessage(''), 4000)
    } catch (error) {
      setMessage('Failed to update settings')
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
      {/* Page Settings */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Page Appearance Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Page Background Color (Tailwind gradient)
            </label>
            <input
              type="text"
              value={pageBackgroundColor}
              onChange={(e) => setPageBackgroundColor(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="from-slate-950 to-slate-900"
            />
            <p className="text-xs text-slate-400 mt-2">Example: from-blue-900 to-purple-900</p>
          </div>

          {/* Background Gradient */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Page Background Gradient (Tailwind gradient)
            </label>
            <input
              type="text"
              value={pageBackgroundGradient}
              onChange={(e) => setPageBackgroundGradient(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="from-slate-950 via-slate-900 to-slate-900"
            />
            <p className="text-xs text-slate-400 mt-2">Example: from-blue-950 via-slate-900 to-purple-950</p>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Accent Color (Tailwind color)
            </label>
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="blue-600"
            />
            <p className="text-xs text-slate-400 mt-2">Example: purple-600, emerald-600, rose-600</p>
            <div
              className="mt-3 p-3 rounded-lg"
              style={{ backgroundColor: getColorFromTailwind(accentColor) }}
            >
              <p className="text-xs text-white">Accent color preview</p>
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Default Text Color
            </label>
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="white"
            />
            <p className="text-xs text-slate-400 mt-2">Example: white, slate-100, gray-200</p>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Base Font Family</label>
            <input
              type="text"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial"
            />
            <p className="text-xs text-slate-400 mt-2">Example: Inter, 'Helvetica Neue', Arial</p>
          </div>

          {/* Base Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Base Font Size (px)</label>
            <input
              type="text"
              value={baseFontSize}
              onChange={(e) => setBaseFontSize(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
              placeholder="16px"
            />
            <p className="text-xs text-slate-400 mt-2">Set base font-size to apply across pages</p>
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
              'Save Settings'
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Tip:</strong> Changes to page appearance will automatically update across all pages in real-time.
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper function to convert Tailwind color names to hex (basic mapping)
function getColorFromTailwind(colorClass: string): string {
  const colorMap: Record<string, string> = {
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'purple-600': '#9333ea',
    'emerald-600': '#059669',
    'rose-600': '#e11d48',
    'slate-600': '#475569',
    'white': '#ffffff',
  }
  return colorMap[colorClass] || '#6b7280'
}
