'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface HeroSettings {
  id?: string
  title: string
  subtitle: string
  mainImage: string
}

export interface PageSettings {
  id?: string
  pageBackgroundColor: string
  pageBackgroundGradient: string
  accentColor: string
  textColor: string
  fontFamily?: string
  baseFontSize?: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  category?: string
}

interface ContentContextType {
  hero: HeroSettings
  settings: PageSettings
  gallery: GalleryItem[]
  isLoading: boolean
  updateHero: (data: Partial<HeroSettings>) => Promise<void>
  updateSettings: (data: Partial<PageSettings>) => Promise<void>
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>
  removeGalleryItem: (id: string) => Promise<void>
  updateGallery: (items: GalleryItem[]) => void
  refreshContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

const defaultHero: HeroSettings = {
  title: 'SK Logic',
  subtitle: 'Think Logically, Build Digital.',
  mainImage: '/images/home-hero-image.jpg',
}

const defaultSettings: PageSettings = {
  pageBackgroundColor: 'from-slate-950 to-slate-900',
  pageBackgroundGradient: 'from-slate-950 via-slate-900 to-slate-900',
  accentColor: 'blue-600',
  textColor: 'white',
  fontFamily: 'system-ui, -apple-system, Roboto, "Helvetica Neue", Arial',
  baseFontSize: '16px',
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<HeroSettings>(defaultHero)
  const [settings, setSettings] = useState<PageSettings>(defaultSettings)
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshContent = useCallback(async () => {
    try {
      setIsLoading(true)

      // Always attempt to fetch; APIs handle auth internally
      const [heroRes, settingsRes, galleryRes] = await Promise.all([
        fetch('/api/admin/content/hero'),
        fetch('/api/admin/settings'),
        fetch('/api/admin/content/gallery'),
      ])

      // Process hero data
      if (heroRes.ok) {
        const heroData = await heroRes.json()
        if (heroData && typeof heroData === 'object') {
          setHero(heroData)
        }
      }
      
      // Process settings data
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json()
        if (settingsData && typeof settingsData === 'object') {
          setSettings(prev => ({ ...prev, ...settingsData }))
        }
      }
      
      // Process gallery data
      if (galleryRes.ok) {
        const galleryData = await galleryRes.json()
        if (Array.isArray(galleryData)) {
          setGallery(galleryData)
        }
      }
    } catch (error) {
      console.error('Error refreshing content:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Immediate refresh on mount
    refreshContent()
    // Refresh every 10 seconds when authenticated
    const interval = setInterval(refreshContent, 10000)
    return () => clearInterval(interval)
  }, [refreshContent])

  const updateHero = async (data: Partial<HeroSettings>) => {
    try {
      const response = await fetch('/api/admin/content/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const result = await response.json()
        setHero(result.hero)
        // Trigger refresh across all listeners
        window.dispatchEvent(new Event('content-updated'))
      }
    } catch (error) {
      console.error('Error updating hero:', error)
      throw error
    }
  }

  const updateSettings = async (data: Partial<PageSettings>) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const result = await response.json()
        setSettings(result.settings)
        // Trigger refresh across all listeners
        window.dispatchEvent(new Event('content-updated'))
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
    }
  }

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    try {
      const response = await fetch('/api/admin/content/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      if (response.ok) {
        const newItem = await response.json()
        setGallery(prev => [newItem, ...prev])
        window.dispatchEvent(new Event('content-updated'))
      }
    } catch (error) {
      console.error('Error adding gallery item:', error)
      throw error
    }
  }

  const removeGalleryItem = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/content/gallery/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setGallery(prev => prev.filter(item => item.id !== id))
        window.dispatchEvent(new Event('content-updated'))
      }
    } catch (error) {
      console.error('Error removing gallery item:', error)
      throw error
    }
  }

  const updateGallery = (items: GalleryItem[]) => {
    setGallery(items)
    window.dispatchEvent(new Event('content-updated'))
  }

  return (
    <ContentContext.Provider
      value={{
        hero,
        settings,
        gallery,
        isLoading,
        updateHero,
        updateSettings,
        addGalleryItem,
        removeGalleryItem,
        updateGallery,
        refreshContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error('useContent must be used within ContentProvider')
  }
  return context
}
