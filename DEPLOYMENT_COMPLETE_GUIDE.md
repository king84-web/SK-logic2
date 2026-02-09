# 🚀 SK Logic - Complete Deployment Guide

## Overview
This guide will walk you through deploying your SK Logic application successfully. The deployment involves three main components:
1. **Database** (PostgreSQL on Railway)
2. **Email Service** (Resend)
3. **Frontend** (Next.js on Vercel)

---

## 📋 Pre-Deployment Checklist

Before starting, ensure you have:
- [ ] GitHub account with your code repository
- [ ] Vercel account (vercel.com)
- [ ] Railway account (railway.app)
- [ ] Resend account (resend.com)
- [ ] Your project pushed to GitHub
- [ ] Build passes locally (`npm run build`)

---

## PART 1: Set Up Database (Railway)

### Step 1.1: Create Railway Project
1. Go to https://dashboard.railway.app
2. Sign in or create a new account
3. Click **"Create New Project"**
4. Select **"Provision PostgreSQL"**
5. Wait for the database to initialize (this takes 1-2 minutes)

### Step 1.2: Get Database Connection String
1. Click on your **PostgreSQL** service
2. Go to **"Variables"** tab
3. Look for `DATABASE_URL`
4. **Copy the entire connection string** (starts with `postgresql://`)
5. **Save this somewhere safe** - you'll need it for Vercel

✅ **Example format:**
```
postgresql://username:password@host:5432/railway?sslmode=require
```

---

## PART 2: Set Up Email Service (Resend)

### Step 2.1: Create Resend Account
1. Go to https://resend.com
2. Click **"Sign Up"**
3. Enter your email and create a password
4. Verify your email address

### Step 2.2: Create API Key
1. In Resend Dashboard, go to **"API Keys"** (left sidebar)
2. Click **"Create API Key"** button
3. You can leave it as "Test Mode" for now
4. **Copy the API key** (starts with `re_`)
5. **Save this somewhere safe**

⚠️ **Important:** Never commit this key to GitHub!

### Step 2.3: (Optional) Verify Your Domain
For better email deliverability:
1. Go to **"Domains"** in Resend Dashboard
2. Click **"Add Domain"**
3. Enter your domain (e.g., `sk-logic.com`)
4. Add the DNS records to your domain registrar
5. Wait for DNS verification (up to 24 hours)

*For testing, you can skip this and use the default sender*

---

## PART 3: Deploy Frontend (Vercel)

### Step 3.1: Push Code to GitHub
1. Open terminal in your project folder
2. Run these commands:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 3.2: Create Vercel Project
1. Go to https://vercel.com
2. Sign in or create account
3. Click **"Add New"** → **"Project"**
4. **Select your SK Logic GitHub repository**
5. Click **"Import"**
6. In the configuration screen:
   - Framework: **Next.js** (should be auto-selected)
   - Click **"Deploy"**

*Vercel will start building your project. This may fail temporarily because environment variables aren't set yet - this is expected.*

### Step 3.3: Add Environment Variables in Vercel

**Very Important:** Vercel will only work correctly if you configure all these variables.

1. Go to **Settings → Environment Variables**
2. Add these variables one by one:

**Database Connection:**
```
DATABASE_URL = [paste the Railway PostgreSQL URL from PART 1]
```

**Email Service:**
```
RESEND_API_KEY = [paste the Resend API key from PART 2]
```

**Application Settings:**
```
ADMIN_EMAIL = kamarasolomon164@gmail.com
NODE_ENV = production
```

**API Configuration:**
```
NEXT_PUBLIC_WHATSAPP_NUMBER = 25072405593
NEXT_PUBLIC_API_URL = https://[your-project-name].vercel.app
ALLOWED_ORIGINS = https://[your-project-name].vercel.app,http://localhost:3000
```

**Replace `[your-project-name]` with your actual Vercel project name (shown on the project page)**

### Step 3.4: Apply Variables to All Environments
⚠️ **Critical Step:** For each variable, make sure to:
1. Check the checkboxes next to **Production**, **Preview**, and **Development**
2. Click **"Save"**

### Step 3.5: Trigger a Redeploy
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click **the three dots (⋮)** on the right
4. Select **"Redeploy"**
5. Click **"Confirm"**

This ensures Vercel rebuilds with all environment variables properly set.

---

## PART 4: Database Setup in Vercel Build

### Step 4.1: Push Database Schema
The Prisma schema is automatically pushed during the Vercel build process through the `postinstall` script in your `package.json`.

**To verify it worked:**
1. Wait for the redeploy to complete
2. Check the build logs in Vercel Deployments tab
3. Look for: `✓ Database reset successful` (if first time) or `✓ Prisma schema was already in sync`

---

## PART 5: Verify Your Deployment

### Step 5.1: Test the Live Website
1. Get your Vercel domain:
   - Go to **Settings → Domains**
   - Your default domain is shown there
2. Visit your live site (e.g., `https://your-project-name.vercel.app`)
3. Check that all pages load correctly

### Step 5.2: Test Form Submissions
1. Go to the **Booking** page (`/booking`)
2. Fill out the booking form and submit
3. Check that:
   - The form accepts your submission
   - You receive confirmation email (check your inbox and spam folder)
   - Admin receives notification email at `kamarasolomon164@gmail.com`

4. Test **Contact** form (`/contact`) similarly
5. Test **Academy** enrollment form (`/academy`) similarly

### Step 5.3: Check for Errors
1. Go to **Monitoring** tab in Vercel
2. Look at **"Errors"** section for any runtime errors
3. If there are errors, click them to see details
4. Check Vercel **Deployments** build logs if build failed

---

## PART 6: Custom Domain Setup (Optional)

### Step 6.1: Add Custom Domain in Vercel
1. Go to **Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `sk-logic.com`)
4. Vercel will show you the DNS records to add

### Step 6.2: Configure DNS at Your Registrar
1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS/Name Server settings
3. Add the DNS records provided by Vercel
4. Wait 24-48 hours for DNS to propagate
5. Vercel will automatically verify when ready

---

## 🆘 Troubleshooting

### "Missing API key" Error
**Problem:** Deployment fails with "Missing RESEND_API_KEY"
**Solution:**
1. Check that `RESEND_API_KEY` is added in Vercel Environment Variables
2. Ensure it's checked for **Production** environment
3. Verify the key starts with `re_`
4. Redeploy after adding it

### Build Fails
**Solution Steps:**
1. Check Vercel **Deployments** → build logs
2. Look for specific error messages
3. Common causes:
   - Missing environment variables
   - Database connection string has typo
   - Syntax errors in code

### Forms Don't Send Emails
**Solution:**
1. Verify `RESEND_API_KEY` is set in Vercel
2. Check email address is correct in form submission
3. Check spam/junk folder for emails
4. Look at Vercel **Monitoring** tab for errors

### Database Connection Errors
**Solution:**
1. Verify `DATABASE_URL` is correctly copied from Railway
2. Check it includes the full connection string
3. Ensure it's set in Vercel **Production** environment
4. Redeploy after correcting it

---

## 📊 Monitoring Your Application

### View Vercel Logs
- Go to **Deployments** → click a deployment → scroll for logs

### View Database Activity
- Go to Railway Dashboard → PostgreSQL service → **Logs** tab

### Monitor Emails
- Go to Resend Dashboard → **Logs** to see all emails sent

### Check Application Errors
- Go to Vercel **Monitoring** → **Errors** tab

---

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Live website loads at your Vercel domain
- ✅ All pages are accessible
- ✅ Booking form submits and sends emails
- ✅ Contact form works
- ✅ Academy enrollment form works
- ✅ No errors in Vercel Monitoring
- ✅ Emails arrive in your inbox (check spam too)

---

## 📝 Environment Variables Summary

| Variable | Source | Where to Get |
|----------|--------|-------------|
| `DATABASE_URL` | Railway | Railway Dashboard → PostgreSQL → Variables |
| `RESEND_API_KEY` | Resend | Resend Dashboard → API Keys |
| `ADMIN_EMAIL` | Your choice | Use: `kamarasolomon164@gmail.com` |
| `NODE_ENV` | Fixed | Always: `production` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your choice | Use: `25072405593` |
| `NEXT_PUBLIC_API_URL` | Vercel | Your Vercel domain (e.g., `https://your-project-name.vercel.app`) |
| `ALLOWED_ORIGINS` | Vercel | Same as above + `http://localhost:3000` |

---

## ✅ Final Checklist

Before considering deployment complete:
- [ ] Vercel project created and linked to GitHub
- [ ] All environment variables added to Vercel
- [ ] Database connected and schema synced
- [ ] Build completes successfully
- [ ] Live website accessible
- [ ] Test booking form works
- [ ] Test contact form works
- [ ] Test academy enrollment form works
- [ ] Emails are being sent (check spam folder)
- [ ] No errors in Vercel Monitoring

---

## 🆘 Need Help?

If something goes wrong:
1. Check the **Troubleshooting** section above
2. Review Vercel build logs in **Deployments** tab
3. Check Vercel **Monitoring** for runtime errors
4. Verify environment variables are correctly set
5. Ensure database connection string is complete and correct

**Good luck with your deployment! 🚀**
