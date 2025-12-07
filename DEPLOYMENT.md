# Deployment Guide

Step-by-step instructions to deploy your sales page to production.

## Prerequisites

Before deploying, ensure you have:

1. ✅ A GitHub account
2. ✅ A Vercel account (free tier)
3. ✅ A Stripe account (completed onboarding)
4. ✅ A SendGrid account (optional, for email)
5. ✅ Your book cover image (`book-cover.jpg`)
6. ✅ Your book PDF (`stand-out-and-scale.pdf`)
7. ✅ Access to `brandora.app` DNS settings

---

## Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository

```bash
cd stand-out-and-scale-sales
git init
```

### 1.2 Add Your Assets

Place these files in the `public/` directory:
- `book-cover.jpg`
- `stand-out-and-scale.pdf`

### 1.3 Verify `.gitignore`

Make sure `.env.local` is in `.gitignore`:

```bash
cat .gitignore | grep .env.local
```

If not listed, add it:

```bash
echo ".env.local" >> .gitignore
```

### 1.4 Commit Your Code

```bash
git add .
git commit -m "Initial commit: Stand Out and Scale sales page"
```

### 1.5 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `stand-out-and-scale-sales`
3. Keep it **Private** (recommended for sales pages)
4. **Do NOT** initialize with README
5. Click "Create repository"

### 1.6 Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stand-out-and-scale-sales.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Deploy to Vercel

### 2.1 Sign Up for Vercel

1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repositories

### 2.2 Import Project

1. Click **"Add New Project"**
2. Select **"Import Git Repository"**
3. Find and select `stand-out-and-scale-sales`
4. Click **"Import"**

### 2.3 Configure Project Settings

Vercel will auto-detect Next.js. Keep these settings:

- **Framework Preset:** Next.js
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### 2.4 Add Environment Variables

Click **"Environment Variables"** and add:

**For Testing (use test keys first):**

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_YOUR_KEY` |
| `STRIPE_SECRET_KEY` | `sk_test_YOUR_KEY` |
| `NEXT_PUBLIC_APP_URL` | `https://YOUR-PROJECT.vercel.app` |
| `SENDGRID_API_KEY` | `SG.YOUR_KEY` (optional) |

**Important:** The `NEXT_PUBLIC_APP_URL` will be shown after first deployment.

### 2.5 Initial Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. Note your deployment URL: `https://stand-out-and-scale-sales.vercel.app`

### 2.6 Update Environment Variables

1. Go to **Project Settings → Environment Variables**
2. Edit `NEXT_PUBLIC_APP_URL`
3. Set to your actual Vercel URL
4. Redeploy (or push a new commit)

---

## Step 3: Test Production Deployment

### 3.1 Visit Your Site

Open `https://YOUR-PROJECT.vercel.app`

### 3.2 Test Checkout Flow

1. Click **"Get Instant Access — $25"**
2. Should redirect to Stripe checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. Verify redirect to thank-you page
6. Check that session_id appears in URL

### 3.3 Test Email (if configured)

1. On thank-you page, enter your email
2. Click "Resend"
3. Check your inbox for download email
4. Verify download link works

### 3.4 Check Stripe Dashboard

1. Go to https://dashboard.stripe.com
2. Switch to **Test mode**
3. Check **Payments** → should see your test payment
4. Verify amount is $25.00

---

## Step 4: Connect Your Domain

### Option A: Subdomain (Recommended)

**Setup `book.brandora.app`:**

#### In Vercel:

1. Go to **Project Settings → Domains**
2. Click **"Add Domain"**
3. Enter: `book.brandora.app`
4. Click **"Add"**
5. Vercel will show DNS configuration needed

#### In Your DNS Provider:

1. Log in to your domain registrar/DNS provider
2. Go to DNS settings for `brandora.app`
3. Add a **CNAME** record:
   - **Name:** `book`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** Automatic or 3600
4. Save changes

#### Wait for DNS Propagation:

- Usually takes 5-60 minutes
- Check status in Vercel dashboard
- Once verified, SSL certificate auto-provisions

### Option B: Path-Based Integration

**Setup `brandora.app/book`:**

If you want the sales page at a path on your existing domain:

1. Add this project to your main Brandora Next.js app
2. Move the code to `/app/book/page.tsx`
3. Keep API routes at `/app/api/checkout/` and `/app/api/send-download/`
4. Deploy as part of your main app

---

## Step 5: Switch to Live Stripe Keys

### 5.1 Complete Stripe Setup

1. Go to https://dashboard.stripe.com
2. Complete business profile
3. Add bank account for payouts
4. Verify your business details
5. Wait for Stripe approval (usually instant to 24 hours)

### 5.2 Get Live API Keys

1. In Stripe dashboard, toggle to **Live mode** (top left)
2. Go to **Developers → API keys**
3. Copy:
   - **Publishable key:** `pk_live_...`
   - **Secret key:** `sk_live_...` (click "Reveal")

**⚠️ Security Note:** Keep these keys extremely secure. Never commit to Git.

### 5.3 Update Vercel Environment Variables

1. Go to Vercel **Project Settings → Environment Variables**
2. Update for **Production** environment:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
   - `STRIPE_SECRET_KEY` = `sk_live_...`
3. Keep `NEXT_PUBLIC_APP_URL` as your production domain
4. Keep `SENDGRID_API_KEY` (if using)

### 5.4 Redeploy

Option 1: Trigger redeploy in Vercel dashboard
Option 2: Push a new commit to trigger auto-deploy

```bash
git commit --allow-empty -m "Switch to live Stripe keys"
git push
```

### 5.5 Test with Real Card (Optional)

**Use a low amount to test:**
1. Temporarily change price to $0.50 in `app/api/checkout/route.ts`
2. Commit and deploy
3. Test with your own credit card
4. Verify in Stripe live dashboard
5. Change price back to $25.00
6. Commit and deploy again

---

## Step 6: Configure Email Delivery

### 6.1 SendGrid Setup

1. Go to https://sendgrid.com
2. Sign up for free trial (100 emails/day for 60 days)
3. Navigate to **Settings → API Keys**
4. Click **"Create API Key"**
5. Name: "Stand Out and Scale Sales"
6. Permissions: **Full Access**
7. Copy the API key

### 6.2 Verify Sender Email

1. Go to **Settings → Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Enter: `noreply@brandora.app`
4. Fill in required information
5. Verify email by clicking link sent to you

### 6.3 Add to Vercel

1. Go to Vercel **Project Settings → Environment Variables**
2. Add `SENDGRID_API_KEY` with your API key
3. Redeploy

### 6.4 Test Email Delivery

1. Complete a test purchase
2. Check your email
3. Verify download link works
4. Check spam folder if not received
5. If in spam, improve email content or verify domain

---

## Step 7: Optional Enhancements

### Facebook Pixel (for ads)

If running Facebook ads:

1. Create pixel in Facebook Business Manager
2. Add pixel code to `app/layout.tsx`
3. Add purchase tracking to thank-you page

### Google Analytics

1. Create GA4 property
2. Add tracking code to `app/layout.tsx`
3. Set up conversion tracking

### Custom 404 Page

Create `app/not-found.tsx` for better UX.

---

## Step 8: Final Launch Checklist

Before announcing to the world:

- [ ] Sales page loads on production domain
- [ ] Full checkout flow works with live Stripe
- [ ] Email delivery confirmed
- [ ] PDF download link accessible
- [ ] Mobile responsive verified
- [ ] Tested on multiple browsers
- [ ] All copy reviewed for typos
- [ ] Stripe account approved and active
- [ ] Bank account connected for payouts
- [ ] Support email monitored (support@brandora.app)

---

## Ongoing Monitoring

### Daily (First Week)
- Check Stripe dashboard for sales
- Monitor email delivery
- Review Vercel logs for errors
- Respond to support emails

### Weekly
- Review sales metrics
- Check for failed payments
- Monitor email bounce rates
- Update copy based on conversion data

### Monthly
- Review Stripe fees and payouts
- Analyze traffic sources
- Consider A/B testing improvements
- Plan marketing campaigns

---

## Troubleshooting

### Deployment Fails
- Check Vercel build logs
- Ensure all dependencies in `package.json`
- Verify environment variables are set

### Checkout Not Working
- Verify Stripe keys are correct
- Check browser console for errors
- Ensure `NEXT_PUBLIC_APP_URL` is correct

### Email Not Sending
- Verify SendGrid API key
- Check sender email is verified
- Review SendGrid activity logs
- Check spam folder

### Domain Not Resolving
- DNS changes can take up to 48 hours
- Verify CNAME record is correct
- Check DNS propagation: https://dnschecker.org

### PDF Not Accessible
- Verify file is in `public/` folder
- Check file name matches code
- Ensure file was included in deployment

---

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Stripe Documentation:** https://stripe.com/docs
- **SendGrid Documentation:** https://docs.sendgrid.com
- **Next.js Documentation:** https://nextjs.org/docs

---

## Cost Summary

### Free Forever
- Vercel hosting (Hobby plan)
- SSL certificate
- Domain (if you already own brandora.app)

### Per Transaction
- Stripe: 2.9% + $0.30 per sale
- Example: $25 sale = you receive $23.97

### After Free Trial
- SendGrid: $15-20/month for 40k-100k emails
  (You can switch to manual delivery initially)

---

**Your sales page is now live! 🚀**

Monitor closely in the first 48 hours and be ready to quickly address any issues.
