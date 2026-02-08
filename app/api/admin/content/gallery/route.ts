import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest) {
  try {
    const gallery = await prisma.galleryImage.findMany({
      where: { visible: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Gallery GET error:', error)
    const msg = String(error instanceof Error ? error.message : error)
    if (msg.includes('the URL must start with the protocol') || (error instanceof Error && 'name' in error && error.name === 'PrismaClientInitializationError')) {
      // Prisma not available — return empty gallery array so UI can continue
      return NextResponse.json([])
    }
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const image = await prisma.galleryImage.create({
      data: {
        src: body.src,
        alt: body.alt || 'Gallery image',
        title: body.title || 'Untitled',
        category: body.category || 'general',
      },
    })
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Gallery POST error:', error)
    return NextResponse.json({ error: 'Failed to add gallery image' }, { status: 500 })
  }
}
