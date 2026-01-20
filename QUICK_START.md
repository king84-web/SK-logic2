# Quick Start Reference - SK Logic

This is your quick reference guide for common tasks.

## 🚀 Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 📦 Install New Dependency

```bash
npm install package-name
```

## 🗄️ Database Operations

### View Database (Prisma Studio)
```bash
npx prisma studio
```
Opens UI at http://localhost:5555

### Push Schema Changes
```bash
npx prisma db push
```

### Generate Prisma Client
```bash
npx prisma generate
```

### Reset Database (Warning: Deletes all data)
```bash
npx prisma db push --force-reset
```

## 🛠️ Build & Test

### Build for Production
```bash
npm run build
```

### Run Production Build Locally
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## 🚀 Deploy to Vercel

### First Time Setup
1. Push to GitHub:
```bash
git add .
git commit -m "message"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables
5. Deploy

### After Making Changes
```bash
git add .
git commit -m "fix: description"
git push origin main
# Vercel auto-deploys!
```

## 🔑 Environment Variables

### Create Local File
```bash
cp .env.example .env.local
```

### Required Variables
```env
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Set in Vercel
1. Project Settings → Environment Variables
2. Add each variable
3. Apply to all environments
4. Redeploy

## 📧 Test Email Locally

1. Set `RESEND_API_KEY` in `.env.local`
2. Submit booking form at http://localhost:3000/booking
3. Check your inbox (and spam folder)

## 🐛 Debug

### Check Server Logs
```bash
npm run dev
# Logs appear in terminal
```

### Check Database
```bash
npx prisma studio
# View and edit records
```

### Check Vercel Logs
1. Go to [vercel.com](https://vercel.com)
2. Project → Deployments
3. Click deployment → Logs

### Check Email Logs
1. Go to [resend.com](https://resend.com) dashboard
2. Click Activity
3. See all sent emails

## 📊 Test API Endpoint

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "25072405593",
    "service": "Web Development"
  }'
```

## 🔄 Update Database Schema

1. Edit `prisma/schema.prisma`
2. Run:
```bash
npx prisma db push
```
3. Prisma studio updates automatically

## 💾 Common Files to Edit

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page content |
| `app/booking/page.tsx` | Booking page |
| `components/BookingForm.tsx` | Booking form |
| `lib/email.ts` | Email templates |
| `prisma/schema.prisma` | Database schema |
| `.env.example` | Environment variables template |

## 🚨 Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Reset Next.js cache
rm -rf .next
npm run build

# Check Node version
node --version

# Check npm version
npm --version

# Test database connection
npx prisma db execute --stdin < query.sql
```

## 📚 Documentation

- [README.md](README.md) - Main documentation
- [VERCEL_SETUP.md](VERCEL_SETUP.md) - Deploy to Vercel
- [RAILWAY_SETUP.md](RAILWAY_SETUP.md) - Database setup
- [RESEND_SETUP.md](RESEND_SETUP.md) - Email setup
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing procedures
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre-launch checklist

## 🌐 Live Endpoints

### Local Development
- Frontend: http://localhost:3000
- Prisma Studio: http://localhost:5555

### Production (Vercel)
- Frontend: https://sk-logic.vercel.app
- API: https://sk-logic.vercel.app/api/*

### Database (Railway)
- Managed through Vercel environment variables
- Access via Prisma Studio

## 👤 Your Contact Info

- **Email**: kamarasolomon164@gmail.com
- **WhatsApp**: +25072405593
- **Location**: Rwanda, Musanze

## 📞 External Services

| Service | URL | Account |
|---------|-----|---------|
| Vercel | https://vercel.com | Link GitHub |
| Railway | https://railway.app | Link GitHub |
| Resend | https://resend.com | Create API key |
| GitHub | https://github.com | Push code here |

## 💡 Pro Tips

1. **Always test locally first**
   ```bash
   npm run dev
   # Test, then deploy
   git push origin main
   ```

2. **Check Prisma Studio before supporting users**
   ```bash
   npx prisma studio
   # Verify data is saved
   ```

3. **Monitor production errors daily**
   - Vercel Monitoring tab
   - Resend Activity
   - Check email spam folder

4. **Keep `.env.local` private**
   - Never commit it
   - Never share it
   - Regenerate keys if exposed

5. **Backup important data**
   - Railway auto-backups (enabled)
   - Manually export if needed

## 🎯 Your Next Steps

1. **Set up locally** → `npm install && npm run dev`
2. **Configure database** → Railway PostgreSQL
3. **Set up email** → Resend API key
4. **Test everything** → Booking form submission
5. **Deploy to Vercel** → Connect GitHub
6. **Configure domain** → (Optional) sk-logic.com
7. **Monitor & maintain** → Check logs daily

## 🎉 You're All Set!

Your website is complete with:
- ✅ Database (PostgreSQL on Railway)
- ✅ Email notifications (Resend)
- ✅ WhatsApp integration
- ✅ Booking & contact forms
- ✅ Academy enrollment
- ✅ Responsive design
- ✅ Deployment ready

Start with: `npm run dev`

Good luck! 🚀
