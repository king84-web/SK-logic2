/**
 * WhatsApp Integration Utilities
 * Generates WhatsApp links with pre-filled messages
 */

export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

export function generateServiceBookingMessage(serviceName: string): string {
  return `Hi SK Logic, I am interested in ${serviceName}. Please provide more details and pricing.`
}

export function generateAcademyCourseMessage(courseName: string): string {
  return `Hi SK Logic, I would like to enroll in the ${courseName} course. Please send me more information.`
}

export function generateGeneralInquiryMessage(): string {
  return `Hi SK Logic, I would like to know more about your services. Please contact me.`
}

export const WHATSAPP_BUSINESS_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '25072405593'

/**
 * Create a complete WhatsApp booking link
 */
export function createWhatsAppBookingLink(serviceName: string): string {
  const message = generateServiceBookingMessage(serviceName)
  return generateWhatsAppLink(WHATSAPP_BUSINESS_NUMBER, message)
}

/**
 * Create a complete WhatsApp enrollment link
 */
export function createWhatsAppEnrollmentLink(courseName: string): string {
  const message = generateAcademyCourseMessage(courseName)
  return generateWhatsAppLink(WHATSAPP_BUSINESS_NUMBER, message)
}
