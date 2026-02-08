# WhatsApp-Only Payment Deployment Guide

## Overview
This guide provides step-by-step instructions to deploy the SK Logic application with **WhatsApp-only payment processing**. Flutterwave has been completely removed and all payments now go through WhatsApp.

---

## ✅ What Has Changed

### Removed
- ❌ Flutterwave integration
- ❌ Flutterwave package dependency
- ❌ Online card/mobile money payments
- ❌ Automatic payment verification
- ❌ Payment callback page

### Added
- ✅ WhatsApp payment links
- ✅ Direct WhatsApp messaging for all payment inquiries
- ✅ Manual payment verification workflow
- ✅ Simplified booking process

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Node.js 20.x installed
- [ ] PostgreSQL database set up
- [ ] Vercel account (for hosting)
- [ ] WhatsApp Business account
- [ ] WhatsApp Business Number (with prefix: 25072405593)
- [ ] Environment variables configured
- [ ] Git repository updated

---

## 🚀 Step-by-Step Deployment Guide

### Step 1: Clean Up Local Dependencies

```bash
# Remove old Flutterwave dependencies
npm uninstall flutterwave-node-v3

# Clean install fresh dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

**On Windows PowerShell:**
```powershell
npm uninstall flutterwave-node-v3
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

### Step 2: Update Environment Variables

Create or update `.env.local` file with ONLY these payment-related variables:

```bash
# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593

# Remove these if they exist (Flutterwave):
# FLUTTERWAVE_PUBLIC_KEY=xxx
# FLUTTERWAVE_SECRET_KEY=xxx
```

**Complete `.env.local` Example:**
```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/sk_logic

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593

# App Config
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,http://localhost:3000

# Admin Settings
ADMIN_EMAIL=admin@sklogic.com
```

---

### Step 3: Run Migrations

Update the database schema:

```bash
# Generate Prisma client
npx prisma generate

# Run any pending migrations
npx prisma migrate deploy

# Reset database (development only!)
# npx prisma migrate reset
```

---

### Step 4: Test Locally

```bash
# Start development server
npm run dev
```

**Test the following:**
1. Navigate to http://localhost:3000/booking
2. Fill out booking form with an amount
3. Click "Pay via WhatsApp"
4. Verify WhatsApp link opens with pre-filled message
5. Check database for booking record

---

### Step 5: Build and Test Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

Test the production build at http://localhost:3000

---

### Step 6: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: Using GitHub Integration

1. Push code to GitHub:
```bash
git add .
git commit -m "Remove Flutterwave, implement WhatsApp-only payments"
git push origin main
```

2. In Vercel Dashboard:
   - Click "New Project"
   - Import your repository
   - Set environment variables (same as `.env.local`)
   - Click "Deploy"

---

### Step 7: Configure Vercel Environment Variables

In Vercel Dashboard:
1. Go to Project → Settings → Environment Variables
2. Add these variables:

```
DATABASE_URL = postgresql://...
RESEND_API_KEY = re_...
NEXT_PUBLIC_WHATSAPP_NUMBER = 25072405593
NEXT_PUBLIC_APP_URL = https://yourdomain.com
ALLOWED_ORIGINS = https://yourdomain.com
ADMIN_EMAIL = admin@sklogic.com
```

3. Redeploy after adding variables

---

### Step 8: Set Up Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

---

### Step 9: Update Payment Webhook (Manual Admin Process)

Since payments are now manual, set up this workflow:

**Admin WhatsApp Workflow:**
1. Customer sends payment request via WhatsApp
2. Admin verifies payment receipt (bank/mobile money confirmation)
3. Admin updates booking status in database:

```bash
# Example: Admin updates payment status
curl -X POST https://yourdomain.com/api/payments/verify \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "booking_id",
    "status": "paid"
  }'
```

Or directly update database (if admin access available):
```sql
UPDATE "ServiceBooking" 
SET "paymentStatus" = 'paid', 
    "status" = 'confirmed' 
WHERE "id" = 'booking_id';
```

---

## 🔄 Post-Deployment Verification

After deployment, verify:

### 1. Website Loads
```bash
curl https://yourdomain.com
```

### 2. Booking Form Works
- Visit /booking page
- Fill form with amount
- Click "Pay via WhatsApp"
- Should open WhatsApp Web with pre-filled message

### 3. Database Connection
- Check Vercel logs for database errors
- Verify bookings are being created

### 4. Email (if applicable)
- Test contact form
- Verify email delivery

### 5. Admin Dashboard
- Visit /admin/dashboard
- View recent bookings
- Check payment statuses

---

## 📊 Database Schema Changes

### Booking Table Updates
```sql
-- All bookings now use WhatsApp payment
ALTER TABLE "ServiceBooking" 
  MODIFY COLUMN "paymentMethod" VARCHAR DEFAULT 'whatsapp';

-- Payment status workflow
-- unpaid → pending → paid/failed
```

### Current Fields
- `id` - Unique booking ID
- `paymentMethod` - Always "whatsapp"
- `paymentStatus` - "unpaid", "pending", "paid", "failed"
- `paymentId` - Transaction reference (SK-timestamp-random)
- `amount` - Service cost
- `currency` - Always "RWF" by default

---

## 🛠️ Troubleshooting

### Issue: Flutterwave still showing in code
**Solution:** Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: WhatsApp link not opening
**Solution:** Check WhatsApp number in `.env.local`
- Should be: `25072405593` (with country code)
- No spaces or special characters

### Issue: Bookings not saving
**Solution:** Verify database connection
```bash
# Test Prisma connection
npx prisma db push

# View database
npx prisma studio
```

### Issue: Vercel deployment fails
**Solution:** Check logs and environment variables
1. In Vercel: Project → Deployments → Failed deployment
2. Check Logs tab for errors
3. Verify all env variables are set
4. Ensure DATABASE_URL has SSL required

---

## 📱 WhatsApp Payment Flow

### User Journey:
1. **User selects service** → Fills booking form
2. **User enters amount** → Clicks "Pay via WhatsApp"
3. **WhatsApp opens** → Pre-filled with payment details
4. **Customer sends payment** → Initiates mobile money/bank transfer
5. **Admin receives WhatsApp** → Verifies payment received
6. **Admin confirms payment** → Updates booking status in system
7. **Customer gets email** → Service confirmed

### Admin Actions:
- Monitor WhatsApp for payment messages
- Verify payment via bank/mobile money app
- Update database with payment confirmation
- Send confirmation email to customer

---

## 🔐 Security Notes

### What's Improved:
- ✅ No card data stored
- ✅ No payment gateway vulnerabilities
- ✅ Direct peer-to-peer transactions
- ✅ All data in PostgreSQL with HTTPS

### What to Monitor:
- ⚠️ Admin confirms payments manually
- ⚠️ Keep WhatsApp account secure
- ⚠️ Audit payment confirmations regularly
- ⚠️ Use strong database passwords

---

## 📧 Useful Endpoints

### Booking Creation
```bash
POST /api/bookings
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "250792405593",
  "service": "web-dev-company",
  "amount": 500000,
  "date": "2025-02-15"
}
```

### Payment Initialization (WhatsApp)
```bash
POST /api/payments/initialize
{
  "bookingId": "booking_id",
  "amount": 500000,
  "email": "john@example.com",
  "phone": "250792405593",
  "name": "John Doe",
  "service": "web-dev-company",
  "description": "Payment for web development service"
}
```

### Payment Verification (Admin)
```bash
POST /api/payments/verify
{
  "bookingId": "booking_id",
  "status": "paid"
}
```

---

## 🎯 Next Steps

### Immediate (Week 1):
- [ ] Deploy to production
- [ ] Test all booking flows
- [ ] Verify WhatsApp integration
- [ ] Monitor error logs

### Short-term (Week 2-3):
- [ ] Train admin on payment verification
- [ ] Set up WhatsApp response templates
- [ ] Create payment confirmation email templates
- [ ] Document manual verification process

### Medium-term (Month 1-2):
- [ ] Consider WhatsApp Business API for automation
- [ ] Implement SMS notifications
- [ ] Add payment receipt generation
- [ ] Build analytics dashboard

---

## 📞 Support & Maintenance

### Common Maintenance Tasks:

**View recent bookings:**
```bash
npx prisma studio
# Then navigate to ServiceBooking table
```

**Check deployment logs:**
```bash
vercel logs yourdomain.com
```

**Update environment variable:**
```bash
vercel env pull  # Download current env
# Edit .env.local
vercel env add VARIABLE_NAME value  # Add new
```

---

## ✨ Deployment Complete!

Your SK Logic website is now live with WhatsApp-only payments!

**Next:**
- Share deployment URL with team
- Monitor bookings and payments
- Gather user feedback
- Iterate and improve

**Questions?** Check logs or contact support.
