# Deployment Checklist - SK Logic Website

Complete this checklist before going live with your website.

## Pre-Deployment (Local Setup)

- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Create `.env.local` file**
  ```bash
  cp .env.example .env.local
  ```

- [ ] **Configure environment variables** in `.env.local`
  - [ ] `DATABASE_URL` (Railway PostgreSQL)
  - [ ] `RESEND_API_KEY` (from Resend dashboard)
  - [ ] `ADMIN_EMAIL` (your email)
  - [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` (25072405593)

- [ ] **Push database schema**
  ```bash
  npx prisma db push
  ```

- [ ] **Test locally**
  ```bash
  npm run dev
  # Visit http://localhost:3000
  ```

- [ ] **Test all forms**
  - [ ] Booking form submits
  - [ ] Contact form submits
  - [ ] Academy enrollment works
  - [ ] Database records created
  - [ ] Emails received

- [ ] **Build for production**
  ```bash
  npm run build
  npm start
  # Test at http://localhost:3000
  ```

## Database Setup (Railway)

- [ ] **Create Railway account** at https://railway.app
- [ ] **Create PostgreSQL database** in Railway
- [ ] **Get `DATABASE_URL`** from Railway dashboard
- [ ] **Test connection** locally with that URL
- [ ] **Verify backups enabled** (Railway does this automatically)

## Email Setup (Resend)

- [ ] **Create Resend account** at https://resend.com
- [ ] **Create project** in Resend
- [ ] **Get API key** (starts with `re_`)
- [ ] **(Optional) Verify domain** for better deliverability
- [ ] **Test email sending** locally
- [ ] **Check spam settings** (ask Resend support if needed)

## GitHub Setup

- [ ] **Initialize Git repository**
  ```bash
  git init
  ```

- [ ] **Create `.gitignore`** (should already exist)
  - [ ] Verify `.env.local` is ignored
  - [ ] Verify `node_modules/` is ignored
  - [ ] Verify `.next/` is ignored

- [ ] **Commit and push code**
  ```bash
  git add .
  git commit -m "Ready for deployment"
  git branch -M main
  git remote add origin <your-github-url>
  git push -u origin main
  ```

## Vercel Deployment

- [ ] **Sign up at Vercel** (https://vercel.com)
- [ ] **Link GitHub account** to Vercel
- [ ] **Create new project** from GitHub
- [ ] **Select `sk logic` repository**
- [ ] **Configure project settings**
  - [ ] Framework: Next.js
  - [ ] Build command: `next build`
  - [ ] Start command: `next start`

- [ ] **Add environment variables** in Vercel
  - [ ] `DATABASE_URL` (from Railway)
  - [ ] `RESEND_API_KEY` (from Resend)
  - [ ] `ADMIN_EMAIL` (your email)
  - [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` (25072405593)
  - [ ] `NEXT_PUBLIC_API_URL` (your Vercel domain)
  - [ ] `ALLOWED_ORIGINS` (Vercel domain + localhost for dev)
  - [ ] Apply to **Production, Preview, and Development**

- [ ] **Deploy to production**
  - [ ] Watch build logs for errors
  - [ ] Verify site loads at https://sk-logic.vercel.app

## Post-Deployment Testing

- [ ] **Test booking flow**
  - [ ] Go to live site `/booking`
  - [ ] Fill out booking form
  - [ ] Submit booking
  - [ ] Check email received (check spam folder)
  - [ ] Verify in Prisma Studio

- [ ] **Test contact form**
  - [ ] Go to live site `/contact`
  - [ ] Fill out contact form
  - [ ] Submit message
  - [ ] Check email received

- [ ] **Test academy enrollment**
  - [ ] Go to live site `/academy`
  - [ ] Enroll in course
  - [ ] Check email received

- [ ] **Test WhatsApp integration**
  - [ ] Click "Chat on WhatsApp" button
  - [ ] Verify WhatsApp opens with pre-filled message

- [ ] **Test API endpoints**
  ```bash
  # Test booking API
  curl -X POST https://sk-logic.vercel.app/api/bookings \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","phone":"25072405593","service":"Web Dev"}'
  
  # Should return 201 with booking data
  ```

- [ ] **Check database**
  ```bash
  npx prisma studio
  # Verify all records are in database
  ```

- [ ] **Monitor Vercel**
  - [ ] Go to Deployments tab
  - [ ] Check build logs for warnings
  - [ ] Go to Monitoring tab
  - [ ] Check for runtime errors

## Custom Domain (Optional)

- [ ] **Register domain** (GoDaddy, Namecheap, etc.)
- [ ] **In Vercel Settings → Domains**
  - [ ] Click "Add Domain"
  - [ ] Enter domain (e.g., sk-logic.com)
  - [ ] Add nameserver records to domain registrar
- [ ] **Wait for DNS propagation** (up to 48 hours)
- [ ] **Verify domain works** in Vercel dashboard

## Performance & Monitoring

- [ ] **Enable Vercel Analytics**
  - [ ] Settings → Analytics
  - [ ] Monitor real user metrics

- [ ] **Check Core Web Vitals**
  - [ ] Monitoring → Real User Analytics
  - [ ] Should be green (Good)

- [ ] **Test page load speed**
  - [ ] Home page: < 3 seconds
  - [ ] Booking page: < 2 seconds
  - [ ] Contact page: < 2 seconds
  - [ ] Academy page: < 3 seconds

- [ ] **Check mobile responsiveness**
  - [ ] Test on iPhone
  - [ ] Test on Android
  - [ ] Test tablet view

## Security & Compliance

- [ ] **HTTPS enabled** (automatic on Vercel)
- [ ] **No API keys in code** (verified)
- [ ] **Environment variables configured** (verified)
- [ ] **CORS whitelist set** (your domain only)
- [ ] **Database backups enabled** (Railway automatic)
- [ ] **Error pages configured**
  - [ ] 404 page exists
  - [ ] Error page doesn't expose internals

## Final Checks

- [ ] **All forms work end-to-end**
- [ ] **All emails send correctly**
- [ ] **Database persists data**
- [ ] **No console errors**
- [ ] **No TypeScript errors**
- [ ] **Mobile responsive**
- [ ] **Fast loading**
- [ ] **CORS working**
- [ ] **WhatsApp links work**

## Post-Launch Monitoring

- [ ] **Monitor error logs** daily (first week)
  - [ ] Vercel Monitoring tab
  - [ ] Check for patterns

- [ ] **Monitor email delivery**
  - [ ] Check Resend Activity dashboard
  - [ ] Verify open rates
  - [ ] Watch for bounces

- [ ] **Monitor database**
  - [ ] Check query performance
  - [ ] Watch connection count
  - [ ] Monitor storage usage

- [ ] **Monitor uptime**
  - [ ] Use Vercel status page
  - [ ] Set up alerts (optional)

- [ ] **User feedback**
  - [ ] Ask for feedback
  - [ ] Fix any issues quickly
  - [ ] Monitor WhatsApp messages

## Rollback Plan

If something goes wrong after launch:

1. **Quick Rollback** (< 1 minute)
   ```
   Go to Vercel → Deployments
   Find last working deployment
   Click "Promote to Production"
   ```

2. **Investigate Issues**
   - Check Vercel logs
   - Check Resend email logs
   - Check database status

3. **Fix & Redeploy**
   ```bash
   git fix issue
   git push origin main
   # Vercel auto-deploys
   ```

## Success Criteria

Your website is ready to go live when:

✅ All forms work end-to-end  
✅ All emails deliver  
✅ Database saves data  
✅ No errors in production  
✅ Fast page loads  
✅ Mobile responsive  
✅ CORS configured  
✅ WhatsApp integration works  
✅ Admin can view all records  
✅ Site performs well under load  

## Support

If you need help:

1. **Check the guides:**
   - [VERCEL_SETUP.md](VERCEL_SETUP.md)
   - [RAILWAY_SETUP.md](RAILWAY_SETUP.md)
   - [RESEND_SETUP.md](RESEND_SETUP.md)
   - [TESTING_GUIDE.md](TESTING_GUIDE.md)

2. **Check logs:**
   - Vercel: Settings → Deployments → Build logs
   - Resend: Dashboard → Activity
   - Database: `npx prisma studio`

3. **Common issues:**
   - Database not connecting: Check DATABASE_URL
   - Emails not sending: Check RESEND_API_KEY
   - Page not loading: Check Vercel build logs
   - CORS errors: Check ALLOWED_ORIGINS

Good luck! 🚀
