import { NextResponse } from 'next/server'
import { prisma } from '@/backend/lib/db/prisma'

export async function GET() {
  try {
    // Check if prisma instance is properly initialized
    if (!prisma || !prisma.serviceBooking) {
      // Return safe defaults if database is unavailable
      return NextResponse.json({
        totalBookings: 0,
        paidBookings: 0,
        pendingBookings: 0,
        siteVisits: 0,
      })
    }

    const totalBookings = await prisma.serviceBooking.count()
    const paidBookings = await prisma.serviceBooking.count({
      where: { paymentStatus: 'paid' }
    })
    const pendingBookings = await prisma.serviceBooking.count({
      where: { paymentStatus: 'unpaid' }
    })

    return NextResponse.json({
      totalBookings,
      paidBookings,
      pendingBookings,
      siteVisits: Math.floor(Math.random() * 10000), // Placeholder
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Return safe defaults if database is unavailable (e.g., during build or DB downtime)
    return NextResponse.json({
      totalBookings: 0,
      paidBookings: 0,
      pendingBookings: 0,
      siteVisits: 0,
    })
  }
}
