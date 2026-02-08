# ⚡ Deployment Commands Cheat Sheet

## 🚀 QUICK START (Choose One)

### Option 1: Automated (Recommended)
```powershell
# Windows
.\deploy.ps1

# Mac/Linux
bash deploy.sh
```

### Option 2: Manual Steps
```bash
npm install
npm run build
vercel --prod
```

### Option 3: Test Locally First
```bash
npm install
npm run dev
# Visit: http://localhost:3000/booking
# Test: Click "Pay via WhatsApp"
```

---

## 📋 FULL DEPLOYMENT SEQUENCE

### Step 1: Prepare
```bash
# Verify Node.js version (need 20.x)
node -v

# Check npm version
npm -v

# Verify git status
git status
```

### Step 2: Clean Install
```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Verify no errors
npm list
```

### Step 3: Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Check database connection
npx prisma db push

# Run migrations
npx prisma migrate deploy

# (Optional) View database
npx prisma studio
```

### Step 4: Build
```bash
# Build for production
npm run build

# Verify build succeeded
ls .next
```

### Step 5: Test (Optional)
```bash
# Start production server
npm start

# In browser: http://localhost:3000
# Test booking → "Pay via WhatsApp"
# Ctrl+C to stop
```

### Step 6: Deploy to Vercel
```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# First time: Configure project
vercel

# Subsequent times: Deploy
vercel --prod

# View deployment
vercel ls
```

---

## 🔧 ENVIRONMENT SETUP

### Create .env.local
```bash
# In project root directory, create .env.local with:
DATABASE_URL=postgresql://user:password@host:5432/db
NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com
ADMIN_EMAIL=admin@sklogic.com
```

### Set Vercel Environment Variables
```bash
# Add to Vercel dashboard manually, or:
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER
vercel env add NEXT_PUBLIC_APP_URL
vercel env add ALLOWED_ORIGINS
vercel env add ADMIN_EMAIL

# Pull current env
vercel env pull
```

---

## 📊 TESTING COMMANDS

### Local Testing
```bash
# Run dev server
npm run dev

# Build check
npm run build

# Lint check
npm run lint

# Database check
npx prisma db push
npx prisma studio
```

### Production Testing
```bash
# Start production server
npm start

# View logs
tail -f .next/standalone/.log

# Test endpoints
curl http://localhost:3000/api/bookings
curl http://localhost:3000/api/payments/initialize
```

### Vercel Logs
```bash
# View deployment logs
vercel logs yourdomain.com

# Stream logs
vercel logs yourdomain.com --follow

# View build logs
vercel logs yourdomain.com --builds
```

---

## 🔍 DEBUGGING COMMANDS

### Check Dependencies
```bash
# List dependencies
npm list

# Check for Flutterwave (should not exist)
npm list flutterwave-node-v3

# Verify package.json
cat package.json | grep flutterwave

# Should return nothing ✅
```

### Check Build
```bash
# Build verbose mode
npm run build -- --debug

# Check build output
ls -la .next

# View build errors
cat .next/build-manifest.json
```

### Check Database
```bash
# Verify connection
npx prisma db push

# Check schema
npx prisma db pull

# View data
npx prisma studio

# Run query
npx prisma db execute --stdin < query.sql
```

### Check Environment
```bash
# List env vars (don't log in production!)
env | grep NEXT_PUBLIC

# Verify DATABASE_URL is set
echo $DATABASE_URL

# Check Node modules
du -sh node_modules
```

---

## 🛠️ CLEANUP COMMANDS

### Remove Old Build
```bash
rm -rf .next
rm -rf node_modules
rm -rf .vercel
rm package-lock.json
```

### Reset Database (Development Only!)
```bash
# WARNING: Deletes all data!
npx prisma migrate reset

# Re-seed if needed
npx prisma db seed
```

### Clear Vercel Cache
```bash
# Rebuild without cache
vercel --prod --force

# Clear project cache
vercel env pull --force
```

---

## 📱 TESTING ENDPOINTS

### Test Booking Creation
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "250792405593",
    "service": "web-dev-company",
    "amount": 100000
  }'
```

### Test Payment Initialize
```bash
curl -X POST http://localhost:3000/api/payments/initialize \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "booking_id_here",
    "amount": 100000,
    "email": "test@example.com",
    "phone": "250792405593",
    "name": "Test User",
    "service": "web-dev",
    "description": "Test payment"
  }'
```

### Test Payment Verify
```bash
curl -X POST http://localhost:3000/api/payments/verify \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "booking_id_here",
    "status": "paid"
  }'
```

---

## 🚨 TROUBLESHOOTING COMMANDS

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build

# Check Node version
node -v  # Should be 20.x

# Check npm version
npm -v   # Should be 9+
```

### Dependencies Error
```bash
# Verify package.json
grep -i flutterwave package.json  # Should be empty

# Check lock file
grep -i flutterwave package-lock.json  # Should be empty

# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Error
```bash
# Test connection
npx prisma db push

# Check schema
cat prisma/schema.prisma

# Reset database (dev only!)
npx prisma migrate reset

# View current state
npx prisma studio
```

### Deployment Error
```bash
# Check Vercel status
vercel status

# View recent logs
vercel logs yourdomain.com

# List deployments
vercel ls

# Rollback to previous
vercel rollback

# Check environment in Vercel
vercel env list
```

---

## 📈 MONITORING COMMANDS

### Monitor Deployments
```bash
# Watch deployment progress
vercel logs yourdomain.com --follow

# Check current status
vercel inspect yourdomain.com

# List all deployments
vercel ls

# Get deployment info
vercel inspect deployment_url
```

### Monitor Database
```bash
# Connect to database
psql $DATABASE_URL

# Count bookings
SELECT COUNT(*) FROM "ServiceBooking";

# Recent bookings
SELECT * FROM "ServiceBooking" ORDER BY "createdAt" DESC LIMIT 5;

# Payment status
SELECT "paymentStatus", COUNT(*) FROM "ServiceBooking" GROUP BY "paymentStatus";
```

### Monitor Application
```bash
# Check uptime
curl -I https://yourdomain.com

# Check health endpoint
curl https://yourdomain.com/api/health

# Check all pages
for path in "/" "/booking" "/contact" "/admin/dashboard"
do
  curl -I "https://yourdomain.com$path"
done
```

---

## 🔐 SECURITY COMMANDS

### Check for Secrets
```bash
# Verify no API keys in code
grep -r "sk_" app/
grep -r "pk_" app/
grep -r "FLUTTERWAVE" app/

# Should return nothing

# Check .env files
ls -la | grep env
cat .env.local  # NEVER commit this!
```

### Verify HTTPS
```bash
# Test SSL certificate
openssl s_client -connect yourdomain.com:443

# Check certificate expiry
curl -I https://yourdomain.com | grep -i date

# Test TLS version
curl -I --tlsv1.2 https://yourdomain.com
```

---

## 📋 CHECKLISTS

### Pre-Deployment
- [ ] `node -v` returns 20.x or higher
- [ ] `.env.local` exists with all variables
- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds
- [ ] `npx prisma migrate deploy` succeeds
- [ ] No `flutterwave` in `package.json`
- [ ] No `flutterwave` in code

### Deployment
- [ ] Vercel account created
- [ ] Environment variables set in Vercel
- [ ] `vercel --prod` succeeds
- [ ] Deployment shows "Ready"
- [ ] Domain pointing to Vercel
- [ ] HTTPS working

### Post-Deployment
- [ ] Website loads: `https://yourdomain.com`
- [ ] Booking page works: `/booking`
- [ ] WhatsApp links generate
- [ ] Database accessible
- [ ] Admin dashboard works
- [ ] Monitoring/logs active

---

## 🎯 COMMON SCENARIOS

### Scenario 1: First Time Deploy
```bash
npm install
npx prisma migrate deploy
npm run build
vercel --prod
```

### Scenario 2: Update Code
```bash
git pull
npm install
npm run build
git push  # Vercel auto-deploys
```

### Scenario 3: Fix Bug & Redeploy
```bash
# Make code changes
npm run build  # Test build
vercel --prod  # Deploy fix
```

### Scenario 4: Update Environment Variable
```bash
vercel env add NEW_VARIABLE value
# Or manually in Vercel dashboard
# Then redeploy:
vercel --prod
```

### Scenario 5: Database Update
```bash
npx prisma migrate dev --name change_description
# Review and commit:
git add prisma/migrations
git commit -m "Add migration"
git push
npx prisma migrate deploy  # On production
```

---

## 📞 QUICK REFERENCE

| Need | Command |
|------|---------|
| Install dependencies | `npm install` |
| Run locally | `npm run dev` |
| Build | `npm run build` |
| Test build | `npm start` |
| Deploy | `vercel --prod` |
| View logs | `vercel logs yourdomain.com` |
| Database UI | `npx prisma studio` |
| Database shell | `psql $DATABASE_URL` |
| Check version | `npm -v`, `node -v` |
| Clean everything | `rm -rf node_modules .next .vercel && npm install` |

---

**Bookmark this page for quick access!**

Last Updated: January 24, 2026
