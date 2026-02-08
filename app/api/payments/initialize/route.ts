import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/db/prisma'

// CORS middleware
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',')
  const isAllowed = origin && allowedOrigins.some(o => o.trim() === origin)

  if (isAllowed) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  return new NextResponse(null, { status: 403 })
}

interface PaymentInitRequest {
  bookingId?: string
  enrollmentId?: string
  amount: number
  email: string
  phone: string
  name: string
  description: string
  service: string
  currency?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentInitRequest = await request.json()

    // Validate required fields
    if (!body.amount || !body.email || !body.phone || !body.name || !body.description) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { status: 400 }
      )
    }

    // Generate unique transaction reference
    const txRef = `SK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Update booking or enrollment with WhatsApp payment method
    if (body.bookingId) {
      await prisma.serviceBooking.update({
        where: { id: body.bookingId },
        data: {
          amount: body.amount,
          currency: body.currency || 'RWF',
          paymentId: txRef,
          paymentMethod: 'whatsapp',
          paymentStatus: 'pending', // Payment pending via WhatsApp
        },
      })
    } else if (body.enrollmentId) {
      await prisma.academyEnrollment.update({
        where: { id: body.enrollmentId },
        data: {
          amount: body.amount,
          currency: body.currency || 'RWF',
          paymentId: txRef,
          paymentMethod: 'whatsapp',
          paymentStatus: 'pending', // Payment pending via WhatsApp
        },
      })
    }

    // Generate WhatsApp payment message
    const paymentMessage = `Hi SK Logic, I want to pay for ${body.description}. 
Customer: ${body.name}
Email: ${body.email}
Phone: ${body.phone}
Amount: ${body.amount} ${body.currency || 'RWF'}
Transaction Ref: ${txRef}

Please confirm receipt and payment instructions.`

    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '25072405593'}?text=${encodeURIComponent(paymentMessage)}`

    return NextResponse.json({
      status: 'success',
      message: 'Payment request created. Please complete payment via WhatsApp.',
      data: {
        whatsappLink,
        tx_ref: txRef,
        paymentMethod: 'whatsapp',
      },
    })
  } catch (error: any) {
    console.error('Payment initialization error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to initialize payment' },
      { status: 500 }
    )
  }
}

