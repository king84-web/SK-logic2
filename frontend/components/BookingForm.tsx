'use client'

import { useState } from 'react'
import { createWhatsAppBookingLink } from '@/backend/lib/whatsapp'

interface BookingFormProps {
  selectedService: string | null
}

export default function BookingForm({ selectedService }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: selectedService || '',
    date: '',
    message: '',
    amount: '',
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'whatsapp-pending'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          service: selectedService || formData.service,
          paymentMethod: 'whatsapp'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // If amount is entered, redirect to WhatsApp payment
        if (formData.amount) {
          await handleWhatsAppPayment(data.booking.id)
        } else {
          // Redirect to WhatsApp for quote
          await handleWhatsAppQuote()
        }
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppPayment = async (bookingId: string) => {
    try {
      setStatus('whatsapp-pending')
      
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          amount: parseFloat(formData.amount),
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          service: formData.service,
          description: `Payment for ${formData.service} service`,
          currency: 'RWF',
        }),
      })

      const data = await response.json()

      if (data.status === 'success') {
        // Redirect to WhatsApp for payment
        window.open(data.data.whatsappLink, '_blank')
        setStatus('success')
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          service: selectedService || '', 
          date: '', 
          message: '',
          amount: '',
        })
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Payment initialization error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleWhatsAppQuote = () => {
    const service = selectedService || formData.service
    if (!service) {
      alert('Please select a service first')
      return
    }
    const whatsappLink = createWhatsAppBookingLink(service, formData.name)
    window.open(whatsappLink, '_blank')
    setStatus('success')
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      service: selectedService || '', 
      date: '', 
      message: '',
      amount: '',
    })
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className="card sticky top-24">
      <h3 className="text-2xl font-bold mb-2">Quick Booking</h3>
      <p className="text-sm text-gray-400 mb-6">💬 All payments handled via WhatsApp</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Preferred Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Service Amount (Optional)</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Amount in RWF"
            />
            <span className="flex items-center px-3 bg-slate-700 border border-slate-600 rounded text-gray-400 font-semibold">
              RWF
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Leave empty for quote-based services</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Additional Notes</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="Tell us more about your needs..."
          />
        </div>

        {status === 'success' && (
          <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-2 rounded">
            ✓ Opening WhatsApp for payment confirmation...
          </div>
        )}

        {status === 'whatsapp-pending' && (
          <div className="bg-blue-900 border border-blue-700 text-blue-200 px-4 py-2 rounded">
            ⏳ Opening WhatsApp...
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-2 rounded">
            ✗ Error processing. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.356.18-3.685-.968.988 3.617-.235.374a9.86 9.86 0 001.378 4.646 9.84 9.84 0 007.338 3.855h.006c2.64 0 5.122-1.076 6.99-3.027a9.847 9.847 0 002.89-6.99c0-2.648-1.076-5.133-3.028-7.006A9.844 9.844 0 0012.051 2c-2.648 0-5.135 1.076-7.006 3.027a9.87 9.87 0 00-2.89 6.992M2 22h20v-2H2z"/>
          </svg>
          {loading ? 'Processing...' : formData.amount ? 'Pay via WhatsApp' : 'Get Quote via WhatsApp'}
        </button>
      </form>
    </div>
  )
}
