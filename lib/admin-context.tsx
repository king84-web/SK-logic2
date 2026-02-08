'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AdminSession {
  token: string
  email?: string
  isAuthenticated: boolean
}

interface AdminContextType {
  session: AdminSession | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Small delay to ensure we're on client and localStorage is available
    const initializeAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('admin-token')
          if (token) {
            setSession({ token, isAuthenticated: true })
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const newSession = { token: data.token || 'authenticated', email, isAuthenticated: true }
        localStorage.setItem('admin-token', newSession.token)
        setSession(newSession)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('admin-token')
    setSession(null)
    router.push('/')
  }

  return (
    <AdminContext.Provider
      value={{
        session,
        isLoading,
        login,
        logout,
        isAuthenticated: session?.isAuthenticated ?? false,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
