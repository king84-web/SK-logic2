import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest) {
  try {
    const hero = await prisma.heroContent.findFirst()
    if (!hero) {
      return NextResponse.json({
        id: 'default',
        title: 'SK Logic',
        subtitle: 'Think Logically, Build Digital.',
        mainImage: '/images/hero-main.png',
      })
    }
    return NextResponse.json(hero)
  } catch (error) {
    // If Prisma isn't available (e.g. missing/invalid DATABASE_URL), return a safe default
    const msg = String(error instanceof Error ? error.message : error)
    if (msg.includes('the URL must start with the protocol') || (error instanceof Error && 'name' in error && error.name === 'PrismaClientInitializationError')) {
      return NextResponse.json({
        id: 'default',
        title: 'SK Logic',
        subtitle: 'Think Logically, Build Digital.',
        mainImage: '/images/hero-main.png',
      })
    }
      console.error('Hero GET error:', error)
      // Return a safe default so the frontend and admin remain usable
      return NextResponse.json({
        id: 'default',
        title: 'Think Logically, Build Digital.',
        subtitle: 'We build fast, beautiful, and reliable digital products.',
        mainImage: '/images/hero-main.png',
      })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get existing hero or create new one
    let hero = await prisma.heroContent.findFirst()
    
    if (hero) {
      hero = await prisma.heroContent.update({
        where: { id: hero.id },
        data: {
          title: body.title || hero.title,
          subtitle: body.subtitle || hero.subtitle,
          mainImage: body.mainImage || hero.mainImage,
        },
      })
    } else {
      hero = await prisma.heroContent.create({
        data: {
          title: body.title || 'SK Logic',
          subtitle: body.subtitle || 'Think Logically, Build Digital.',
          mainImage: body.mainImage || '/images/hero-main.png',
        },
      })
    }
    
    return NextResponse.json({ success: true, hero })
  } catch (error) {
    console.error('Hero API error:', error)
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 })
  }
}
