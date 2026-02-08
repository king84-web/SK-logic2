'use client'

import { LogOut, LayoutDashboard, BookOpen, Settings, Images, Edit3 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Tab = 'overview' | 'bookings' | 'content' | 'gallery' | 'settings'

interface AdminSidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onLogout: () => void
}

export default function AdminSidebar({ activeTab, onTabChange, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'content', label: 'Content Editor', icon: Edit3 },
    { id: 'gallery', label: 'Gallery', icon: Images },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-slate-800 to-slate-900 border-r border-white/10 backdrop-blur-xl flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
          SK Logic
        </Link>
        <p className="text-xs text-slate-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <li key={item.id}>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600/20 border border-blue-500/50 text-blue-300'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </div>
  )
}
