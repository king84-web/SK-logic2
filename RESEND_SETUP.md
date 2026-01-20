# Email Setup Guide (Resend)

## Overview
This guide walks you through setting up Resend for automated email notifications in SK Logic.

## What is Resend?
Resend is a modern email API service that makes it easy to send transactional emails from your application. It's perfect for booking confirmations, notifications, and alerts.

## Step 1: Create a Resend Account

1. **Go to https://resend.com**
2. **Click "Sign Up"**
3. **Enter your email and create a password**
4. **Verify your email address**

## Step 2: Create a Resend Project

1. **After signing in, go to Dashboard**
2. **Click "Create New Project"**
3. **Enter project name:** `SK Logic`
4. **Click "Create"**

## Step 3: Get Your API Key

1. **In the project dashboard, go to "API Keys"**
2. **Click "Create API Key"**
3. **Copy the key (starts with `re_`)**
4. **Save this key - you'll need it in Vercel environment variables**

⚠️ **Keep this API key secret! Don't commit it to your repository.**

## Step 4: Verify Your Domain (Optional but Recommended)

For production, Resend recommends verifying your domain to improve deliverability.

1. **In Resend Dashboard, go to "Domains"**
2. **Click "Add Domain"**
3. **Enter your domain** (e.g., `sk-logic.com`)
4. **Add the DNS records** provided by Resend to your domain registrar
5. **Wait for DNS verification** (can take up to 24 hours)

For now, you can use the default `no-reply@resend.dev` sender.

## Step 5: Add API Key to Vercel

1. **Go to your Vercel project settings**
2. **Go to Environment Variables**
3. **Add variable:**
   ```
   RESEND_API_KEY=your_api_key_here
   ```
4. **Apply to all environments** (Production, Preview, Development)
5. **Save**
6. **Redeploy your project**

## Step 6: Test Email Functionality

### Local Testing
1. **Create `.env.local` file:**
   ```bash
   DATABASE_URL=postgresql://...
   RESEND_API_KEY=your_resend_api_key
   ADMIN_EMAIL=kamarasolomon164@gmail.com
   NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Test booking form:**
   - Go to http://localhost:3000/booking
   - Fill out the form
   - Click "Submit Booking"
   - Check your email for confirmation

### Production Testing
1. **Submit a test booking** on your live Vercel site
2. **Check your inbox** (and spam folder)
3. **Admin should receive notification email**

## Email Templates

The following emails are sent automatically:

### 1. Service Booking Confirmation
- **Sent to:** Customer and Admin
- **Trigger:** User submits booking form
- **Contains:** Service details, booking confirmation, contact info

### 2. Contact Message Notification
- **Sent to:** Customer and Admin
- **Trigger:** User submits contact form
- **Contains:** Message details, confirmation, response timeframe

### 3. Academy Enrollment Confirmation
- **Sent to:** Student and Admin
- **Trigger:** Student enrolls in course
- **Contains:** Course details, enrollment confirmation, next steps

## Customizing Email Templates

To customize email templates, edit [lib/email.ts](lib/email.ts):

```typescript
export async function sendBookingConfirmationEmail({
  adminEmail,
  customerName,
  customerEmail,
  service,
  message,
  phone,
}: BookingEmailProps) {
  // Customize HTML template here
  const html = `
    <h2>Custom email HTML</h2>
    <p>Service: ${service}</p>
  `
  
  // Send using Resend
}
```

## Email Branding

To add your logo and branding:

1. **Update the from address:**
   ```typescript
   from: 'SK Logic <support@sk-logic.com>'
   ```
   (Requires verified domain)

2. **Add your logo to emails:**
   ```html
   <img src="https://your-domain.com/logo.png" alt="SK Logic" />
   ```

3. **Add colors and styling:**
   ```html
   <style>
     .container { background-color: #1a1a1a; }
     .header { color: #2563eb; }
   </style>
   ```

## Monitoring Email Sends

1. **Go to Resend Dashboard**
2. **Click "Activity"** to see all sent emails
3. **Monitor:**
   - Delivery status
   - Open rates
   - Click rates
   - Bounces and failures

## Troubleshooting

### Email Not Sending
- Check `RESEND_API_KEY` is correct in environment variables
- Verify API key is set to all environments in Vercel
- Check function logs in Vercel: Monitoring → Functions
- Test API key validity in Resend dashboard

### Email Going to Spam
- Verify your domain with Resend (improves reputation)
- Use professional sender name and address
- Avoid spam trigger words in subject
- Include unsubscribe link (for marketing emails)

### API Key Error
- Regenerate API key in Resend dashboard
- Update in Vercel environment variables
- Redeploy your application

### Rate Limiting
- Free plan: Limited emails per month
- Upgrade plan if needed
- Resend will notify you of limits

## Email Best Practices

1. **Always include:**
   - Professional signature
   - Contact information
   - Clear call-to-action
   - Unsubscribe option (if required)

2. **Use clear subject lines:**
   - "Booking Confirmation - SK Logic"
   - "Course Enrollment Confirmed"
   - "We Received Your Message"

3. **Personalize emails:**
   - Use customer name
   - Reference their specific service/course
   - Make emails relevant and helpful

4. **Monitor deliverability:**
   - Check bounce rates
   - Monitor spam complaints
   - Update email templates based on feedback

## Cost

- **Free plan:** Up to 100 emails/day
- **Pro plan:** $20/month for unlimited emails
- **Enterprise:** Custom pricing

For a growing business, the Pro plan is recommended.

## Additional Resources

- **Resend Docs:** https://resend.com/docs
- **Email Best Practices:** https://resend.com/blog
- **API Reference:** https://resend.com/docs/api-reference/emails/send
