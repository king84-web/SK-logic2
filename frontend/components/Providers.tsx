'use client'

import { SessionProvider } from "next-auth/react"
import { AdminProvider } from "@/lib/admin-context"
import { ContentProvider } from "@/lib/content-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminProvider>
        <ContentProvider>
          {children}
        </ContentProvider>
      </AdminProvider>
    </SessionProvider>
  )
}
