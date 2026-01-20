# Vercel Deployment Guide

## Overview
This guide walks you through deploying your SK Logic Next.js frontend to Vercel.

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository with your code
- Environment variables configured
- Railway PostgreSQL database set up (see RAILWAY_SETUP.md)
- Resend account for email functionality (sign up at https://resend.com)

## Step 1: Prepare Your GitHub Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Ensure `.env.local` is in `.gitignore`**
   ```bash
   echo ".env.local" >> .gitignore
   ```

3. **Verify all dependencies are in `package.json`:**
   ```bash
   npm install
   ```

## Step 2: Create Vercel Project

1. **Sign in to Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"

2. **Import your GitHub repository**
   - Select your SK Logic repository
   - Vercel will auto-detect it's a Next.js project
   - Click "Import"

3. **Configure Project Settings**
   - Framework Preset: Next.js (should be auto-selected)
   - Leave other settings as default
   - Click "Deploy"

## Step 3: Set Environment Variables in Vercel

1. **Go to Project Settings → Environment Variables**

2. **Add the following variables:**

   ```
   DATABASE_URL=postgresql://...   (from Railway)
   RESEND_API_KEY=your_api_key     (from Resend)
   ADMIN_EMAIL=kamarasolomon164@gmail.com
   NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593
   NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app
   ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app,http://localhost:3000
   NODE_ENV=production
   ```

3. **Important:** 
   - Click the checkbox for each variable to apply to **Production**, **Preview**, and **Development**
   - Save variables

## Step 4: Redeploy After Adding Environment Variables

1. **Go to Deployments tab**
2. **Click the three dots on the latest deployment**
3. **Select "Redeploy"**
4. **Confirm redeploy**

This ensures Prisma client is regenerated with database connection.

## Step 5: Get Your Vercel Domain

1. **Go to Project Settings → Domains**
2. **Your default domain is: `sk-logic.vercel.app`**
3. **(Optional) Add a custom domain**
   - Click "Add Domain"
   - Enter your domain (e.g., `sk-logic.com`)
   - Follow DNS configuration steps

## Step 6: Verify Deployment

1. **Test your live site:**
   - Go to https://sk-logic.vercel.app (or your custom domain)
   - Try submitting a booking form
   - Check that emails are received

2. **View build logs:**
   - Go to Deployments tab
   - Click on the deployment
   - Scroll to see build logs

3. **Monitor errors:**
   - Go to Monitoring tab
   - Check for any runtime errors

## Step 7: Configure CORS (if using separate backend)

If you're using a separate Express backend on Railway:

1. **Update `NEXT_PUBLIC_API_URL` to point to your backend:**
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.com
   ```

2. **Update `ALLOWED_ORIGINS` on both Vercel and Railway:**
   ```
   ALLOWED_ORIGINS=https://sk-logic.vercel.app,https://your-railway-backend-url.com
   ```

3. **Redeploy both services**

## Step 8: Set Up Custom Domain (Optional)

1. **Register a domain** (e.g., sk-logic.com)

2. **In Vercel:**
   - Go to Settings → Domains
   - Click "Add"
   - Enter your domain
   - Copy the nameserver records

3. **Update DNS records** in your domain registrar:
   - Add the Vercel nameserver records
   - Wait for DNS to propagate (can take 24-48 hours)

4. **Verify domain** in Vercel once DNS updates

## Continuous Deployment

Vercel automatically deploys when you push to your repository:

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Feature: add new component"
   git push origin main
   ```

2. **Vercel automatically:**
   - Detects the push
   - Builds your Next.js app
   - Runs tests (if configured)
   - Deploys to production

## Troubleshooting

### Build Fails with Prisma Error
- Ensure `DATABASE_URL` is set in environment variables
- Check that `postinstall` script is in package.json
- Redeploy after fixing

### Environment Variables Not Working
- Verify variables are set in all environments (Production, Preview, Development)
- Redeploy after adding variables
- Check variable names are correct (case-sensitive)

### Database Connection Error
- Test connection locally: `npx prisma studio`
- Verify `DATABASE_URL` is correct from Railway
- Check Railway database is running

### Email Not Sending
- Verify `RESEND_API_KEY` is correct
- Check ADMIN_EMAIL is set
- Review function logs in Vercel monitoring

### WhatsApp Link Not Working
- Verify `NEXT_PUBLIC_WHATSAPP_NUMBER` is set
- Check format: should be country code + number (e.g., 25072405593)
- Test link manually: `https://wa.me/25072405593?text=Hello`

## Performance Optimization

1. **Enable Analytics:**
   - Go to Settings → Analytics
   - View real-time performance metrics

2. **Monitor Core Web Vitals:**
   - Check Monitoring → Real User Analytics
   - Optimize images and performance

3. **Set Up Error Tracking:**
   - Go to Monitoring → Error Tracking
   - Configure alerts for critical errors

## Security Checklist

- [ ] All sensitive variables stored in Vercel (never in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] Database URL is only in Vercel environment variables
- [ ] API keys (Resend) are not exposed in frontend code
- [ ] CORS is configured to allow only your domain
- [ ] Enable 2FA on Vercel account

## Rollback Previous Deployment

If something goes wrong:

1. **Go to Deployments**
2. **Find the working deployment**
3. **Click the three dots**
4. **Select "Promote to Production"**

Your site will revert to the previous version immediately.
