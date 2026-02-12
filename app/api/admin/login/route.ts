import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Now validateAdminCredentials is async
    const isValid = await validateAdminCredentials(email, password)
    
    if (isValid) {
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')
      return NextResponse.json(
        { success: true, message: 'Login successful', token },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
