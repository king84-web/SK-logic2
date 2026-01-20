// Configuration for SK Logic Website
// All app-wide settings and information

export const SITE_CONFIG = {
  // Company Information
  company: {
    name: 'SK Logic',
    tagline: 'Think logically, Build digital.',
    description: 'Professional web development, technical services, and digital education platform.',
  },

  // Owner Information
  owner: {
    name: 'Solomon Kamara',
    email: 'kamarasolomon164@gmail.com',
    phone: '+250 792 405 593',
    phoneFormatted: '0792 405 593', // For display
    phoneInternational: '250792405593', // For WhatsApp links
  },

  // Location
  location: {
    city: 'Musanze',
    region: 'Northern Province',
    country: 'Rwanda',
    fullAddress: 'Musanze, Northern Province, Rwanda',
  },

  // Contact Information
  contact: {
    email: 'kamarasolomon164@gmail.com',
    whatsapp: '+250 792 405 593',
    whatsappLink: 'https://wa.me/250792405593',
    address: 'Musanze, Northern Province, Rwanda',
  },

  // Services
  services: {
    webDevelopment: {
      category: 'Web Development',
      items: [
        { title: 'NGO Website', price: 'Custom Quote' },
        { title: 'Company Website', price: 'Custom Quote' },
        { title: 'E-Commerce Store', price: 'Custom Quote' },
        { title: 'Real Estate Portal', price: 'Custom Quote' },
      ],
    },
    technical: {
      category: 'Technical Services',
      items: [
        { title: 'Social Media Boosting', price: 'Starting from $99' },
        { title: 'Wi-Fi Removal/Fixes', price: 'Starting from $49' },
        { title: 'iCloud Services', price: 'Custom Quote' },
      ],
    },
  },

  // Academy Courses
  academy: {
    name: "SK Logic Academy",
    description: "Professional courses in web development, mobile technology, and digital services.",
    courses: [
      {
        id: 'mobile-decoding',
        title: 'Mobile Decoding Mastery',
        duration: '8 weeks',
        price: '$299',
        description: 'Master mobile device unlocking and recovery techniques',
      },
      {
        id: 'wifi-management',
        title: 'Wi-Fi Management Pro',
        duration: '6 weeks',
        price: '$199',
        description: 'Expert Wi-Fi troubleshooting and network optimization',
      },
      {
        id: 'social-media',
        title: 'Social Media Growth Strategies',
        duration: '4 weeks',
        price: '$149',
        description: 'Build and grow your social media presence organically',
      },
      {
        id: 'fullstack-dev',
        title: 'Full-Stack Web Development',
        duration: '12 weeks',
        price: '$499',
        description: 'Complete web development from frontend to backend',
      },
    ],
  },

  // Images/Assets - CORRECTED PATHS
  images: {
    logo: '/images/site-logo.png',
    hero: '/images/home-hero-image.jpg',
    contactBg: '/images/contact-background.avif',
    academyBg: '/images/academy-background.jpg',
    serviceMain: '/images/services-feature.avif',
  },

  // Social Links
  social: {
    whatsapp: 'https://wa.me/250792405593',
    email: 'mailto:kamarasolomon164@gmail.com',
  },

  // URLs
  urls: {
    home: '/',
    booking: '/booking',
    academy: '/academy',
    contact: '/contact',
  },
}

// Helper functions
export const getWhatsAppLink = (serviceName: string) => {
  const message = `Hi SK Logic, I am interested in ${serviceName}. Please provide more details and pricing.`
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${SITE_CONFIG.owner.phoneInternational}?text=${encodedMessage}`
}

export const getEmailLink = () => {
  return `mailto:${SITE_CONFIG.contact.email}`
}

export const getPhoneLink = () => {
  return `tel:${SITE_CONFIG.owner.phoneInternational}`
}
