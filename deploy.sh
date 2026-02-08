#!/bin/bash
# WhatsApp Payment Deployment Script
# Run this script to deploy SK Logic with WhatsApp-only payments

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  SK Logic - WhatsApp Payment Deployment Script              ║"
echo "║  Removing Flutterwave & Deploying to Vercel                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean Install
echo -e "${YELLOW}📦 Step 1: Cleaning and installing dependencies...${NC}"
rm -rf node_modules package-lock.json
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi
echo ""

# Step 2: Environment Check
echo -e "${YELLOW}🔐 Step 2: Checking environment variables...${NC}"
if [ ! -f .env.local ]; then
    echo -e "${RED}✗ .env.local not found!${NC}"
    echo "Please create .env.local with the following:"
    echo ""
    echo "DATABASE_URL=postgresql://..."
    echo "RESEND_API_KEY=re_..."
    echo "NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593"
    echo "NEXT_PUBLIC_APP_URL=https://yourdomain.com"
    echo "ALLOWED_ORIGINS=https://yourdomain.com"
    echo ""
    exit 1
else
    echo -e "${GREEN}✓ .env.local found${NC}"
fi
echo ""

# Step 3: Prisma Migration
echo -e "${YELLOW}🗄️  Step 3: Setting up database...${NC}"
npx prisma generate
npx prisma migrate deploy
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database ready${NC}"
else
    echo -e "${RED}✗ Database migration failed${NC}"
    exit 1
fi
echo ""

# Step 4: Build
echo -e "${YELLOW}🔨 Step 4: Building application...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# Step 5: Local Test (optional)
echo -e "${YELLOW}🧪 Step 5: Ready to deploy!${NC}"
echo "Run one of the following:"
echo ""
echo -e "${GREEN}Local Testing:${NC}"
echo "  npm start"
echo "  Visit: http://localhost:3000"
echo ""
echo -e "${GREEN}Deploy to Vercel:${NC}"
echo "  vercel --prod"
echo ""
echo -e "${GREEN}Or push to GitHub & Vercel will auto-deploy:${NC}"
echo "  git add ."
echo "  git commit -m 'Remove Flutterwave, implement WhatsApp-only payments'"
echo "  git push origin main"
echo ""

echo -e "${GREEN}✓ All systems ready for deployment!${NC}"
