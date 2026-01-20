# SK Logic Official Website

**Motto:** "Think logically, Build digital."

A modern, professional service-booking platform for web development, technical device services, and digital education.

## 🎯 Features

- **Service Booking Engine**: Book web development, technical services, and courses with automatic confirmation emails
- **SK Academy**: Comprehensive courses on mobile decoding, Wi-Fi management, social media growth, and full-stack development
- **Modern Design**: Dark mode, responsive, logic-focused interface
- **Contact Integration**: WhatsApp integration and contact forms with instant notifications
- **Email Automation**: Automatic confirmations and admin notifications via Resend
- **Database Persistence**: PostgreSQL with Prisma ORM for reliable data storage
- **Trust Signals**: Testimonials and verified services section

## 🏗️ Technical Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Features**: SSR, optimized images, responsive design

### Backend/API
- **Runtime**: Node.js with Next.js API Routes
- **ORM**: Prisma with PostgreSQL
- **Email Service**: Resend
- **CORS**: Configured for secure communication
- **Database**: PostgreSQL on Railway

### Infrastructure
- **Frontend**: Vercel (automatic deployments from git)
- **Database**: Railway PostgreSQL
- **Email**: Resend
- **Domain**: Custom domain support
- **HTTPS**: Automatic SSL/TLS encryption

## 📁 Project Structure

```
sk-logic/
├── app/
│   ├── api/
│   │   ├── bookings/route.ts       # Booking API
│   │   ├── contact/route.ts        # Contact form API
│   │   ├── academy/route.ts        # Academy enrollment API
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── booking/page.tsx        # Booking page
│   │   ├── academy/page.tsx        # Academy page
│   │   ├── contact/page.tsx        # Contact page
│   │   └── globals.css             # Global styles
├── components/                      # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServiceCategories.tsx
│   ├── ServiceGrid.tsx
│   ├── BookingForm.tsx             # With WhatsApp integration
│   ├── ContactForm.tsx
│   ├── AcademySection.tsx
│   ├── CourseCard.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   └── CTA.tsx
├── lib/
│   ├── db/
│   │   ├── prisma.ts               # Prisma client initialization
│   │   └── index.ts                # Database utilities
│   ├── email.ts                    # Resend email functions
│   └── whatsapp.ts                 # WhatsApp integration
├── prisma/
│   └── schema.prisma               # Database schema
├── public/images/                  # Logo and images
├── package.json                    # Dependencies with Prisma
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Environment variables template
├── TESTING_GUIDE.md                # Complete testing guide
├── VERCEL_SETUP.md                 # Vercel deployment guide
├── RAILWAY_SETUP.md                # Railway database setup
├── RESEND_SETUP.md                 # Email service setup
└── README.md                       # This file
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL running (local or use Railway)
- Resend account (for email testing)
- Environment variables configured

### Installation & Setup

1. **Clone and install:**
```bash
cd "sk logic"
npm install
```

2. **Create `.env.local` from template:**
```bash
cp .env.example .env.local
```

3. **Configure environment variables** in `.env.local`:
```bash
# Database (Railway PostgreSQL connection string)
DATABASE_URL=postgresql://user:password@host:5432/db_name

# Email (get from Resend dashboard)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=kamarasolomon164@gmail.com

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=25072405593

# Other
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

4. **Push database schema:**
```bash
npx prisma db push
```

5. **View database (optional):**
```bash
npx prisma studio
```

6. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📊 API Endpoints

### POST `/api/bookings`
- **Description**: Submit a service booking
- **Body**: `{ name, email, phone, service, date?, message? }`
- **Response**: `{ message, id, booking }`
- **Triggers**: Booking confirmation email to customer & admin

### POST `/api/contact`
- **Description**: Submit a contact message
- **Body**: `{ name, email, subject, message }`
- **Response**: `{ message, id }`
- **Triggers**: Confirmation email to customer & admin

### POST `/api/academy`
- **Description**: Enroll in a course
- **Body**: `{ name, email, phone, course }`
- **Response**: `{ message, id, enrollment }`
- **Triggers**: Welcome email to student & enrollment notification to admin

## 🔧 Deployment Guide

### Step 1: Set Up Railway Database

See [RAILWAY_SETUP.md](RAILWAY_SETUP.md) for detailed instructions:

1. Create Railway account
2. Create PostgreSQL database
3. Get `DATABASE_URL`
4. Save credentials securely

### Step 2: Set Up Resend Email Service

See [RESEND_SETUP.md](RESEND_SETUP.md) for detailed instructions:

1. Create Resend account
2. Create project
3. Get API key
4. Verify domain (optional)

### Step 3: Deploy to Vercel

See [VERCEL_SETUP.md](VERCEL_SETUP.md) for detailed instructions:

1. Push code to GitHub
2. Create Vercel project
3. Add environment variables
4. Deploy automatically
5. Configure custom domain (optional)

### Step 4: Test Everything

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for complete testing checklist:

```bash
# Local testing
npm run dev
# Navigate to http://localhost:3000
# Test booking, contact, and enrollment forms
# Verify emails sent
# Check database with: npx prisma studio
```

## 🔐 Environment Variables

### Required for Production
```env
DATABASE_URL=postgresql://...      # Railway PostgreSQL
RESEND_API_KEY=re_...             # Resend email API
ADMIN_EMAIL=your@email.com         # Where notifications go
NEXT_PUBLIC_WHATSAPP_NUMBER=250... # WhatsApp number
NEXT_PUBLIC_API_URL=https://...    # Your Vercel domain
NODE_ENV=production
```

### Optional
```env
ALLOWED_ORIGINS=https://domain.com,http://localhost:3000
```

⚠️ **IMPORTANT**: 
- Never commit `.env.local` to Git (add to `.gitignore`)
- Use `.env.example` for team reference
- Set all variables in Vercel dashboard
- Environment variables are different per environment

## 📧 Email System

Automated emails sent for:
1. **Service Bookings** - Confirmation to customer, notification to admin
2. **Contact Messages** - Confirmation to sender, notification to admin
3. **Course Enrollments** - Welcome to student, notification to admin

**Service**: Resend (industry-standard for transactional emails)
**Configuration**: See [RESEND_SETUP.md](RESEND_SETUP.md)

## 💬 WhatsApp Integration

- **Quick Chat Button**: On booking page to instantly chat via WhatsApp
- **Dynamic Messages**: Pre-filled with service/course name
- **Format**: `https://wa.me/{number}?text={message}`
- **Configuration**: Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in env

## 🎨 Design System

### Colors
- **Dark Background**: `#0f172a`
- **Primary Blue**: `#1e40af` / `#2563eb`
- **Secondary**: `#1e293b`
- **Success Green**: `#16a34a`
- **Error Red**: `#dc2626`

### Components
- **Buttons**: Primary (blue), Secondary, WhatsApp (green)
- **Cards**: Dark background with subtle borders
- **Forms**: Slate background with blue focus states
- **Typography**: System UI font stack, responsive sizes

## 🔄 Database Schema

### ServiceBooking
```prisma
- id: String @id
- name: String
- email: String
- phone: String
- service: String
- message: String?
- date: DateTime?
- status: String (pending, confirmed, completed, cancelled)
- createdAt: DateTime
- updatedAt: DateTime
```

### ContactMessage
```prisma
- id: String @id
- name: String
- email: String
- subject: String
- message: String
- status: String (new, read, responded)
- createdAt: DateTime
- updatedAt: DateTime
```

### AcademyEnrollment
```prisma
- id: String @id
- name: String
- email: String
- phone: String
- course: String
- status: String (enrolled, completed, cancelled)
- createdAt: DateTime
- updatedAt: DateTime
```

## 📚 Services Offered

### Web Development
- NGO Websites
- Company Websites  
- E-commerce Stores
- Real Estate Portals

### Technical Services
- Social Media Boosting
- Wi-Fi Management/Removal
- iCloud Services

### SK Academy Courses
1. **Mobile Decoding Mastery** - 8 weeks, $299
2. **Wi-Fi Management Pro** - 6 weeks, $199
3. **Social Media Growth Strategies** - 4 weeks, $149
4. **Full-Stack Web Development** - 12 weeks, $499

## ✅ Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing:

- Form submission tests
- Email verification
- Database integrity
- Error handling
- CORS validation
- Performance testing
- Production deployment test

Quick test checklist:
```bash
npm run dev
# Navigate to /booking
# Fill and submit form
# Check email received
# Check database: npx prisma studio
```

## 🚨 Troubleshooting

### Database Connection Error
```
Error: P1000 "Authentication failed"
```
→ Check `DATABASE_URL` in `.env.local`  
→ Verify Railway database is running  
→ Test with `npx prisma db push`

### Emails Not Sending
```
Error: Invalid API key
```
→ Verify `RESEND_API_KEY` from Resend dashboard  
→ Check key is set in all Vercel environments  
→ Redeploy after updating

### CORS Error
```
Error: CORS policy: no 'Access-Control-Allow-Origin' header
```
→ Verify `NEXT_PUBLIC_API_URL` matches domain  
→ Check `ALLOWED_ORIGINS` includes your domain  
→ Backend CORS should allow frontend URL

### Build Fails on Vercel
```
Build Error: Module not found
```
→ Run `npm install` locally  
→ Check `npm run build` works  
→ Verify all imports are correct

## 📖 Documentation

- [VERCEL_SETUP.md](VERCEL_SETUP.md) - Frontend deployment
- [RAILWAY_SETUP.md](RAILWAY_SETUP.md) - Database setup
- [RESEND_SETUP.md](RESEND_SETUP.md) - Email configuration
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - QA & testing
- [BACKEND_SETUP.md](BACKEND_SETUP.md) - Alternative Express backend

## 🔐 Security Best Practices

✅ Environment variables separate per environment  
✅ No API keys in code or Git  
✅ CORS whitelist configured  
✅ Input validation on all endpoints  
✅ Error messages don't expose internals  
✅ HTTPS enforced (Vercel & Railway)  
✅ Database backups automatic (Railway)  
✅ Prisma prevents SQL injection  

## 📊 Performance

- **Frontend**: Vercel Edge Network (global CDN)
- **Database**: Railway PostgreSQL (optimized indexes)
- **Images**: Next.js image optimization
- **API**: Serverless functions (Vercel)

Typical response times:
- Booking form: < 500ms
- Email send: < 2s
- Database query: < 100ms

## 🤝 Support & Contact

- **Email**: support@sklogic.com
- **WhatsApp**: +25072405593
- **Office**: Rwanda, Musanze

## 📜 License

© 2024 SK Logic. All rights reserved.

**Motto:** "Think logically, Build digital."
# SK-logic
