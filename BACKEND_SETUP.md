# SK Logic Backend Setup Guide

This guide covers setting up the backend for the SK Logic website.

## Option 1: Using Next.js API Routes (Recommended for Simple Setup)

The current setup uses Next.js API routes located in `app/api/`:
- `/api/bookings` - Handle service bookings
- `/api/contact` - Handle contact form submissions

These will be deployed with your Vercel frontend.

## Option 2: Separate Express.js Backend (Advanced)

For more complex requirements, create a separate Express backend:

### Setup Steps:

1. **Create backend folder:**
```bash
mkdir backend
cd backend
npm init -y
npm install express cors dotenv pg axios
```

2. **Create `server.js`:**

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Bookings endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, service, date, message } = req.body;

    if (!name || !email || !phone || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Save to database
    console.log('Booking received:', req.body);

    res.status(201).json({
      message: 'Booking received',
      id: Math.random().toString(36).substr(2, 9),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Send email or save to database
    console.log('Contact message received:', req.body);

    res.status(201).json({ message: 'Message received' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

3. **Set up environment variables (backend/.env):**

```
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/sk_logic
ALLOWED_ORIGINS=https://sk-logic.vercel.app,http://localhost:3000
WHATSAPP_API_KEY=your_key
```

4. **Deploy to Railway:**

Create `Procfile`:
```
web: node server.js
```

Push to Railway and set environment variables.

## Database Setup

### PostgreSQL (Recommended)

1. **Create database:**
```sql
CREATE DATABASE sk_logic;
```

2. **Create tables:**

```sql
-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(255) NOT NULL,
  date DATE,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments table
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  course_id INTEGER NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB (Alternative)

```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DATABASE_URL);

async function connectDB() {
  await client.connect();
  return client.db('sk_logic');
}

module.exports = { connectDB };
```

## Environment Variables Summary

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Frontend API endpoint | `https://sk-logic-api.railway.app` |
| `DATABASE_URL` | Database connection | `postgresql://...` |
| `WHATSAPP_API_KEY` | WhatsApp API key | Your key |
| `WHATSAPP_PHONE_ID` | WhatsApp phone ID | Your ID |
| `ALLOWED_ORIGINS` | CORS whitelist | URLs separated by commas |

## Deployment Checklist

- [ ] Database created and migrated
- [ ] Environment variables set on Railway
- [ ] CORS configured with Vercel URL
- [ ] API endpoints tested locally
- [ ] Backend deployed to Railway
- [ ] Frontend `NEXT_PUBLIC_API_URL` points to Railway
- [ ] Frontend deployed to Vercel
- [ ] All forms tested end-to-end
