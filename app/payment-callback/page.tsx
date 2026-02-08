'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

function PaymentCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const txRef = searchParams.get('tx_ref')
        const transactionId = searchParams.get('transaction_id')

        if (!txRef && !transactionId) {
          setStatus('error')
          setMessage('Missing payment reference')
          return
        }

        // Get transaction details
        const response = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tx_ref: txRef,
            transaction_id: transactionId,
          }),
        })

        const data = await response.json()

        if (data.status === 'success') {
          setStatus('success')
          setMessage('Payment successful! Your booking/enrollment has been confirmed.')
        } else {
          setStatus('failed')
          setMessage(data.message || 'Payment verification failed')
        }
      } catch (error) {
        console.error('Payment verification error:', error)
        setStatus('error')
        setMessage('Error verifying payment')
      }
    }

    verifyPayment()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-dark pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-slate-800 rounded-lg p-8 border border-slate-700">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-white">Verifying your payment...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h1 className="text-2xl font-bold text-green-400 mb-4">Payment Successful!</h1>
              <p className="text-gray-300 mb-6">{message}</p>
              <p className="text-sm text-gray-400 mb-6">
                A confirmation email has been sent to your email address.
              </p>
              <Link href="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                Back to Home
              </Link>
            </div>
          )}

          {status === 'failed' && (
            <div className="text-center">
              <div className="text-5xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-red-400 mb-4">Payment Failed</h1>
              <p className="text-gray-300 mb-6">{message}</p>
              <p className="text-sm text-gray-400 mb-6">
                Please try again or contact support if you need assistance.
              </p>
              <div className="flex gap-4">
                <Link href="/booking" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex-1">
                  Try Again
                </Link>
                <Link href="/" className="inline-block px-6 py-3 border border-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition flex-1">
                  Home
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-yellow-400 mb-4">Error</h1>
              <p className="text-gray-300 mb-6">{message}</p>
              <p className="text-sm text-gray-400 mb-6">
                Something went wrong. Please contact support.
              </p>
              <Link href="/contact" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                Contact Support
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PaymentCallback() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark pt-32 pb-12 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <PaymentCallbackContent />
    </Suspense>
  )
}
