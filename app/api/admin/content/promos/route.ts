import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Load promos from database
    return NextResponse.json([])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // TODO: Persist promo to database
    return NextResponse.json({ success: true, id: Math.random().toString(), ...body })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save promo' }, { status: 500 })
  }
}
