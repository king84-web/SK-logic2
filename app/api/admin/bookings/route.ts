import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const bookings = await prisma.serviceBooking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params
    const body = await request.json()

    const updatedBooking = await prisma.serviceBooking.update({
      where: { id },
      data: {
        paymentStatus: body.paymentStatus,
      },
    })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
