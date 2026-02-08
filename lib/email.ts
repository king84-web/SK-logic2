import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface BookingEmailProps {
  adminEmail: string
  customerName: string
  customerEmail: string
  service: string
  message?: string
  phone: string
}

interface ContactEmailProps {
  adminEmail: string
  customerName: string
  customerEmail: string
  subject: string
  message: string
}

interface EnrollmentEmailProps {
  adminEmail: string
  studentName: string
  studentEmail: string
  course: string
  phone: string
}

export async function sendBookingConfirmationEmail({
  adminEmail,
  customerName,
  customerEmail,
  service,
  message,
  phone,
}: BookingEmailProps) {
  try {
    const adminResponse = await resend.emails.send({
      from: 'SK Logic <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Service Booking: ${service}`,
      html: `
        <h2>New Service Booking</h2>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message || 'No additional message'}</p>
        <p><em>Timestamp: ${new Date().toLocaleString()}</em></p>
      `,
    })

    const customerResponse = await resend.emails.send({
      from: 'SK Logic <onboarding@resend.dev>',
      to: customerEmail,
      subject: 'Booking Confirmation - SK Logic',
      html: `
        <h2>Thank you for booking with SK Logic!</h2>
        <p>Hi ${customerName},</p>
        <p>We have received your booking request for <strong>${service}</strong>.</p>
        <p>Our team will review your request and contact you shortly at <strong>${phone}</strong>.</p>
        <p>In the meantime, you can reach us via WhatsApp for faster response.</p>
        <p>Best regards,<br>SK Logic Team</p>
      `,
    })

    return { adminResponse, customerResponse, success: true }
  } catch (error) {
    console.error('Error sending booking confirmation email:', error)
    return { success: false, error }
  }
}

export async function sendContactReplyEmail({
  adminEmail,
  customerName,
  customerEmail,
  subject,
  message,
}: ContactEmailProps) {
  try {
    const adminResponse = await resend.emails.send({
      from: 'SK Logic <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Contact Message: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><em>Timestamp: ${new Date().toLocaleString()}</em></p>
      `,
    })

    const customerResponse = await resend.emails.send({
      from: 'SK Logic <onboarding@resend.dev>',
      to: customerEmail,
      subject: `We received your message - ${subject}`,
      html: `
        <h2>Thank you for contacting SK Logic</h2>
        <p>Hi ${customerName},</p>
        <p>We have received your message regarding <strong>${subject}</strong>.</p>
        <p>Our team will get back to you as soon as possible. We typically respond within 24 hours.</p>
        <p>Best regards,<br>SK Logic Team</p>
      `,
    })

    return { adminResponse, customerResponse, success: true }
  } catch (error) {
    console.error('Error sending contact email:', error)
    return { success: false, error }
  }
}

export async function sendEnrollmentConfirmationEmail({
  adminEmail,
  studentName,
  studentEmail,
  course,
  phone,
}: EnrollmentEmailProps) {
  try {
    const adminResponse = await resend.emails.send({
      from: 'SK Logic <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New Academy Enrollment: ${course}`,
      html: `
        <h2>New Academy Enrollment</h2>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Email:</strong> ${studentEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><em>Timestamp: ${new Date().toLocaleString()}</em></p>
      `,
    })

    const studentResponse = await resend.emails.send({
      from: 'SK Logic <onboarding@resend.dev>',
      to: studentEmail,
      subject: `Welcome to SK Logic Academy - ${course}`,
      html: `
        <h2>Welcome to SK Logic Academy!</h2>
        <p>Hi ${studentName},</p>
        <p>Thank you for enrolling in our <strong>${course}</strong> course.</p>
        <p>We will send you the course details and access information shortly at <strong>${phone}</strong>.</p>
        <p>Our instructors are excited to work with you!</p>
        <p>Best regards,<br>SK Logic Academy Team</p>
      `,
    })

    return { adminResponse, studentResponse, success: true }
  } catch (error) {
    console.error('Error sending enrollment email:', error)
    return { success: false, error }
  }
}
