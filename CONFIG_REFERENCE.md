# SK Logic Configuration System - Complete Reference

## Overview

The `lib/config.ts` file is the heart of your website. It contains all the information about your company, services, courses, and contact details in one organized place.

---

## 📋 What's in lib/config.ts

### 1. Company Information
```typescript
company: {
  name: 'SK Logic',
  tagline: 'Think logically, Build digital'
}
```
- Used in: Navigation, Footer, Hero
- Update when: Company name or slogan changes

### 2. Owner Information
```typescript
owner: {
  name: 'Solomon Kamara',
  email: 'solomon.kamara@sklogic.rw',
  phone: '+250 792 405 593'
}
```
- Used in: Footer, Contact page, Email signatures
- Update when: Your contact details change

### 3. Location Information
```typescript
location: {
  city: 'Musanze',
  region: 'Northern Province',
  country: 'Rwanda',
  fullAddress: 'Musanze, Northern Province, Rwanda'
}
```
- Used in: Footer, Contact page, Maps
- Update when: You relocate

### 4. Contact Methods
```typescript
contact: {
  email: 'solomon.kamara@sklogic.rw',
  phone: '+250 792 405 593',
  whatsapp: '+250 792 405 593'
}
```
- Used in: All contact links, forms
- Update when: Contact details change

### 5. Social Media
```typescript
social: {
  email: 'solomon.kamara@sklogic.rw',
  whatsapp: '+250 792 405 593',
  instagram: '',  // Add your handle
  twitter: '',    // Add your handle
  linkedin: ''    // Add your profile
}
```
- Used in: Footer, Contact page
- Update when: You add social profiles

### 6. Images
```typescript
images: {
  logo: '/images/photo-1520583457224-aee11bad5112.avif',
  hero: '/images/premium_photo-1678565869434-c81195861939.avif'
}
```
- Used in: Navigation, Hero section
- Update when: You change branding images

### 7. Navigation URLs
```typescript
urls: {
  home: '/',
  booking: '/booking',
  academy: '/academy',
  contact: '/contact'
}
```
- Used in: Navigation, CTA buttons
- Update when: You add new pages

### 8. Services
```typescript
services: {
  webDevelopment: {
    title: 'Web Development',
    items: [
      {
        title: 'Custom Website Development',
        price: 'Custom Quote',
        description: 'Professional websites...'
      },
      // More services...
    ]
  },
  mobileApp: { /* ... */ },
  technicalSupport: { /* ... */ },
  // ... more services
}
```
- Used in: Service pages, booking forms
- Update when: You add or modify services

### 9. Academy
```typescript
academy: {
  name: 'SK Academy',
  description: 'Elevate your skills with...',
  courses: [
    {
      id: 'mobile-decoding',
      title: 'Mobile Decoding Mastery',
      description: 'Learn to decode...',
      duration: '6 weeks',
      level: 'Intermediate',
      price: 'RWF 50,000',
      modules: ['Module 1', 'Module 2', ...]
    },
    // More courses...
  ]
}
```
- Used in: Academy page, enrollment forms
- Update when: You add new courses

---

## 🔧 How to Use the Config

### Example 1: Display Company Name
```typescript
// In any component:
import { SITE_CONFIG } from '@/lib/config'

export default function MyComponent() {
  return <h1>{SITE_CONFIG.company.name}</h1>
}
// Output: <h1>SK Logic</h1>
```

### Example 2: Create Email Link
```typescript
import { SITE_CONFIG } from '@/lib/config'

<a href={`mailto:${SITE_CONFIG.owner.email}`}>
  Contact: {SITE_CONFIG.owner.email}
</a>
// Output: Contact: solomon.kamara@sklogic.rw
```

### Example 3: Generate WhatsApp Link
```typescript
import { SITE_CONFIG } from '@/lib/config'

const whatsappLink = `https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/\D/g, '')}`
// Creates clickable WhatsApp link
```

### Example 4: Display Services
```typescript
import { SITE_CONFIG } from '@/lib/config'

{SITE_CONFIG.services.webDevelopment.items.map(service => (
  <ServiceCard key={service.title} {...service} />
))}
// Shows all web development services
```

### Example 5: Display Courses
```typescript
import { SITE_CONFIG } from '@/lib/config'

{SITE_CONFIG.academy.courses.map(course => (
  <CourseCard key={course.id} {...course} />
))}
// Shows all academy courses
```

---

## 📝 How to Edit Configuration

### Step 1: Find lib/config.ts
```
SK Logic/
├── lib/
│   └── config.ts  ← This file
```

### Step 2: Find the Section to Edit
```typescript
export const SITE_CONFIG = {
  company: { ... },      // Company info section
  owner: { ... },        // Owner info section
  location: { ... },     // Location section
  contact: { ... },      // Contact section
  social: { ... },       // Social media section
  images: { ... },       // Images section
  urls: { ... },         // URLs section
  services: { ... },     // Services section
  academy: { ... },      // Academy section
}
```

### Step 3: Make Your Changes
```typescript
// Before:
owner: {
  name: 'Solomon Kamara',
  email: 'solomon.kamara@sklogic.rw',
}

// After (if you change):
owner: {
  name: 'New Name',
  email: 'newemail@example.com',
}
```

### Step 4: Save File
- Ctrl+S (Windows) or Cmd+S (Mac)
- Website automatically updates!

---

## 🔄 Common Updates

### Update Email Address
```typescript
// Find:
owner: {
  email: 'solomon.kamara@sklogic.rw',
}
contact: {
  email: 'solomon.kamara@sklogic.rw',
}
social: {
  email: 'solomon.kamara@sklogic.rw',
}

// Change all three to:
email: 'newemail@example.com',
```

### Update Phone Number
```typescript
// Find:
owner: {
  phone: '+250 792 405 593',
}
contact: {
  whatsapp: '+250 792 405 593',
}
social: {
  whatsapp: '+250 792 405 593',
}

// Change all three to:
phone: '+250 NEWNUMBER',
```

### Add New Service
```typescript
// Find:
services: {
  webDevelopment: {
    items: [
      { title: 'Custom Website...', ... },
      { title: 'E-Commerce...', ... },
      // Add new one here:
      {
        title: 'Website Maintenance',
        price: 'Custom Quote',
        description: 'Keep your site updated and secure'
      }
    ]
  }
}
```

### Add New Course
```typescript
// Find:
academy: {
  courses: [
    { id: 'mobile-decoding', title: 'Mobile Decoding...', ... },
    { id: 'wifi-management', title: 'Wi-Fi Management...', ... },
    // Add new one here:
    {
      id: 'wordpress-basics',
      title: 'WordPress Basics',
      description: 'Learn to build websites with WordPress',
      duration: '4 weeks',
      level: 'Beginner',
      price: 'RWF 30,000',
      modules: [
        'WordPress Installation & Setup',
        'Creating Content',
        'Using Plugins',
        'Publishing Your Site'
      ]
    }
  ]
}
```

### Add Social Media Profile
```typescript
// Find:
social: {
  email: 'solomon.kamara@sklogic.rw',
  whatsapp: '+250 792 405 593',
  instagram: '',  // Add here
  twitter: '',    // Add here
  linkedin: ''    // Add here
}

// Change to:
social: {
  email: 'solomon.kamara@sklogic.rw',
  whatsapp: '+250 792 405 593',
  instagram: '@sklogic.rw',
  twitter: '@sklogiccompany',
  linkedin: 'sk-logic-rwanda'
}
```

---

## 📱 Files That Use Config

### Navigation Component
Uses:
- `SITE_CONFIG.company.name`
- `SITE_CONFIG.images.logo`
- `SITE_CONFIG.urls.*`

### Footer Component
Uses:
- `SITE_CONFIG.company.name`
- `SITE_CONFIG.owner.name`
- `SITE_CONFIG.owner.email`
- `SITE_CONFIG.location.*`
- `SITE_CONFIG.social.*`

### Hero Component
Uses:
- `SITE_CONFIG.company.tagline`
- `SITE_CONFIG.images.hero`

### CTA Component
Uses:
- `SITE_CONFIG.company.name`
- `SITE_CONFIG.urls.booking`
- `SITE_CONFIG.urls.academy`

### Academy Section
Uses:
- `SITE_CONFIG.academy.name`
- `SITE_CONFIG.academy.description`
- `SITE_CONFIG.academy.courses`

### Booking Form
Uses:
- `SITE_CONFIG.services.*`
- `SITE_CONFIG.contact.whatsapp`

### Contact Page
Uses:
- `SITE_CONFIG.owner.*`
- `SITE_CONFIG.contact.*`
- `SITE_CONFIG.location.*`

---

## 🎯 Best Practices

### DO:
- ✅ Use SITE_CONFIG for all repeated information
- ✅ Import config at top of component
- ✅ Update config when information changes
- ✅ Keep config organized in sections
- ✅ Add comments for clarity
- ✅ Use meaningful variable names

### DON'T:
- ❌ Hardcode company name in components
- ❌ Duplicate information in multiple places
- ❌ Store secrets in config (use .env for that)
- ❌ Change config without testing
- ❌ Mix config with component logic

---

## 💾 Before and After Config Updates

### Scenario: Change Your Email

**Before (Old Way - Nightmare!):**
```
Need to find and change:
- Footer.tsx line 42
- Navigation.tsx line 15
- ContactForm.tsx line 28
- Hero.tsx line 5
- AcademySection.tsx line 19
- BookingForm.tsx line 31
- Plus 10 more files!

Total: ~15 files to update manually 😰
Risk of missing one: High!
```

**After (New Way - Simple!):**
```
Change in lib/config.ts:
- owner.email = 'newemail@example.com'
- contact.email = 'newemail@example.com'
- social.email = 'newemail@example.com'

All 15+ files automatically update! 🎉
Risk of missing one: Zero!
```

---

## 🚀 Helper Functions in Config

The config also includes useful functions:

### getWhatsAppLink()
```typescript
// Use it like:
const link = getWhatsAppLink('Web Development')
// Returns: https://wa.me/250792405593?text=I%20want%20to%20book%20Web%20Development
```

### getPhoneLink()
```typescript
// Use it like:
const link = getPhoneLink()
// Returns: tel:+250792405593
```

### getEmailLink()
```typescript
// Use it like:
const link = getEmailLink()
// Returns: mailto:solomon.kamara@sklogic.rw
```

---

## 📊 Configuration Structure (Visual)

```
SITE_CONFIG
│
├── company
│   ├── name: "SK Logic"
│   └── tagline: "Think logically, Build digital"
│
├── owner
│   ├── name: "Solomon Kamara"
│   ├── email: "solomon.kamara@sklogic.rw"
│   └── phone: "+250 792 405 593"
│
├── location
│   ├── city: "Musanze"
│   ├── region: "Northern Province"
│   ├── country: "Rwanda"
│   └── fullAddress: "..."
│
├── contact
│   ├── email: "..."
│   ├── phone: "..."
│   └── whatsapp: "..."
│
├── social
│   ├── email: "..."
│   ├── whatsapp: "..."
│   ├── instagram: "..."
│   ├── twitter: "..."
│   └── linkedin: "..."
│
├── images
│   ├── logo: "/images/..."
│   └── hero: "/images/..."
│
├── urls
│   ├── home: "/"
│   ├── booking: "/booking"
│   ├── academy: "/academy"
│   └── contact: "/contact"
│
├── services
│   ├── webDevelopment
│   │   ├── title: "Web Development"
│   │   └── items: [...]
│   ├── mobileApp
│   └── ...
│
└── academy
    ├── name: "SK Academy"
    ├── description: "..."
    └── courses: [...]
```

---

## ✅ Verification Checklist

After editing config, verify:
- [ ] All sections have valid values
- [ ] No empty required fields
- [ ] Phone numbers are in correct format
- [ ] Email addresses are valid
- [ ] Image paths point to existing files
- [ ] URLs are correct
- [ ] No trailing commas in last items
- [ ] TypeScript has no errors

---

## 🎓 Learning the Config

### Start Simple:
1. Open `lib/config.ts`
2. Look at `company` section
3. Change `name` from "SK Logic" to something else
4. Go to Navigation - it automatically updates!
5. Change it back

### Go Deeper:
1. Change owner email
2. Go to Footer - it updates!
3. Change location
4. Go to Contact page - it updates!

### Get Comfortable:
1. Add a new service
2. Add a new course
3. Add social media profile
4. Update all contact information

---

## 🔗 Related Files

Understanding config helps with:
- Components (all use SITE_CONFIG)
- API routes (can use config for admin info)
- Forms (pull data from config)
- Emails (include config data)
- Deployment (config stays consistent)

---

## 💡 Pro Tips

1. **Keep Formatting** - Maintain the structure when editing
2. **Use Consistent Data** - Same info in multiple places
3. **Test After Changes** - Visit pages to verify updates
4. **Backup Before Big Changes** - Save current version
5. **Add Comments** - Explain non-obvious values

---

## 🚀 You've Got This!

The config system is your friend. Once you understand it, updating your website becomes super easy.

Just remember: **Edit lib/config.ts, and all pages automatically update!**

Happy coding! 🎉

---

**Quick Reference:**
- **File Location**: `lib/config.ts`
- **Import in Component**: `import { SITE_CONFIG } from '@/lib/config'`
- **Use in Component**: `{SITE_CONFIG.company.name}`
- **When to Update**: Whenever your info changes
- **Effect**: Immediate, all pages update

**Questions?** See QUICK_START_SOLOMON.md or README.md
