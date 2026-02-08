import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest) {
  try {
    let settings = await prisma.pageSettings.findFirst()
    
    if (!settings) {
      settings = await prisma.pageSettings.create({
        data: {
          pageBackgroundColor: 'from-slate-950 to-slate-900',
          pageBackgroundGradient: 'from-slate-950 via-slate-900 to-slate-900',
          accentColor: 'blue-600',
          textColor: 'white',
          fontFamily: 'system-ui, -apple-system, Roboto, "Helvetica Neue", Arial',
          baseFontSize: '16px',
        },
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Settings GET error:', error)
    const msg = String(error instanceof Error ? error.message : error)
    if (msg.includes('the URL must start with the protocol') || (error instanceof Error && 'name' in error && error.name === 'PrismaClientInitializationError')) {
      // return default settings so the frontend can render safely
      return NextResponse.json({
        pageBackgroundColor: 'from-slate-950 to-slate-900',
        pageBackgroundGradient: 'from-slate-950 via-slate-900 to-slate-900',
        accentColor: 'blue-600',
        textColor: 'white',
        fontFamily: 'system-ui, -apple-system, Roboto, "Helvetica Neue", Arial',
        baseFontSize: '16px',
      })
    }
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    let settings = await prisma.pageSettings.findFirst()
    
    if (settings) {
      settings = await prisma.pageSettings.update({
        where: { id: settings.id },
        data: {
          pageBackgroundColor: body.pageBackgroundColor || settings.pageBackgroundColor,
          pageBackgroundGradient: body.pageBackgroundGradient || settings.pageBackgroundGradient,
          accentColor: body.accentColor || settings.accentColor,
          textColor: body.textColor || settings.textColor,
          fontFamily: body.fontFamily || settings.fontFamily,
          baseFontSize: body.baseFontSize || settings.baseFontSize,
        },
      })
    } else {
      settings = await prisma.pageSettings.create({
        data: {
          pageBackgroundColor: body.pageBackgroundColor || 'from-slate-950 to-slate-900',
          pageBackgroundGradient: body.pageBackgroundGradient || 'from-slate-950 via-slate-900 to-slate-900',
          accentColor: body.accentColor || 'blue-600',
          textColor: body.textColor || 'white',
          fontFamily: body.fontFamily || 'system-ui, -apple-system, Roboto, "Helvetica Neue", Arial',
          baseFontSize: body.baseFontSize || '16px',
        },
      })
    }
    
    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Settings POST error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
