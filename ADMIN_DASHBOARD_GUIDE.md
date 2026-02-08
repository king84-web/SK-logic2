# SK Logic Admin Dashboard - Complete Setup Guide

## Overview
A modern, secure admin dashboard for SK Logic website with glass-morphism design, real-time updates, and comprehensive content management capabilities.

## ✅ What's Included

### 1. **Authentication System**
- Secure login page with glass-morphism design
- Session-based authentication using localStorage
- Protected routes with automatic redirection
- Logout functionality

**Access:**
- Login Route: `/admin/login`
- Dashboard Route: `/admin/dashboard`
- Demo Credentials: `admin` / `admin123`

### 2. **Hero Button on Home Page**
- "Admin Login" button added to Hero section near footer
- Visible in development mode (`localhost`)
- Purple-themed, discrete styling
- Uses Lucide-react Lock icon

### 3. **Dashboard Features**

#### **Sidebar Navigation**
- Modern sidebar with icon-based navigation
- Smooth hover animations with Framer Motion
- Quick access to all admin sections
- Logout button with red accent

#### **Stats Overview**
- Total Bookings count
- Paid Bookings count
- Pending WhatsApp Verifications
- Site Visits tracking
- Animated stat cards with gradient backgrounds
- Real-time data fetching

#### **Booking Management**
- Complete table view of all service bookings
- Payment status badges (Paid/Unpaid/Failed)
- Manual payment verification system
- Update payment status from "unpaid" → "paid" directly
- Expandable rows for detailed information
- Customer details (name, email, phone)
- Service information
- Payment amounts in RWF currency

#### **Live CMS (Content Editor)**
Three main sections:

1. **Hero Section Editor**
   - Change H1 title
   - Update subtext/subtitle
   - Change main hero image URL
   - Live preview
   - Form validation

2. **Services Management**
   - Add new services via CRUD interface
   - Service name, description, and pricing
   - Delete services
   - Real-time updates

3. **Academy/Pricing Editor**
   - Update course information
   - Manage pricing and descriptions
   - Course-by-course editing

#### **Gallery Management**
- Placeholder for future gallery uploads
- Reserved tab in sidebar

#### **Settings Panel**
- Site Name configuration
- Site Email configuration
- Maintenance Mode toggle
- Analytics tracking toggle
- Database connection information
- Settings persistence to database

### 4. **Tech Stack**
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with glass-morphism effects
- **Form Management**: React Hook Form
- **Icons**: Lucide-react
- **Animations**: Framer Motion
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: Custom session-based auth

### 5. **API Routes Created**

```
/api/admin/login                    # Authentication
/api/admin/stats                    # Dashboard statistics
/api/admin/bookings                 # Get/manage bookings
/api/admin/bookings/[id]            # Update specific booking
/api/admin/content/hero             # Hero section content
/api/admin/content/services         # Services CRUD
/api/admin/content/services/[id]    # Delete specific service
/api/admin/content/academy          # Academy content
/api/admin/settings                 # Admin settings
```

### 6. **Database Models Added**

```prisma
HeroContent       # Store hero section customization
Service          # Dynamic service listings
AcademyContent   # Course information
AdminSettings    # Site-wide settings
```

## 🚀 Quick Start

### Installation
```bash
npm install
npm run build
npx prisma migrate dev
npm run dev
```

### Access Admin Dashboard
1. Go to home page (`http://localhost:3000`)
2. Click "Admin Login" button (visible in development)
3. Login with credentials:
   - Username: `admin`
   - Password: `admin123`
4. You'll be redirected to `/admin/dashboard`

### Update Password (Optional)
Edit `.env.local`:
```
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

## 🔒 Security Notes

- Credentials validation happens server-side
- Session tokens stored in localStorage (24-hour expiry)
- Protected routes prevent unauthorized access
- Automatic logout on session expiration
- Environment variables for sensitive data

## 📱 Features in Detail

### Payment Verification Workflow
1. View all bookings in the **Bookings** tab
2. Click the eye icon on a booking row
3. Modal appears with payment status dropdown
4. Select "Paid" and click "Update"
5. Database updates immediately
6. Frontend refreshes automatically

### Content Editing Workflow
1. Navigate to **Content Editor** tab
2. Choose section (Hero/Services/Academy)
3. Make changes using form inputs
4. Click "Save Changes"
5. Data persists to database
6. Frontend updates with `router.refresh()`

### Stats Dashboard
- Real-time booking count updates
- Payment status breakdown
- Site visit analytics
- Visual cards with smooth animations

## 🎨 Design System

### Color Scheme
- Primary: Blue (`#2563eb`)
- Success: Green (`#10b981`)
- Warning: Yellow (`#f59e0b`)
- Danger: Red (`#ef4444`)
- Accent: Purple (`#a855f7`)
- Background: Dark slate (`#0f172a` to `#1e293b`)

### Components
- Glass-morphism cards with 10% opacity
- Border: White/10% for subtle depth
- Smooth transitions and hover states
- Consistent spacing and typography

## 📊 Future Enhancements

1. **Gallery Management**
   - Image upload functionality
   - Drag-and-drop reordering
   - Gallery preview

2. **Advanced Analytics**
   - User behavior tracking
   - Conversion metrics
   - Payment analytics

3. **Email Templates**
   - Custom email editor
   - Booking confirmation templates
   - Notification customization

4. **User Management**
   - Multiple admin accounts
   - Role-based access control
   - Activity logging

5. **Database Backups**
   - Automated backup scheduling
   - One-click restore
   - Data export tools

## 🛠️ Environment Variables Required

```env
DATABASE_URL=your_railway_postgres_url
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
NODE_ENV=development
```

## 📝 File Structure

```
app/
├── admin/
│   ├── login/page.tsx           # Login page
│   └── dashboard/page.tsx        # Main dashboard
├── api/admin/
│   ├── login/route.ts
│   ├── stats/route.ts
│   ├── bookings/
│   │   └── [id]/route.ts
│   ├── content/
│   │   ├── hero/route.ts
│   │   ├── services/[id]/route.ts
│   │   └── academy/route.ts
│   └── settings/route.ts
├── layout.tsx                   # Added AdminProvider

frontend/components/
├── AdminSidebar.tsx            # Navigation sidebar
├── AdminStatsOverview.tsx       # Stats cards
├── BookingManagement.tsx        # Bookings table
├── ContentEditor.tsx            # CMS editor
└── SettingsPanel.tsx            # Settings page

lib/
├── auth.ts                      # Authentication utilities
├── admin-context.tsx            # React Context for auth
└── protected-admin-route.tsx    # Route protection component

prisma/
└── schema.prisma               # Updated with new models
```

## 🔧 Customization

### Change Admin Credentials
Update in `lib/auth.ts`:
```typescript
const ADMIN_PASSWORD = 'your_password'
const ADMIN_USERNAME = 'your_username'
```

### Modify Session Duration
In `lib/admin-context.tsx`:
```typescript
const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // Change 24 to desired hours
```

### Customize Colors
Update Tailwind classes in component files:
```tsx
// Example: Change primary color from blue to purple
className="bg-purple-600 hover:bg-purple-700"
```

## ✨ Key Features Recap

✅ Glass-morphism UI with Tailwind CSS
✅ Framer Motion animations
✅ React Hook Form for all inputs
✅ Lucide-react icons throughout
✅ Real-time database updates with Prisma
✅ Protected admin routes
✅ Responsive design (mobile-friendly sidebar)
✅ Dark mode by default
✅ Login button in Hero section (dev mode)
✅ Comprehensive booking management
✅ Live content editing without code
✅ Stats and analytics dashboard
✅ Settings management
✅ Session-based authentication

## 🐛 Troubleshooting

**Cannot see Admin Login button:**
- Must be in development mode (`localhost` or `127.0.0.1`)
- Check `isDevMode` detection in `Hero.tsx`

**Login fails:**
- Verify credentials in `lib/auth.ts`
- Check `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`

**Database errors:**
- Run `npx prisma migrate dev` to sync schema
- Check `DATABASE_URL` is correct
- Ensure PostgreSQL is connected

**Components not rendering:**
- Clear `.next` folder
- Run `npm run build` again
- Check for TypeScript errors with `npm run lint`

## 📞 Support

For issues or customizations:
1. Check the database connection
2. Verify all environment variables
3. Review console logs for error messages
4. Ensure Prisma migrations are up to date

---

**Admin Dashboard v1.0** | SK Logic | Built with Next.js 14, Tailwind CSS & Framer Motion
