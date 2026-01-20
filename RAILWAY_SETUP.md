# Railway Deployment Guide

## Overview
This guide walks you through deploying your SK Logic PostgreSQL database and optional Express backend to Railway.

## Prerequisites
- Railway account (sign up at https://railway.app)
- Git repository pushed to GitHub
- Environment variables configured

## Step 1: Create a PostgreSQL Database on Railway

1. **Sign in to Railway Dashboard**
   - Go to https://dashboard.railway.app
   - Sign in or create an account

2. **Create a New Project**
   - Click "Create New Project"
   - Select "Provision PostgreSQL"
   - Wait for the database to initialize

3. **Get Database Credentials**
   - In your project, click on the PostgreSQL service
   - Click on "Variables" tab
   - Copy the `DATABASE_URL` value
   - Save this for later (you'll need it for Vercel)

## Step 2: Set Up Environment Variables in Railway

1. **In your Railway project, click "Variables"**
   - Copy the `DATABASE_URL` (this is automatically set by Railway)

2. **Add Custom Variables** (if needed)
   ```
   ADMIN_EMAIL=kamarasolomon164@gmail.com
   RESEND_API_KEY=your_resend_api_key
   NODE_ENV=production
   ```

## Step 3: Connect Your Vercel Frontend to Railway Database

1. **In Vercel Project Settings:**
   - Go to Settings → Environment Variables
   - Add the `DATABASE_URL` from Railway
   - Make sure it's added to all environments (Production, Preview, Development)

2. **Redeploy your Vercel site:**
   - This ensures Prisma schema is synced with the database

## Step 4: Push Your Database Schema (from Vercel deployment)

Your Prisma schema will be automatically pushed during the Vercel build process because of the `postinstall` script in package.json.

Alternatively, you can push it manually:

```bash
npx prisma db push
```

## Step 5: Verify Database Connection

You can test the connection using Prisma Studio:

```bash
npx prisma studio
```

This will open a UI where you can view and manage your database records.

## Monitoring Your Railway Database

1. **View Metrics:**
   - Go to your PostgreSQL service
   - Click "Metrics" to see performance data

2. **View Logs:**
   - Click "Logs" to see database activity

3. **Backup:**
   - Railway automatically creates backups
   - You can manually trigger backups in the service settings

## Troubleshooting

### Connection Issues
- Check that your `DATABASE_URL` is correct
- Ensure environment variables are set in Vercel
- Verify that the Railway database is running (check service status)

### Schema Sync Issues
- Run `npx prisma db push` in your local environment
- Check the `prisma/schema.prisma` file for syntax errors
- Review migration logs in Prisma

### Performance Issues
- Check database metrics in Railway dashboard
- Consider upgrading Railway plan if needed
- Monitor active connections and queries

## Security Best Practices

1. **Never commit `.env.local` to Git**
2. **Use strong database passwords** (Railway generates these)
3. **Limit database access** to authorized services only
4. **Enable backups** (automatic in Railway)
5. **Monitor access logs** regularly
6. **Rotate API keys** periodically
