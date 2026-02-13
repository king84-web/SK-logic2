'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Check, X, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  service: string
  paymentStatus: string
  status: string
  createdAt: string
  amount?: number
  currency?: string
}

interface PaymentForm {
  paymentStatus: 'paid' | 'unpaid' | 'failed'
}

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<PaymentForm>()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: PaymentForm) => {
    if (!selectedBookingId) return

    try {
      const response = await fetch(`/api/admin/bookings/${selectedBookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: data.paymentStatus }),
      })

      if (response.ok) {
        setSelectedBookingId(null)
        reset()
        router.refresh()
        await fetchBookings()
      }
    } catch (error) {
      console.error('Error updating payment status:', error)
    }
  }

  const toggleRowExpansion = (bookingId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(bookingId)) {
        newSet.delete(bookingId)
      } else {
        newSet.add(bookingId)
      }
      return newSet
    })
  }

  const handleApproveBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      })

      if (response.ok) {
        router.refresh()
        await fetchBookings()
      } else {
        console.error('Error approving booking')
        alert('Failed to approve booking')
      }
    } catch (error) {
      console.error('Error approving booking:', error)
      alert('Failed to approve booking')
    }
  }

  if (loading) {
    return (
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Booking Management</h2>
        <p className="text-slate-400 text-sm">Manage service bookings and verify payments</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">No bookings found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left font-semibold text-slate-300">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-300">Service</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-300">Payment</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-300">Booking Status</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-center font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{booking.name}</p>
                      <p className="text-xs text-slate-400">{booking.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{booking.service}</td>
                  <td className="px-6 py-4">
                    <div className="text-slate-300">
                      {booking.amount ? `${booking.currency || 'RWF'} ${booking.amount.toLocaleString()}` : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <PaymentStatusBadge status={booking.paymentStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {booking.status !== 'approved' && (
                        <button
                          onClick={() => handleApproveBooking(booking.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 transition"
                          title="Approve booking"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => toggleRowExpansion(booking.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition"
                      >
                        {expandedRows.has(booking.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Verification Modal */}
      {selectedBookingId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBookingId(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 border border-white/10 rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-6">Verify Payment</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Payment Status</label>
                <select
                  {...register('paymentStatus')}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedBookingId(null)}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
                >
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function PaymentStatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon: any }> = {
    paid: {
      bg: 'bg-green-500/20',
      text: 'text-green-300',
      icon: Check,
    },
    unpaid: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-300',
      icon: Clock,
    },
    failed: {
      bg: 'bg-red-500/20',
      text: 'text-red-300',
      icon: X,
    },
  }

  const Icon = config[status]?.icon || X
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${config[status]?.bg} ${config[status]?.text}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-medium capitalize">{status}</span>
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon: any }> = {
    pending: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-300',
      icon: Clock,
    },
    approved: {
      bg: 'bg-green-500/20',
      text: 'text-green-300',
      icon: Check,
    },
    completed: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-300',
      icon: Check,
    },
    cancelled: {
      bg: 'bg-red-500/20',
      text: 'text-red-300',
      icon: X,
    },
  }

  const Icon = config[status]?.icon || Clock
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${config[status]?.bg} ${config[status]?.text}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-medium capitalize">{status}</span>
    </span>
  )
}

import { Clock } from 'lucide-react'
