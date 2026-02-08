'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface Stats {
  totalBookings: number
  paidBookings: number
  pendingBookings: number
  siteVisits: number
}

export default function AdminStatsOverview() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    paidBookings: 0,
    pendingBookings: 0,
    siteVisits: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Paid Bookings',
      value: stats.paidBookings,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Pending Payment',
      value: stats.pendingBookings,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Site Visits',
      value: stats.siteVisits,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`backdrop-blur-xl ${card.bgColor} border border-white/10 rounded-2xl p-6 hover:border-white/20 transition`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${card.color} rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-2">{card.label}</p>
            <p className="text-4xl font-bold text-white">{card.value}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
