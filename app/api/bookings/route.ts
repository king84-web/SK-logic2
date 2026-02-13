import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/lib/db/prisma'
import { sendBookingConfirmationEmail } from '@/backend/lib/email'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    const booking = await prisma.serviceBooking.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        message: body.message || null,
        date: body.date ? new Date(body.date) : null,
        status: 'pending',
      },
    })

    // Send confirmation emails
    const adminEmail = process.env.ADMIN_EMAIL || 'kamarasolomon164@gmail.com'
    const emailResult = await sendBookingConfirmationEmail({
      adminEmail,
      customerName: body.name,
      customerEmail: body.email,
      service: body.service,
      message: body.message,
      phone: body.phone,
    })

    console.log('Booking created:', booking)
    console.log('Email sent:', emailResult)

    return NextResponse.json(
      {
        message: 'Booking submitted successfully',
        id: booking.id,
        booking,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
