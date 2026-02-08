import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/db/prisma'

/**
 * Payment Verification Endpoint
 * 
 * With WhatsApp-only payments, verification is manual.
 * Admin receives WhatsApp notification and manually confirms payment.
 * This endpoint updates the payment status when admin confirms.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tx_ref, bookingId, enrollmentId, status } = body

    // Validate request
    if (!tx_ref && !bookingId && !enrollmentId) {
      return NextResponse.json(
        { status: 'error', message: 'Missing transaction reference or booking ID' },
        { status: 400 }
      )
    }

    // status can be 'paid', 'pending', or 'failed'
    const paymentStatus = status || 'pending'

    // Update booking if bookingId provided
    if (bookingId) {
      const booking = await prisma.serviceBooking.findUnique({
        where: { id: bookingId },
      })

      if (!booking) {
        return NextResponse.json(
          { status: 'error', message: 'Booking not found' },
          { status: 404 }
        )
      }

      await prisma.serviceBooking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: paymentStatus,
          status: paymentStatus === 'paid' ? 'confirmed' : booking.status,
          updatedAt: new Date(),
        },
      })
    }

    // Update enrollment if enrollmentId provided
    if (enrollmentId) {
      const enrollment = await prisma.academyEnrollment.findUnique({
        where: { id: enrollmentId },
      })

      if (!enrollment) {
        return NextResponse.json(
          { status: 'error', message: 'Enrollment not found' },
          { status: 404 }
        )
      }

      await prisma.academyEnrollment.update({
        where: { id: enrollmentId },
        data: {
          paymentStatus: paymentStatus,
          status: paymentStatus === 'paid' ? 'enrolled' : enrollment.status,
          updatedAt: new Date(),
        },
      })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Payment status updated successfully',
      data: {
        tx_ref,
        paymentStatus,
      },
    })
  } catch (error: any) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to verify payment' },
      { status: 500 }
    )
  }
}

