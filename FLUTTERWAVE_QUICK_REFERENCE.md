# ⛔ Flutterwave Quick Reference - REMOVED

**Removed:** January 24, 2026

This document is no longer relevant. Flutterwave has been completely removed from the project.

## Current Payment System

The application now uses **WhatsApp-only payments**.

### Key Links
- [QUICK_START_DEPLOY.md](QUICK_START_DEPLOY.md) - How to deploy
- [WHATSAPP_PAYMENT_DEPLOYMENT.md](WHATSAPP_PAYMENT_DEPLOYMENT.md) - Payment flow documentation

| Issue | Solution |
|-------|----------|
| API key error | Verify keys in .env.local |
| Payment failed | Check amount is valid |
| Webhook not working | Use ngrok for local testing |
| Currency not found | Use correct ISO code (RWF, UGX, etc) |
| Mobile Money unavailable | Ensure phone number has country code |

---

## Production Checklist

- [ ] Switch to live API keys
- [ ] Update webhook URL
- [ ] Enable HTTPS
- [ ] Set production domain
- [ ] Test real transaction
- [ ] Configure rate limiting
- [ ] Set up monitoring

---

## Files Reference

| File | Purpose |
|------|---------|
| [lib/flutterwave.ts](lib/flutterwave.ts) | Core integration |
| [app/api/payments/initialize/route.ts](app/api/payments/initialize/route.ts) | Payment init |
| [app/api/payments/verify/route.ts](app/api/payments/verify/route.ts) | Payment verify |
| [app/api/payments/webhook/route.ts](app/api/payments/webhook/route.ts) | Webhook handler |
| [app/payment-callback/page.tsx](app/payment-callback/page.tsx) | Callback page |
| [app/admin/dashboard/page.tsx](app/admin/dashboard/page.tsx) | Admin panel |
| [FLUTTERWAVE_SETUP.md](FLUTTERWAVE_SETUP.md) | Full setup guide |

---

## Webhook Setup

**Local Testing:**
```bash
npm install -g ngrok
ngrok http 3000
# Copy URL and add to Flutterwave: https://your-ngrok-url.ngrok.io/api/payments/webhook
```

**Production:**
```
https://yourdomain.com/api/payments/webhook
```

---

## API Response Examples

### Success
```json
{
  "status": "success",
  "message": "Payment initialized successfully",
  "data": {
    "link": "https://checkout.flutterwave.com/pay/sk-xxxx",
    "tx_ref": "SK-1704067200000-ABCDEF"
  }
}
```

### Error
```json
{
  "status": "error",
  "message": "Missing required payment fields",
  "error": "amount required"
}
```

---

## Payment Flow

```
User Booking
    ↓
Select Payment Method
    ↓
Click "Book & Pay"
    ↓
Initialize Payment (API)
    ↓
Redirect to Flutterwave
    ↓
Customer Selects Payment Method
    ↓
Enter Payment Details
    ↓
Complete Payment
    ↓
Flutterwave Webhook
    ↓
Verify Payment
    ↓
Update Booking Status
    ↓
Send Confirmation Email
    ↓
Redirect to Success Page
```

---

## Database Schema

### Payment Fields Added

**ServiceBooking** table:
```sql
amount FLOAT
currency VARCHAR(3) DEFAULT 'RWF'
paymentId VARCHAR(255)
paymentStatus VARCHAR(50) DEFAULT 'unpaid'
paymentMethod VARCHAR(50)
```

**AcademyEnrollment** table:
```sql
amount FLOAT
currency VARCHAR(3) DEFAULT 'RWF'
paymentId VARCHAR(255)
paymentStatus VARCHAR(50) DEFAULT 'unpaid'
paymentMethod VARCHAR(50)
```

---

## Environment Variables

```env
# Required
FLUTTERWAVE_PUBLIC_KEY=pk_test_...
FLUTTERWAVE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional
ALLOWED_ORIGINS=http://localhost:3000
```

---

## Mobile Money Providers

### Rwanda (RWF)
- **MTN Rwanda**
  - Phone: +250 7xx xxx xxx
  - Service: Mobile Money
  
- **Airtel Rwanda**
  - Phone: +250 7xx xxx xxx
  - Service: Money

### Uganda (UGX)
- **MTN Uganda**: USSD *165#
- **Airtel Uganda**: USSD *185#

### Kenya (KES)
- **M-Pesa**: USSD *334#
- **Airtel Money**: USSD *100#

### Ghana (GHS)
- **MTN Ghana**: USSD *170#
- **Vodafone Ghana**: USSD *110#

### Nigeria (NGN)
- **USSD Transfer**: USSD codes vary by bank
- **Bank Transfer**: Direct deposit

### South Africa (ZAR)
- **Standard Bank**: EFT/Bank Transfer
- **Card Payment**: Visa/Mastercard

---

## Performance Tips

1. **Cache payment methods** in localStorage
2. **Debounce** amount input validation
3. **Lazy load** admin charts
4. **Compress** exported CSVs
5. **Use CDN** for webhook responses

---

## Monitoring & Alerts

Track these metrics:
- ✅ Payment success rate
- ✅ Average payment time
- ✅ Failed transactions
- ✅ Failed webhooks
- ✅ Average transaction amount

---

## Support Links

- 🌐 [Flutterwave Dashboard](https://dashboard.flutterwave.com)
- 📚 [API Docs](https://developer.flutterwave.com/docs)
- 💬 [Support Chat](https://dashboard.flutterwave.com/support)
- 📧 [Email Support](mailto:support@flutterwave.com)

---

*Last Updated: January 23, 2026*
