'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/frontend/components/AdminSidebar'
import AdminStatsOverview from '@/frontend/components/AdminStatsOverview'
import BookingManagement from '@/frontend/components/BookingManagement'
import ContentEditor from '@/frontend/components/ContentEditor'
import GallerySection from '@/frontend/components/GallerySection'
import SettingsPanel from '@/frontend/components/SettingsPanel'
import { motion } from 'framer-motion'

type Tab = 'overview' | 'bookings' | 'content' | 'gallery' | 'settings'

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    } else if (!isLoading) {
      setIsReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  // While loading or checking auth
  if (isLoading || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-blue-500 border-b-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-hidden">
        <div className="h-screen overflow-auto">
          <div className="p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-slate-400">Welcome to SK Logic Admin Panel</p>
            </motion.div>

            {/* Content based on active tab */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <AdminStatsOverview />}
              {activeTab === 'bookings' && <BookingManagement />}
              {activeTab === 'content' && <ContentEditor />}
              {activeTab === 'gallery' && <GallerySection />}
              {activeTab === 'settings' && <SettingsPanel />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
