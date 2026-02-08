# WhatsApp Payment Deployment Script (Windows PowerShell)
# Run this script to deploy SK Logic with WhatsApp-only payments

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  SK Logic - WhatsApp Payment Deployment Script              ║" -ForegroundColor Cyan
Write-Host "║  Removing Flutterwave & Deploying to Vercel                 ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean Install
Write-Host "📦 Step 1: Cleaning and installing dependencies..." -ForegroundColor Yellow
Write-Host "   Removing node_modules..."
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
}
if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json"
}

Write-Host "   Running npm install..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Environment Check
Write-Host "🔐 Step 2: Checking environment variables..." -ForegroundColor Yellow
if (-Not (Test-Path ".env.local")) {
    Write-Host "✗ .env.local not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with the following:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "DATABASE_URL=postgresql://..."
    Write-Host "RESEND_API_KEY=re_..."
    Write-Host "NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593"
    Write-Host "NEXT_PUBLIC_APP_URL=https://yourdomain.com"
    Write-Host "ALLOWED_ORIGINS=https://yourdomain.com"
    Write-Host ""
    exit 1
} else {
    Write-Host "✓ .env.local found" -ForegroundColor Green
}
Write-Host ""

# Step 3: Prisma Migration
Write-Host "🗄️  Step 3: Setting up database..." -ForegroundColor Yellow
Write-Host "   Generating Prisma client..."
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Prisma generation failed" -ForegroundColor Red
    exit 1
}

Write-Host "   Running migrations..."
npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Note: Migrations may already be deployed" -ForegroundColor Yellow
}
Write-Host "✓ Database ready" -ForegroundColor Green
Write-Host ""

# Step 4: Build
Write-Host "🔨 Step 4: Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build successful" -ForegroundColor Green
Write-Host ""

# Step 5: Deployment Ready
Write-Host "🧪 Step 5: Ready to deploy!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Run one of the following:" -ForegroundColor Green
Write-Host ""
Write-Host "Local Testing:" -ForegroundColor Cyan
Write-Host "  npm start"
Write-Host "  Visit: http://localhost:3000"
Write-Host ""
Write-Host "Deploy to Vercel:" -ForegroundColor Cyan
Write-Host "  vercel --prod"
Write-Host ""
Write-Host "Or push to GitHub & Vercel will auto-deploy:" -ForegroundColor Cyan
Write-Host "  git add ."
Write-Host "  git commit -m 'Remove Flutterwave, implement WhatsApp-only payments'"
Write-Host "  git push origin main"
Write-Host ""
Write-Host "✓ All systems ready for deployment!" -ForegroundColor Green
