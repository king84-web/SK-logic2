# 🚀 QUICK START - Deploy in 5 Minutes

## Option 1️⃣: Automated Deployment (Recommended)

### Windows Users:
```powershell
# Run this in PowerShell
.\deploy.ps1
```

### Mac/Linux Users:
```bash
# Run this in Terminal
bash deploy.sh
```

**The script will:**
1. ✅ Clean install dependencies
2. ✅ Check environment setup
3. ✅ Setup database
4. ✅ Build application
5. ✅ Show deployment options

---

## Option 2️⃣: Manual Quick Deploy

```bash
# Step 1: Install (30 seconds)
npm install

# Step 2: Build (1-2 minutes)
npm run build

# Step 3: Deploy to Vercel (1 minute)
vercel --prod
```

---

## Option 3️⃣: Test Locally First

```bash
# Install
npm install

# Run development server
npm run dev

# Open browser
# Visit: http://localhost:3000/booking
# Test: Click "Pay via WhatsApp"
# Should open WhatsApp with pre-filled message

# All works? Then deploy:
npm run build
vercel --prod
```

---

## ✅ Before You Run Any Command

Make sure you have `.env.local` file with:

```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Can't find it?** Create `.env.local` in project root with above values.

---

## 🎯 What Happens During Deployment

```
1. Dependencies installed
2. Database migrations run  
3. Application built
4. Deployed to Vercel
5. Your domain is live!
```

**Time: ~5 minutes**

---

## 📱 Test the Deployment

Once live, test these:

1. **Go to booking page:** `https://yourdomain.com/booking`
2. **Fill form:** Name, Email, Phone, Date
3. **Enter amount:** e.g., 50000
4. **Click button:** "Pay via WhatsApp"
5. **WhatsApp opens:** With pre-filled message

✅ **Success!** Payment flow works

---

## 🚨 Troubleshooting

| Problem | Fix |
|---------|-----|
| npm install fails | Delete `node_modules` then `npm install` again |
| Build fails | Check Node version: `node -v` (need 20.x) |
| Database error | Check `DATABASE_URL` in `.env.local` |
| WhatsApp not opening | Verify `NEXT_PUBLIC_WHATSAPP_NUMBER` = 25072405593 |
| Vercel deployment fails | Check environment variables in Vercel dashboard |

---

## 📞 Need Help?

1. **Check logs:** `vercel logs yourdomain.com`
2. **Read full guide:** See `WHATSAPP_PAYMENT_DEPLOYMENT.md`
3. **Test locally:** `npm run dev`
4. **Reset everything:** Delete `node_modules`, `.next`, run `npm install` again

---

## 🎉 Done!

Your site is now live with WhatsApp-only payments!

**Next:** Monitor bookings and payments from WhatsApp Business account.

---

## 📊 Command Reference

```bash
# Testing
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start           # Start production server

# Database
npx prisma studio  # View/edit database
npx prisma generate # Generate Prisma client
npx prisma migrate deploy # Run migrations

# Deployment
vercel --prod       # Deploy to Vercel
vercel logs         # View deployment logs

# Cleanup
rm -rf node_modules        # Remove dependencies
rm package-lock.json       # Remove lock file
rm -rf .next              # Remove build cache
```

---

**Status:** ✅ Ready to go!
**Time to deploy:** ⏱️ 5 minutes
**Difficulty:** 🟢 Easy
