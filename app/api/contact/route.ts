import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/lib/db/prisma'
import { sendContactReplyEmail } from '@/backend/lib/email'

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
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      },
    })

    // Send confirmation emails
    const adminEmail = process.env.ADMIN_EMAIL || 'kamarasolomon164@gmail.com'
    const emailResult = await sendContactReplyEmail({
      adminEmail,
      customerName: body.name,
      customerEmail: body.email,
      subject: body.subject,
      message: body.message,
    })

    console.log('Contact message saved:', contactMessage)
    console.log('Email sent:', emailResult)

    return NextResponse.json(
      { 
        message: 'Message received successfully',
        id: contactMessage.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
