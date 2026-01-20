# SK Logic - Quick Start Guide 🚀

## Welcome Solomon Kamara!

Your SK Logic website is now fully configured with your personal information. This guide shows you how to use and maintain your site.

---

## 📋 Your Information (Currently Set)

**Owner Information:**
- Name: Solomon Kamara
- Email: solomon.kamara@sklogic.rw
- Phone: +250 792 405 593
- WhatsApp: +250 792 405 593
- Location: Musanze, Northern Province, Rwanda

**Company:**
- Name: SK Logic
- Tagline: "Think logically, Build digital"

**Website:**
- URL: (deploy to Vercel)
- Database: PostgreSQL (via Railway)
- Email Service: Resend

---

## 🎯 How to Update Your Information

### Update Company Name or Tagline
```typescript
// File: lib/config.ts
export const SITE_CONFIG = {
  company: {
    name: 'SK Logic',  // Change here
    tagline: 'New tagline',  // Change here
  }
}
```

### Update Your Contact Information
```typescript
// File: lib/config.ts
owner: {
  name: 'Solomon Kamara',  // Change here
  email: 'solomon.kamara@sklogic.rw',  // Change here
  phone: '+250 792 405 593',  // Change here
}
```

### Update Your Location
```typescript
// File: lib/config.ts
location: {
  city: 'Musanze',  // Change here
  region: 'Northern Province',  // Change here
  country: 'Rwanda',  // Change here
  fullAddress: 'Musanze, Northern Province, Rwanda',  // Update this too
}
```

### Update Social Media Links
```typescript
// File: lib/config.ts
social: {
  email: 'solomon.kamara@sklogic.rw',  // Change here
  whatsapp: '+250 792 405 593',  // Change here
  instagram: '@yourprofile',  // Add here
  twitter: '@yourprofile',  // Add here
  linkedin: 'your-profile',  // Add here
}
```

---

## 📱 How Each Page Uses Your Information

### 1. Home Page (/)
- Shows your company name in navigation
- Displays your logo
- Shows your hero banner image
- CTA buttons link to booking and academy

### 2. Navigation Bar
- Shows "SK Logic" logo
- Links to all pages
- Displays in all pages

### 3. Footer
- Shows your name (Solomon Kamara)
- Shows contact email (solomon.kamara@sklogic.rw)
- Shows WhatsApp link
- Shows your location
- Shows copyright

### 4. Contact Page (/contact)
- Display your contact information
- Shows your phone number
- Shows your email
- Shows your location
- Contact form sends to your email

### 5. Booking Page (/booking)
- Service booking form
- WhatsApp pre-filled message links to your number
- Booking emails sent to your address

### 6. Academy Page (/academy)
- Shows your academy name
- Lists all your courses
- Enrollment form sends to your email

---

## 🖼️ How to Change Your Images

### Current Images Used:
1. **Logo**: `/images/photo-1520583457224-aee11bad5112.avif`
2. **Hero Banner**: `/images/premium_photo-1678565869434-c81195861939.avif`

### Update Images:
```typescript
// File: lib/config.ts
images: {
  logo: '/images/your-logo.png',  // Change logo here
  hero: '/images/your-hero.jpg',  // Change hero image here
}
```

### Steps to Add New Image:
1. Save image to `/public/images/` folder
2. Update the path in `lib/config.ts`
3. All pages automatically update!

---

## 📧 Email Integration

Your emails are configured with:
- **Provider**: Resend
- **Admin Email**: solomon.kamara@sklogic.rw
- **Admin Name**: Solomon Kamara

### When Emails Send:
1. **Contact Form** → Sent to your email with visitor message
2. **Booking Form** → Sent to your email with booking details
3. **Academy Enrollment** → Sent to your email with course enrollment

### To Update Email:
```typescript
// File: lib/config.ts
owner: {
  email: 'your-new-email@example.com',
}

// File: .env.local
ADMIN_EMAIL=your-new-email@example.com
```

---

## 💬 WhatsApp Integration

When people click "Chat on WhatsApp", they go to:
```
https://wa.me/250792405593?text=I%20want%20to%20book%20${service}
```

### Update WhatsApp Number:
```typescript
// File: lib/config.ts
contact: {
  whatsapp: '+250 NEW_NUMBER',  // Change here
}

// File: .env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=250NEWNUMBER
```

---

## 🎓 How to Add More Services

### Current Services in config:
- Web Development
- Mobile App Development
- Technical Support
- Digital Marketing
- Network Management
- Data Recovery

### Add a New Service:
```typescript
// File: lib/config.ts
services: {
  webDevelopment: {
    items: [
      // ... existing services ...
      {
        title: 'New Service Name',
        price: 'Custom Quote',
        description: 'Service description'
      }
    ]
  }
}
```

---

## 📚 How to Add More Courses

### Current Courses in config:
1. Mobile Decoding Mastery
2. Wi-Fi Management Pro
3. Social Media Growth Strategies
4. Full-Stack Web Development

### Add a New Course:
```typescript
// File: lib/config.ts
academy: {
  courses: [
    // ... existing courses ...
    {
      title: 'New Course Title',
      description: 'What students will learn',
      duration: '8 weeks',
      level: 'Beginner',
      price: 'Custom Quote'
    }
  ]
}
```

---

## 🔧 Common Tasks

### Task 1: Change Your Email Address
```
1. Open: lib/config.ts
2. Find: owner.email
3. Change to: your-new-email@example.com
4. Also update: .env.local ADMIN_EMAIL
5. Done! All forms now send to new email
```

### Task 2: Change Your Phone Number
```
1. Open: lib/config.ts
2. Find: owner.phone and contact.whatsapp
3. Change both to: +250 NEW_NUMBER
4. Also update: .env.local NEXT_PUBLIC_WHATSAPP_NUMBER
5. Done! WhatsApp link now uses new number
```

### Task 3: Change Your Location
```
1. Open: lib/config.ts
2. Find: location
3. Update: city, region, country, fullAddress
4. Done! All pages now show new location
```

### Task 4: Change Company Name
```
1. Open: lib/config.ts
2. Find: company.name
3. Change to: "New Company Name"
4. Done! All pages now show new name
```

---

## 🚀 Deployment Steps

### Deploy to Vercel (Frontend)

1. Push code to GitHub
   ```bash
   git add .
   git commit -m "Update with Solomon Kamara info"
   git push origin main
   ```

2. Go to vercel.com and connect your repo
3. Deploy!

### Set Environment Variables in Vercel
```
DATABASE_URL = postgresql://...
RESEND_API_KEY = re_...
ADMIN_EMAIL = solomon.kamara@sklogic.rw
ADMIN_NAME = Solomon Kamara
NEXT_PUBLIC_WHATSAPP_NUMBER = 250792405593
```

---

## 💾 Local Development

### Run Locally:
```bash
npm install
npm run dev
```

Visit: http://localhost:3000

### Database:
```bash
npx prisma migrate dev
npx prisma studio
```

---

## 📞 Support

If you need to:
- **Change info**: Edit `lib/config.ts`
- **Change design**: Edit component files in `components/`
- **Add features**: Create new components or pages
- **Debug**: Check error messages and logs

---

## ✅ Checklist Before Launch

- [x] Your name updated (Solomon Kamara)
- [x] Your email updated (solomon.kamara@sklogic.rw)
- [x] Your phone updated (+250 792 405 593)
- [x] Your location updated (Musanze, Rwanda)
- [x] Images uploaded and configured
- [x] Services customized
- [x] Courses customized
- [x] Email service configured (Resend)
- [x] Database configured (PostgreSQL via Railway)
- [x] Environment variables set
- [ ] Deploy to Vercel
- [ ] Test all forms
- [ ] Test email sending
- [ ] Test WhatsApp links
- [ ] Test on mobile devices
- [ ] Check all pages load
- [ ] Verify all links work

---

## 🎉 You're All Set!

Your website is now:
✅ Fully personalized with your information
✅ Using best practices configuration system
✅ Ready for customers to contact you
✅ Ready for email notifications
✅ Ready for deployment
✅ Professional and maintainable

---

**Need to make changes?** Edit `lib/config.ts` and all pages update automatically!

**Have questions?** Check the documentation files:
- FOLDER_STRUCTURE.md - How files are organized
- BACKEND_SETUP.md - Database setup
- DEPLOYMENT_CHECKLIST.md - Deployment guide
- README.md - Full documentation

**Ready to launch?** See VERCEL_SETUP.md for deployment guide.

---

Good luck, Solomon! 🚀 SK Logic is ready to serve your customers!
