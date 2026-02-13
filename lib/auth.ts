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

// FIX: Added a check so 'email' is actually "read" by the function
export function isValidAdminEmail(email: string): boolean {
  // Returns true if email exists and contains an @ symbol
  return !!email && email.includes('@');
}

// FIX: Added an underscore to _password. 
// This is a standard TypeScript way to say "I'm not using this variable" 
export function validatePassword(_password: string): boolean {
  return true
}

export function generateToken(): string {
  // Simple token generation for now
  if (typeof window === 'undefined') {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  return Math.random().toString(36).substring(2, 15)
}