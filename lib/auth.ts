// Authentication utilities (client-safe functions)

export function isValidAdminEmail(email: string): boolean {
  const adminEmails = ['admin@sklogic.com']
  return adminEmails.includes(email.toLowerCase())
}

export function validatePassword(password: string): boolean {
  // Use environment variable for admin password
  // Store ADMIN_PASSWORD in environment variables
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD environment variable not set')
    return false
  }
  return password === adminPassword
}

export function generateToken(): string {
  // Simple token generation for now
  if (typeof window === 'undefined') {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  return Math.random().toString(36).substring(2, 15)
}

export function validateAdminCredentials(email: string, password: string) {
  return isValidAdminEmail(email) && validatePassword(password)
}

