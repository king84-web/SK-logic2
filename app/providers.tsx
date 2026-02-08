'use client'

import { ReactNode } from 'react'
import { ContentProvider } from '@/lib/content-context'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ContentProvider>
      {children}
    </ContentProvider>
  )
}
