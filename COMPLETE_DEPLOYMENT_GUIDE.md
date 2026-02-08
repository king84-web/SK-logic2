# COMPLETE DEPLOYMENT GUIDE - SK Logic Website

**Last Updated:** January 23, 2026  
**Status:** Ready for Deployment ✅

---

## 🔴 CRITICAL FIXES APPLIED

The following critical issues have been identified and fixed:

1. **✅ ContactForm API endpoint** - Changed from external URL to relative path `/api/contact`
2. **✅ Email from address** - Updated from `noreply@sk-logic.com` to `onboarding@resend.dev` (Resend default)
3. **✅ Prisma logging** - Disabled in production to prevent performance issues
4. **✅ CORS validation** - Fixed to properly validate origins, preventing security bypass
5. **✅ Backend Prisma instance** - Matches production logging configuration

---

## PHASE 1: LOCAL SETUP & TESTING (30 minutes)

### Step 1.1: Install Dependencies
```bash
cd "c:\Users\Mary Martha\OneDrive\Documents\OneDrive\Desktop\sk logic"
npm install
```

### Step 1.2: Create Environment File
```bash
cp .env.example .env.local
```

### Step 1.3: Configure `.env.local`
Edit the file and set:
```env
# Database (you'll get this from Railway later)
DATABASE_URL=postgresql://user:password@host:5432/database

# Email API
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx

# Admin settings
ADMIN_EMAIL=kamarasolomon164@gmail.com
ADMIN_NAME=Solomon Kamara

# WhatsApp (already configured)
NEXT_PUBLIC_WHATSAPP_NUMBER=250792405593

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# CORS allowed domains (add your deployment URL later)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Environment
NODE_ENV=development
```

### Step 1.4: Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

Verify all pages load:
- [ ] Home page loads
- [ ] Navigation works
- [ ] All sections visible

### Step 1.5: Build Test
```bash
npm run build
npm start
# Visit http://localhost:3000
```

---

## PHASE 2: EXTERNAL SERVICES SETUP (2-3 hours)

### Step 2.1: Railway PostgreSQL Database

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub
   - Create new project → Provision PostgreSQL

2. **Get Database URL**
   - Click PostgreSQL service
   - Go to Variables tab
   - Copy `DATABASE_URL` (looks like: `postgresql://username:password@host:5432/database`)
   - Save this securely

3. **Optional: Enable Automatic Backups**
   - In Railway, click your PostgreSQL service
   - Go to settings
   - Backups are enabled by default

### Step 2.2: Resend Email Service

1. **Create Resend Account**
   - Go to https://resend.com
   - Sign up with email
   - Create new project

2. **Get API Key**
   - Go to API Keys section
   - Copy the API key (starts with `re_`)
   - Save this securely

3. **Test Email Domain**
   - Emails will come from `onboarding@resend.dev` initially
   - This is sufficient for testing and production
   - Optional: Add custom domain later for branding

### Step 2.3: GitHub Repository

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for deployment"
   git branch -M main
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sk-logic.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your actual GitHub username

---

## PHASE 3: VERCEL DEPLOYMENT (30 minutes)

### Step 3.1: Create Vercel Project

1. **Sign up at Vercel**
   - Go to https://vercel.com
   - Click "Sign Up"
   - Select "GitHub" and authorize

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your `sk-logic` GitHub repository
   - Vercel auto-detects Next.js ✓

3. **Configure Build Settings**
   - Framework: **Next.js** (auto-selected)
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - These should auto-populate correctly ✓

### Step 3.2: Add Environment Variables

In Vercel project → Settings → Environment Variables

Add these variables **exactly as shown**:

```
DATABASE_URL = postgresql://user:password@host:5432/database
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxx
ADMIN_EMAIL = kamarasolomon164@gmail.com
ADMIN_NAME = Solomon Kamara
NEXT_PUBLIC_WHATSAPP_NUMBER = 250792405593
NEXT_PUBLIC_API_URL = https://sk-logic.vercel.app
ALLOWED_ORIGINS = https://sk-logic.vercel.app,http://localhost:3000
NODE_ENV = production
```

**IMPORTANT:** Apply to **All** (Production, Preview, Development)

### Step 3.3: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Watch the logs for any errors
4. Once deployed, you'll get a production URL

**URL Format:** `https://sk-logic.vercel.app` (or custom domain)

### Step 3.4: Verify Deployment

1. Visit your Vercel URL
2. Check all pages load
3. Test forms in next phase

---

## PHASE 4: DATABASE SCHEMA SETUP

### Step 4.1: Push Database Schema

The schema is automatically pushed during Vercel build due to `postinstall` script in `package.json`.

To verify or manually push:
```bash
npx prisma db push
```

### Step 4.2: Verify Database

```bash
npx prisma studio
# Opens at http://localhost:5555
# Verify you can see the tables:
# - ServiceBooking
# - ContactMessage  
# - AcademyEnrollment
```

---

## PHASE 5: POST-DEPLOYMENT TESTING (1 hour)

### Test 5.1: Booking Form
1. Go to `/booking` on your live site
2. Fill all fields:
   - Name: Test User
   - Email: test@example.com
   - Phone: 250792405593
   - Service: Web Development
   - Date: Pick a date
   - Message: Test message

3. Click "Submit"
4. Should see "✓ Booking submitted successfully"
5. Check your email (kamarasolomon164@gmail.com):
   - Should receive admin notification
   - Customer should receive confirmation

### Test 5.2: Contact Form
1. Go to `/contact` on your live site
2. Fill all fields:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Subject
   - Message: Test message

3. Click "Send Message"
4. Should see "✓ Message sent successfully"
5. Check email for notifications

### Test 5.3: Academy Enrollment
1. Go to `/academy` on your live site
2. Enroll in a course
3. Should see enrollment confirmation
4. Check email for notifications

### Test 5.4: WhatsApp Integration
1. On any form, click "Chat on WhatsApp" button
2. Should open WhatsApp with pre-filled message
3. Message should include service/course name

### Test 5.5: Database Records
```bash
npx prisma studio
# Verify all form submissions appear in database tables
```

### Test 5.6: API Endpoints (using curl/Postman)

**Test Booking API:**
```bash
curl -X POST https://sk-logic.vercel.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@test.com",
    "phone":"250792405593",
    "service":"Web Dev",
    "date":"2026-02-01",
    "message":"Test booking"
  }'
```

Expected response (201):
```json
{
  "message": "Booking submitted successfully",
  "id": "cly...",
  "booking": { ... }
}
```

**Test Contact API:**
```bash
curl -X POST https://sk-logic.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@test.com",
    "subject":"Test",
    "message":"Test message"
  }'
```

---

## PHASE 6: PRODUCTION CHECKLIST

Before going live, verify:

### Security
- [ ] Environment variables are set in Vercel (not in code)
- [ ] `.env.local` is in `.gitignore` ✓
- [ ] `node_modules/` is in `.gitignore` ✓
- [ ] CORS properly validates origins ✓
- [ ] No API keys in code ✓

### Performance
- [ ] Build completes successfully (no warnings)
- [ ] Vercel analytics show good performance
- [ ] Database queries are optimized
- [ ] Images are optimized (AVIF format) ✓

### Functionality
- [ ] All forms submit successfully
- [ ] All emails are received (check spam)
- [ ] Database records are created
- [ ] WhatsApp links work correctly
- [ ] Navigation and routing work

### Monitoring
- [ ] Set up Vercel alerts for deployment failures
- [ ] Monitor email delivery in Resend dashboard
- [ ] Check Railway database metrics
- [ ] Review Vercel logs for errors

---

## PHASE 7: GOING LIVE

### Step 7.1: Custom Domain (Optional)

If you have a custom domain (e.g., `sk-logic.com`):

1. In Vercel → Project Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)
4. Wait for DNS propagation (5-30 minutes)

### Step 7.2: Update Production Variables

In Vercel → Environment Variables:

```env
NEXT_PUBLIC_API_URL = https://your-domain.com
ALLOWED_ORIGINS = https://your-domain.com,http://localhost:3000
```

### Step 7.3: Final Testing

1. Visit your live site
2. Test all forms again
3. Check all emails arrive
4. Monitor logs for errors

### Step 7.4: Announcement

- [ ] Update website header with launch date
- [ ] Announce on social media
- [ ] Send email to contacts
- [ ] Monitor user feedback

---

## TROUBLESHOOTING

### Build Fails on Vercel

**Error: "postinstall" script**
- Check Vercel build logs
- Ensure `package.json` has correct `postinstall` script
- Verify Node.js version (set to 20.x)

**Error: DATABASE_URL not found**
- Go to Vercel project settings
- Add `DATABASE_URL` to environment variables
- Redeploy

### Emails Not Received

**From Resend:**
1. Check Resend dashboard for delivery status
2. Verify API key is correct
3. Check spam folder
4. Verify email addresses are correct

**Solution:** Try changing email domain in Resend settings if available

### Forms Not Submitting

**Check console for errors:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit form
4. Look for error messages
5. Check Network tab to see API response

**Common issues:**
- CORS error: Update `ALLOWED_ORIGINS` in Vercel
- 500 error: Check Vercel logs for database connection issue
- Validation error: Check required fields in form

### Database Connection Failed

1. Verify `DATABASE_URL` format in Vercel
2. Check Railway database is running
3. Verify credentials in DATABASE_URL
4. Test connection locally first

---

## MONITORING & MAINTENANCE

### Weekly
- [ ] Check Vercel deployment logs
- [ ] Review Resend email delivery dashboard
- [ ] Monitor Railway database metrics

### Monthly
- [ ] Review form submissions
- [ ] Check for error patterns in logs
- [ ] Update dependencies (if needed)
- [ ] Backup database (Railway auto-backup enabled)

### After Major Updates
- [ ] Run full test suite
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Check performance metrics

---

## QUICK COMMAND REFERENCE

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Build for production
npm start                      # Start production server

# Database
npx prisma studio            # Open database UI
npx prisma db push           # Sync schema to database
npx prisma migrate dev        # Create migration

# Git
git add .
git commit -m "message"
git push origin main          # Deploy to Vercel (automatic)
```

---

## SUPPORT & RESOURCES

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Resend Docs:** https://resend.com/docs
- **Railway Docs:** https://docs.railway.app

---

## DEPLOYMENT SUMMARY

| Phase | Time | Status |
|-------|------|--------|
| Local Setup | 30 min | ✅ Ready |
| External Services | 2-3 hrs | ⏳ Pending |
| Vercel Deployment | 30 min | ⏳ Pending |
| Database Setup | 10 min | ⏳ Pending |
| Testing | 1 hour | ⏳ Pending |
| Going Live | 30 min | ⏳ Pending |
| **TOTAL** | **4-5 hrs** | **✅ Automated** |

---

## ✅ ALL FIXES APPLIED

Before this deployment guide, these critical issues were identified and fixed in the codebase:

1. **ContactForm.tsx (line 29)**
   - ❌ Was: Using external API URL
   - ✅ Fixed: Now uses relative path `/api/contact`

2. **lib/email.ts (multiple)**
   - ❌ Was: Using `noreply@sk-logic.com` (unverified domain)
   - ✅ Fixed: Now uses `onboarding@resend.dev` (Resend default)

3. **backend/lib/db/prisma.ts (line 7)**
   - ❌ Was: Logging all queries in production
   - ✅ Fixed: Logging only in development

4. **API Routes - CORS (all 3 routes)**
   - ❌ Was: Allowing wildcard origins `*`
   - ✅ Fixed: Proper origin validation with whitelist

These changes ensure:
- ✅ Forms work correctly in production
- ✅ Emails are delivered reliably
- ✅ API security is enforced
- ✅ Production performance is optimized
- ✅ No errors during deployment

---

**Ready to deploy? Start with Phase 1 above.**
