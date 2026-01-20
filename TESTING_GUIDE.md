# Quality Assurance & Testing Guide

## Overview
This guide walks you through testing the complete SK Logic booking flow to ensure everything works correctly.

## Test Environment Setup

### Prerequisites
- Node.js installed
- PostgreSQL database running (local or Railway)
- `.env.local` file configured with all variables
- Resend API key obtained

### Local Environment Variables
Create `.env.local` file:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sk_logic

# Email
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=kamarasolomon164@gmail.com

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Node
NODE_ENV=development
```

## Test 1: Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Push Prisma schema to local database
npx prisma db push

# 3. Start development server
npm run dev

# 4. Open Prisma Studio (optional - to view database)
npx prisma studio
```

✅ **Expected Result:** 
- Site runs at http://localhost:3000
- No errors in console
- Database connection successful

## Test 2: Service Booking Form

### Steps
1. Navigate to http://localhost:3000/booking
2. Fill out the booking form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+25072405593"
   - Service: Select any service
   - Date: Pick any future date
   - Message: "Test booking"
3. Click "Submit Booking"

### Verification Checklist
- [ ] Form submission successful (success message appears)
- [ ] No console errors
- [ ] Database record created
  - Check with: `npx prisma studio`
  - Go to ServiceBooking model
  - Should show your test record
- [ ] Confirmation email received
  - Check your inbox
  - Should have subject: "Booking Confirmation - SK Logic"
- [ ] Admin email received
  - Check admin email (kamarasolomon164@gmail.com)
  - Should have subject: "New Service Booking: [Service Name]"

### WhatsApp Test
1. On booking page, click "Chat on WhatsApp" button
2. Should open WhatsApp with pre-filled message
3. Message format: "Hi SK Logic, I am interested in [Service Name]."

## Test 3: Contact Form

### Steps
1. Navigate to http://localhost:3000/contact
2. Fill out contact form:
   - Name: "Test Contact"
   - Email: "contact@example.com"
   - Subject: "Test Subject"
   - Message: "This is a test message"
3. Click "Send us a Message"

### Verification Checklist
- [ ] Form submission successful
- [ ] No console errors
- [ ] Database record created
  - Check ContactMessage model in Prisma Studio
- [ ] Customer receives confirmation email
- [ ] Admin receives notification email

## Test 4: Academy Enrollment

### Steps
1. Navigate to http://localhost:3000/academy
2. Select a course
3. Fill out enrollment form:
   - Name: "Test Student"
   - Email: "student@example.com"
   - Phone: "+25072405593"
   - Course: Select any course
4. Click "Enroll Now"

### Verification Checklist
- [ ] Enrollment successful
- [ ] Database record created
  - Check AcademyEnrollment model in Prisma Studio
- [ ] Student receives welcome email
- [ ] Admin receives enrollment notification

## Test 5: Database Integrity

```bash
# Check all records created
npx prisma studio
```

Verify in each model:
1. **ServiceBooking**
   - [ ] Test booking record exists
   - [ ] All fields populated correctly
   - [ ] Timestamp is recent

2. **ContactMessage**
   - [ ] Test message record exists
   - [ ] Status is "new"

3. **AcademyEnrollment**
   - [ ] Test enrollment record exists
   - [ ] Status is "enrolled"

## Test 6: Error Handling

### Test Invalid Form Data
1. Try submitting booking form with missing fields
2. Should show error: "Missing required fields"
3. Database should NOT save incomplete record

### Test Network Error
1. Disconnect internet while filling form
2. Submit form
3. Should show error message gracefully
4. No console crashes

### Test Duplicate Email
1. Submit booking with same email twice
2. Both should be saved (we allow duplicates)
3. Database should show 2 separate records

## Test 7: Email Template Verification

Check received emails for:

### Booking Confirmation Email
- [ ] Professional formatting
- [ ] Customer name personalized
- [ ] Service name correct
- [ ] Phone number displayed
- [ ] SK Logic branding

### Contact Confirmation Email
- [ ] Subject includes customer's subject line
- [ ] Message content quoted
- [ ] Response time expectation set

### Enrollment Email
- [ ] Course name correct
- [ ] Welcome tone appropriate
- [ ] Next steps clear

## Test 8: Production Deployment Test

### Before Deploying to Vercel

1. **Build locally:**
   ```bash
   npm run build
   ```
   Should complete without errors

2. **Test production build:**
   ```bash
   npm run start
   ```
   Should run successfully

3. **Check for environment variable warnings:**
   - No missing variables
   - All critical vars set

### After Deploying to Vercel

1. **Test booking flow on live site:**
   - Go to https://sk-logic.vercel.app
   - Submit test booking
   - Verify email received

2. **Check Vercel logs:**
   - Go to Deployments
   - Click on deployment
   - Check build logs for errors

3. **Monitor Vercel Analytics:**
   - Go to Monitoring tab
   - Check for errors
   - Verify performance metrics

## Test 9: CORS Testing

Test that API accepts requests from correct origins:

```javascript
// Test from browser console
fetch('https://sk-logic.vercel.app/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    phone: '+25072405593',
    service: 'Web Development'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

Should return 201 with booking data, not CORS error.

## Test 10: Performance Testing

### Page Load Times
```bash
# Lighthouse audit
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Run audit for each page:
```

Checklist:
- [ ] Home page: < 3 seconds
- [ ] Booking page: < 2 seconds
- [ ] Contact page: < 2 seconds
- [ ] Academy page: < 3 seconds

### Database Query Performance
- Monitor query logs
- Ensure indexes are used
- Check slow query logs

## Testing Checklist

### Core Features
- [ ] Booking form submission
- [ ] Contact form submission
- [ ] Academy enrollment
- [ ] Email notifications sent
- [ ] Database records created

### User Experience
- [ ] Form validation works
- [ ] Success/error messages display
- [ ] WhatsApp integration functions
- [ ] Responsive on mobile
- [ ] Responsive on desktop

### Backend
- [ ] API endpoints accessible
- [ ] CORS configured correctly
- [ ] Database connections stable
- [ ] Error handling graceful

### Email
- [ ] Customer confirmation emails
- [ ] Admin notification emails
- [ ] No emails in spam
- [ ] Templates look professional

### Deployment
- [ ] Build succeeds on Vercel
- [ ] Environment variables set
- [ ] Database connected
- [ ] Site accessible publicly

## Regression Testing

Before each deployment, test:
1. All forms still submit
2. All emails still send
3. Database still saves
4. No console errors
5. All pages load
6. WhatsApp links work

## Known Issues & Workarounds

### Issue: Emails going to spam
**Workaround:** Verify your domain with Resend

### Issue: Database connection timeout
**Workaround:** Check Railway is running, verify DATABASE_URL

### Issue: Forms submit but no emails
**Workaround:** Check RESEND_API_KEY is correct and set in all environments

## Support & Debugging

If tests fail, check:

1. **Check console errors:**
   ```bash
   # Terminal error logs
   npm run dev
   ```

2. **Check database:**
   ```bash
   npx prisma studio
   ```

3. **Check email logs:**
   - Go to Resend dashboard
   - Check Activity section

4. **Check API logs:**
   - Go to Vercel Monitoring
   - Check Function logs

## Next Steps

After passing all tests:
1. Deploy to Vercel
2. Test production
3. Launch publicly
4. Monitor continuously
5. Gather user feedback
