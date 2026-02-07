// Authentication utilities (client-safe functions)

export function isValidAdminEmail(email: string): boolean {
  const adminEmails = ['admin@sklogic.com', 'admin@localhost', 'kamarasolomon164@gmail.com']
  return adminEmails.includes(email.toLowerCase())
}

export function validatePassword(password: string): boolean {
  // For now, use simple password validation
  // In production, use bcrypt or similar
  return password === 'admin123' // Change to secure password in production
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

