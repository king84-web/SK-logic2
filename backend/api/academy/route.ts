import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendEnrollmentConfirmationEmail } from '@/lib/email'

// CORS middleware
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']

  if (allowedOrigins.includes(origin) || origin === '') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
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
    if (!body.name || !body.email || !body.phone || !body.course) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    const enrollment = await prisma.academyEnrollment.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        course: body.course,
      },
    })

    // Send confirmation emails
    const adminEmail = process.env.ADMIN_EMAIL || 'kamarasolomon164@gmail.com'
    const emailResult = await sendEnrollmentConfirmationEmail({
      adminEmail,
      studentName: body.name,
      studentEmail: body.email,
      course: body.course,
      phone: body.phone,
    })

    console.log('Enrollment created:', enrollment)
    console.log('Email sent:', emailResult)

    return NextResponse.json(
      {
        message: 'Enrollment successful',
        id: enrollment.id,
        enrollment,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing enrollment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
