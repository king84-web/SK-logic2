import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/lib/db/prisma'

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params
    const body = await request.json()

    // Update booking with status and/or paymentStatus
    const updateData: any = {}
    if (body.status) {
      updateData.status = body.status
    }
    if (body.paymentStatus) {
      updateData.paymentStatus = body.paymentStatus
    }

    const updatedBooking = await prisma.serviceBooking.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: updatedBooking })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
