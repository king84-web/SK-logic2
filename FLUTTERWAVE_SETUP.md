# Flutterwave Payment Integration Guide

## Overview
This guide helps you set up Flutterwave payment integration for SK Logic. Flutterwave enables you to receive payments via Mobile Money across Africa and card payments.

## Supported Payment Methods by Country

### Mobile Money (Recommended)
- 🇷🇼 **Rwanda**: MTN Rwanda, Airtel Rwanda
- 🇺🇬 **Uganda**: MTN Uganda, Airtel Uganda
- 🇰🇪 **Kenya**: M-Pesa, Airtel Money
- 🇬🇭 **Ghana**: MTN Ghana, Vodafone Ghana, AirtelTigo Ghana
- 🇳🇬 **Nigeria**: USSD, Bank Transfer
- 🇿🇦 **South Africa**: EFT, Credit Card

### Card Payments
- Visa, Mastercard accepted across all countries
- International cards supported

## Step 1: Create Flutterwave Account

1. Go to https://dashboard.flutterwave.com/signup
2. Sign up with your email and password
3. Complete KYC verification
4. Verify your business details

## Step 2: Get API Keys

1. Log in to Flutterwave dashboard
2. Go to **Settings → API Keys**
3. Copy both:
   - **Public Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

⚠️ **IMPORTANT**: Keep your Secret Key private. Never share it or commit to git.

## Step 3: Configure Environment Variables

Add to your `.env.local` file:

```env
FLUTTERWAVE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
FLUTTERWAVE_SECRET_KEY=sk_test_xxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production on Vercel:
1. Go to your Vercel project settings
2. Click **Environment Variables**
3. Add the three variables above
4. Use live keys (pk_live_ and sk_live_) for production

## Step 4: Set Up Webhook

1. In Flutterwave dashboard, go to **Settings → Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/payments/webhook`
3. For local testing, use **ngrok**:
   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```
4. Use the ngrok URL in webhook settings

### Webhook Configuration
- **Event**: Select `charge.completed`
- **Webhook URL**: Your app's payment webhook endpoint
- **Active**: Toggle ON

## Step 5: Test the Integration

### Local Testing

1. Install dependencies:
```bash
npm install flutterwave-node-v3
npm run build
npm run dev
```

2. Go to http://localhost:3000/booking

3. Fill in booking form:
   - Name, Email, Phone, Service
   - Enter an amount (e.g., 10000 RWF)
   - Select "Flutterwave" payment method
   - Click "Book & Pay"

4. You'll be redirected to Flutterwave test page

5. Use test credentials:
   - Card: 4242424242424242
   - Expiry: 09/32
   - CVV: 123

### Testing Mobile Money
1. In test mode, you can select different payment methods
2. Choose Mobile Money for your country
3. Use test numbers provided by Flutterwave

## Step 6: Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin/dashboard`

Features:
- View all bookings and payments
- Filter by payment status (Paid, Unpaid, Failed)
- View revenue and pending amounts
- Export transactions to CSV
- Configure Flutterwave settings

## Currency Codes

| Code | Country | Network |
|------|---------|---------|
| RWF | Rwanda | MTN, Airtel |
| UGX | Uganda | MTN, Airtel |
| KES | Kenya | M-Pesa, Airtel |
| GHS | Ghana | MTN, Vodafone, AirtelTigo |
| NGN | Nigeria | USSD, Bank Transfer |
| ZAR | South Africa | EFT, Card |

## API Endpoints

### Initialize Payment
**POST** `/api/payments/initialize`

Request:
```json
{
  "bookingId": "booking_id_here",
  "amount": 10000,
  "email": "user@example.com",
  "phone": "250792405593",
  "name": "John Doe",
  "description": "Web Development Service",
  "currency": "RWF"
}
```

Response:
```json
{
  "status": "success",
  "data": {
    "link": "https://checkout.flutterwave.com/pay/xxxxx",
    "tx_ref": "SK-1704067200000-ABCDEF"
  }
}
```

### Verify Payment
**POST** `/api/payments/verify`

Request:
```json
{
  "tx_ref": "SK-1704067200000-ABCDEF",
  "transaction_id": "1234567"
}
```

### Payment Webhook
**POST** `/api/payments/webhook`

Automatically called by Flutterwave when payment completes.

## Database Schema

### ServiceBooking Table
```sql
ALTER TABLE ServiceBooking ADD COLUMN (
  amount FLOAT,
  currency VARCHAR(3) DEFAULT 'RWF',
  paymentId VARCHAR(255),
  paymentStatus VARCHAR(50) DEFAULT 'unpaid',
  paymentMethod VARCHAR(50)
);
```

### AcademyEnrollment Table
```sql
ALTER TABLE AcademyEnrollment ADD COLUMN (
  amount FLOAT,
  currency VARCHAR(3) DEFAULT 'RWF',
  paymentId VARCHAR(255),
  paymentStatus VARCHAR(50) DEFAULT 'unpaid',
  paymentMethod VARCHAR(50)
);
```

## Troubleshooting

### Issue: "Payment initialization failed"
**Solution**: 
- Verify API keys are correct
- Check that `NEXT_PUBLIC_APP_URL` is set
- Ensure `amount` is a number > 0

### Issue: "Webhook not receiving events"
**Solution**:
- Verify webhook URL is publicly accessible
- Check webhook is enabled in Flutterwave dashboard
- Test with Flutterwave's webhook tester

### Issue: "Payment verified but booking not updated"
**Solution**:
- Check database connection
- Verify payment status in Flutterwave dashboard
- Check application logs

### Issue: "Mobile Money not showing"
**Solution**:
- Ensure phone number includes country code
- Use correct currency for the country
- Verify business is approved in that country

## Going Live

### Before Production:

1. ✅ Switch to live API keys
2. ✅ Test with real mobile money transaction
3. ✅ Set `NEXT_PUBLIC_APP_URL` to production domain
4. ✅ Update webhook URL in Flutterwave dashboard
5. ✅ Set up SSL certificate (HTTPS)
6. ✅ Enable 2FA on Flutterwave account
7. ✅ Set up monitoring and alerts

### Deployment Checklist

- [ ] Live API keys configured in Vercel
- [ ] Production domain webhook URL set
- [ ] Database migrations run
- [ ] Email notifications working
- [ ] Admin dashboard accessible only to admins
- [ ] SSL certificate installed
- [ ] Rate limiting configured

## Support

- **Flutterwave Support**: https://support.flutterwave.com
- **Flutterwave Docs**: https://developer.flutterwave.com/docs
- **Live Chat**: Available in Flutterwave dashboard

## Additional Resources

- [Flutterwave API Reference](https://developer.flutterwave.com/reference)
- [Mobile Money Integration Guide](https://developer.flutterwave.com/docs/integration-guides/mobile-money)
- [Testing Guide](https://developer.flutterwave.com/docs/integration-guides/testing)
