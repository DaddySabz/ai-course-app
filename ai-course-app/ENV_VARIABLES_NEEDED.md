# Environment Variables - Add to .env.local

## ✅ You Already Have:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_PRICE_ID_INTRO_PARTNER=price_xxxxx
NEXT_PUBLIC_PRICE_ID_INTRO_STANDARD=price_xxxxx
```

## 🔴 Still Need to Add:

### 1. Webhook Secret
After setting up the Stripe webhook, add:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 2. App URL
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📝 Full .env.local File Should Look Like:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_existing_value
SUPABASE_SECRET_KEY=your_existing_value

# NextAuth
NEXTAUTH_SECRET=your_existing_value
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_existing_value
GOOGLE_CLIENT_SECRET=your_existing_value

# Stripe Keys
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Stripe Webhook
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Stripe Price IDs
NEXT_PUBLIC_PRICE_ID_INTRO_PARTNER=price_1SX0s5FaWAVKdu3uag4tz6o3
NEXT_PUBLIC_PRICE_ID_INTRO_STANDARD=price_1SX0s5FaWAVKdu3u1aws1EKO

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Next Steps:

1. **Add the missing variables** to your `.env.local`
2. **Set up Stripe webhook** (see STRIPE_SETUP.md)
3. **Restart your dev server** for env changes to take effect
