# SK Logic Admin System - Testing & Usage Guide

## ✅ System Status
**Development Server**: Running on http://localhost:3001
**Database**: SQLite (dev.db)
**Admin System**: FULLY FUNCTIONAL

---

## 🚀 Quick Start

### 1. Access Admin Login
- Go to http://localhost:3001 (Homepage)
- Press **Ctrl + Shift + S** to open the admin login modal
- Alternatively, navigate directly to http://localhost:3001/admin/login

### 2. Login Credentials
- **Email**: `admin@localhost` or `admin@sklogic.com`
- **Password**: `admin123`

### 3. Admin Dashboard
After successful login, you'll be redirected to http://localhost:3001/admin/dashboard

---

## 📋 Admin Dashboard Features

### Overview Tab
- Dashboard statistics and overview
- Quick stats showing bookings, enrollments, messages
- System information and status

### Content Tab (Hero Section Management)
**What it does**: Edit the main hero section that appears on the homepage

**How to use**:
1. Click "Content" in the sidebar
2. Fill in the hero section fields:
   - **Hero Title**: Main heading (e.g., "SK Logic")
   - **Hero Subtitle**: Secondary text (e.g., "Think Logically, Build Digital.")
   - **Main Image URL**: URL to hero image
3. Click "Save Changes"
4. **Changes appear instantly** on the homepage without refreshing

**Example Values**:
```
Title: "SK Logic - Digital Solutions"
Subtitle: "Transform Your Business With Technology"
Image URL: "https://via.placeholder.com/1200x600"
```

### Settings Tab (Page Appearance)
**What it does**: Control background colors, gradients, and accent colors for ALL pages

**How to use**:
1. Click "Settings" in the sidebar
2. Customize these options:

   **Page Background Color** (Tailwind gradient start)
   - Example: `from-blue-950` or `from-purple-900`
   
   **Page Background Gradient** (Full gradient)
   - Example: `from-blue-950 via-slate-900 to-purple-950`
   - Pattern: `from-[color] via-[color] to-[color]`
   
   **Accent Color** (Buttons, links, highlights)
   - Example: `blue-600`, `purple-600`, `emerald-600`, `pink-600`
   - The accent color is applied to all buttons and interactive elements
   
   **Default Text Color**
   - Example: `white`, `slate-100`, `gray-200`

3. Click "Save Settings"
4. **All pages update in real-time** (5-second refresh interval)

**Common Tailwind Color Combinations**:

*Professional Blue*:
```
Gradient: from-blue-950 via-slate-900 to-blue-950
Accent: blue-600
```

*Purple Premium*:
```
Gradient: from-purple-950 via-slate-900 to-purple-950
Accent: purple-600
```

*Green Modern*:
```
Gradient: from-emerald-950 via-slate-900 to-emerald-950
Accent: emerald-600
```

*Sunset*:
```
Gradient: from-orange-950 via-red-950 to-pink-950
Accent: pink-600
```

### Bookings Tab
- View and manage all service bookings
- Accept/Reject bookings
- Track booking status and client information

### Gallery Tab
**What it does**: Manage portfolio gallery images

**How to add images**:
1. Click "Gallery" in the sidebar
2. Fill in the form:
   - **Image URL**: Direct link to image file
   - **Title**: Name/description of the image
   - **Category**: portfolio, services, team, or general
   - **Alt Text**: Accessibility description
3. Click "Add Image"
4. Image appears in the gallery list below

**Image Management**:
- View all gallery images with thumbnails
- Hover over image cards to see delete button
- Click trash icon to remove image

**Gallery Display**:
- Images are stored in the database
- Display on the homepage updates every 5 seconds
- Currently supporting URL-based images (can upgrade to direct upload)

---

## 🎨 Changing Page Colors - Step by Step

### Scenario 1: Change Homepage Background
1. Login to admin dashboard
2. Click "Settings" tab
3. In "Page Background Gradient" field, replace the entire value with:
   ```
   from-blue-950 via-blue-900 to-slate-900
   ```
4. Click "Save Settings"
5. Go back to homepage - background is now blue!

### Scenario 2: Change All Button Colors (Accent)
1. In Settings tab
2. In "Accent Color" field, change to: `emerald-600`
3. Click "Save Settings"
4. All buttons throughout the site turn green

### Scenario 3: Full Redesign
1. **Background**: `from-red-950 via-rose-900 to-pink-950`
2. **Accent**: `pink-600`
3. **Text**: `white`
4. Click "Save Settings"
5. Entire site now has pink/red theme

---

## 🔄 Real-Time Updates

All admin changes update automatically:
- **Content changes**: Every 5 seconds
- **Settings changes**: Every 5 seconds
- **Gallery updates**: Every 5 seconds
- **No page refresh needed** - changes appear live!

The system uses:
- Global ContentProvider context
- Automatic polling every 5 seconds
- Window events for instant updates within admin

---

## 🔐 Protected Routes

The following pages are **protected** and require admin login:
- `/admin/dashboard` - Main admin dashboard
- `/admin/login` - Admin login (redirects to dashboard if already logged in)

**Authentication Flow**:
1. User attempts to access protected route
2. ProtectedAdminRoute component checks localStorage for admin token
3. If no token → redirects to /admin/login
4. After login → token saved to localStorage
5. Token persists across browser sessions until logout

---

## 📱 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl + Shift + S** | Open admin login modal (homepage only) |
| **Esc** | Close admin login modal |
| **Ctrl + L** | Logout (when in admin dashboard) |

---

## 🧪 Testing Checklist

### Login & Navigation
- [ ] Press Ctrl+Shift+S on homepage
- [ ] Verify login modal appears
- [ ] Enter email: admin@localhost
- [ ] Enter password: admin123
- [ ] Click Login
- [ ] Verify redirected to /admin/dashboard
- [ ] Verify all tabs appear in sidebar

### Content Editing
- [ ] Click "Content" tab
- [ ] Change Hero Title
- [ ] Change Hero Subtitle
- [ ] Paste image URL
- [ ] Click "Save Changes"
- [ ] Go back to homepage (new tab)
- [ ] Verify hero section updated (check within 5 seconds)

### Settings & Colors
- [ ] Click "Settings" tab
- [ ] Change "Accent Color" to `emerald-600`
- [ ] Click "Save Settings"
- [ ] Go to homepage
- [ ] Verify buttons are now green
- [ ] Return to settings
- [ ] Change "Page Background Gradient" to `from-purple-950 via-slate-900 to-purple-950`
- [ ] Click "Save Settings"
- [ ] Go to homepage
- [ ] Verify background is now purple

### Gallery Management
- [ ] Click "Gallery" tab
- [ ] Enter image URL (test URL): `https://via.placeholder.com/400x300?text=Portfolio+Item`
- [ ] Enter title: "Test Project"
- [ ] Select category: "portfolio"
- [ ] Enter alt text: "A test portfolio item"
- [ ] Click "Add Image"
- [ ] Verify image appears in gallery list
- [ ] Hover over image card
- [ ] Click trash icon
- [ ] Verify image removed from list

### Bookings
- [ ] Click "Bookings" tab
- [ ] Verify booking list appears (if any bookings exist)
- [ ] Test accept/reject actions if applicable

### Logout
- [ ] Click profile icon or logout button
- [ ] Verify redirected to homepage
- [ ] Verify admin token cleared from localStorage

---

## 🐛 Troubleshooting

### Login Modal Doesn't Appear
**Problem**: Ctrl+Shift+S doesn't open login modal
**Solution**:
1. Make sure you're on the homepage (http://localhost:3001)
2. Check browser console for errors
3. Try refreshing the page
4. Alternatively, navigate to http://localhost:3001/admin/login directly

### Changes Don't Appear
**Problem**: Modified content/settings don't show up
**Solution**:
1. Wait 5 seconds (auto-refresh interval)
2. Refresh the page manually (F5)
3. Check browser console for API errors
4. Ensure SQLite database is accessible

### Admin Dashboard Redirects to Login
**Problem**: Keep getting redirected to login after authentication
**Solution**:
1. Clear browser localStorage (Dev Tools → Application → Storage)
2. Clear all cookies for the site
3. Try logging in again
4. Check if PrismaClient can connect to database

### Colors Not Changing
**Problem**: Accent or background colors don't update
**Solution**:
1. Verify Tailwind class names are correct (e.g., `blue-600` not `blue600`)
2. Check browser console for CSS warnings
3. Make sure to include color level (e.g., `500`, `600`, `700`)
4. Wait for 5-second refresh interval to complete

---

## 📊 Database

**Database Type**: SQLite
**Location**: `./dev.db`
**Tables Created**:
- `HeroContent` - Hero section data
- `PageSettings` - Page appearance settings
- `GalleryImage` - Gallery images
- Plus existing tables: ServiceBooking, AcademyEnrollment, ContactMessage, etc.

**Direct Access**:
```bash
# Open database explorer in VS Code
# Or use SQLite extension to view/edit directly
```

---

## 🚀 Production Deployment

To deploy to production:
1. Switch DATABASE_URL to PostgreSQL
2. Update API endpoints for CORS
3. Implement proper password hashing (bcrypt)
4. Setup HTTPS/SSL certificates
5. Configure environment variables properly
6. Add rate limiting to API routes

---

## 📞 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/content/hero` | Fetch hero content |
| POST | `/api/admin/content/hero` | Update hero content |
| GET | `/api/admin/settings` | Fetch page settings |
| POST | `/api/admin/settings` | Update page settings |
| GET | `/api/admin/content/gallery` | Fetch gallery images |
| POST | `/api/admin/content/gallery` | Add gallery image |
| DELETE | `/api/admin/content/gallery/[id]` | Remove gallery image |
| POST | `/api/admin/login` | Admin login |

---

## 💾 Data Persistence

All changes are **automatically saved to SQLite database**:
- Hero content changes
- Page settings/colors
- Gallery images
- Changes persist across browser sessions
- Database backups recommended for production

---

## ✨ Features Summary

✅ **Real-time Content Management** - Update hero section instantly
✅ **Dynamic Page Styling** - Change colors globally via settings
✅ **Gallery Management** - Add/remove portfolio images
✅ **Protected Routes** - Admin dashboard only for authenticated users
✅ **Keyboard Shortcut Login** - Ctrl+Shift+S for quick access
✅ **Auto-Refresh System** - Content updates every 5 seconds across pages
✅ **No Deployments Needed** - All changes live immediately
✅ **Responsive Design** - Works on all devices
✅ **SQLite Database** - Local development ready

---

**Last Updated**: February 7, 2026  
**System Status**: ✅ FULLY OPERATIONAL
