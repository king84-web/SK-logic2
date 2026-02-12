import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

// Validate admin credentials against the User table
export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })
    if (!user) {
      return false
    }
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password)
    return passwordMatch
  } catch (error) {
    console.error('Error validating credentials:', error)
    return false
  }
}

// Remove any reliance on process.env.ADMIN_PASSWORD

export function isValidAdminEmail(email: string): boolean {
  // Optionally, you can check if the email exists in AdminSettings, but for now, always return true
  return true
}

export function validatePassword(password: string): boolean {
  // Password validation is handled by validateAdminCredentials
  return true
}

export function generateToken(): string {
  // Simple token generation for now
  if (typeof window === 'undefined') {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  return Math.random().toString(36).substring(2, 15)
}

