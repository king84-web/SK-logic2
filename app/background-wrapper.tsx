'use client'

import { useEffect, useState } from 'react'
import { useContent } from '@/lib/content-context'

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useContent()
  const [bgClass, setBgClass] = useState('bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900')

  useEffect(() => {
    if (settings && settings.pageBackgroundGradient) {
      // Build the Tailwind class string
      const gradientClass = `bg-gradient-to-br ${settings.pageBackgroundGradient}`
      setBgClass(gradientClass)
      
      // Also apply to document element for full page coverage
      document.documentElement.className = `${document.documentElement.className} ${gradientClass}`.trim()
    }
  }, [settings])

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {children}
    </div>
  )
}
