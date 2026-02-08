import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json()
    // TODO: Save academy content to database
    return NextResponse.json({ success: true, ...body })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save academy content' }, { status: 500 })
  }
}
