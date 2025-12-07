# Quick Reference Card

Keep this handy while setting up and running your sales page.

## Essential Commands

### Local Development
```bash
cd stand-out-and-scale-sales
npm install                 # Install dependencies (first time only)
npm run dev                 # Start development server
npm run build              # Build for production (test locally)
npm run start              # Run production build locally
```

### Git & GitHub
```bash
git init                   # Initialize repository
git add .                  # Stage all changes
git commit -m "message"    # Commit changes
git push                   # Push to GitHub
```

### Quick Test
Visit: http://localhost:3000
Click: "Get Instant Access — $25"
Use card: 4242 4242 4242 4242

---

## Environment Variables

### Local (`.env.local`)
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
SENDGRID_API_KEY=SG....
```

### Production (Vercel)
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_APP_URL=https://book.brandora.app
SENDGRID_API_KEY=SG....
```

---

## Test Credit Cards

| Purpose | Number | Result |
|---------|--------|--------|
| Success | 4242 4242 4242 4242 | Payment succeeds |
| Decline | 4000 0000 0000 0002 | Payment declined |
| Authenticate | 4000 0025 0000 3155 | Requires 3D Secure |

**Details for all:**
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any valid ZIP code

---

## Important URLs

### Dashboards
- **Stripe:** https://dashboard.stripe.com
- **Vercel:** https://vercel.com/dashboard
- **SendGrid:** https://app.sendgrid.com
- **GitHub:** https://github.com

### Documentation
- **This Project:** See README.md
- **Stripe Docs:** https://stripe.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## File Locations

### Must Add
- `public/book-cover.jpg` - Your book cover
- `public/stand-out-and-scale.pdf` - Your PDF
- `.env.local` - Your environment variables

### Main Files
- `app/page.tsx` - Sales page
- `app/thank-you/page.tsx` - Thank you page
- `app/api/checkout/route.ts` - Stripe integration
- `app/api/send-download/route.ts` - Email delivery

---

## DNS Configuration

### For `book.brandora.app`

**CNAME Record:**
- Name: `book`
- Value: `cname.vercel-dns.com`
- TTL: 3600 (or auto)

**Check propagation:**
- https://dnschecker.org

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Vercel logs, verify all env vars set |
| Checkout doesn't work | Verify Stripe keys, check browser console |
| Email not sending | Check SendGrid key, verify sender email |
| Domain not working | Wait for DNS propagation (up to 48hrs) |
| PDF not found | Ensure file in `public/` folder |

---

## Price Changes

Edit: `app/api/checkout/route.ts`

```typescript
unit_amount: 2500, // $25.00 in cents
```

To change to $29:
```typescript
unit_amount: 2900, // $29.00 in cents
```

Remember to redeploy after changes!

---

## Deployment Checklist

### Before First Deploy
- [ ] Stripe test keys added to Vercel
- [ ] Book cover in `public/` folder
- [ ] PDF in `public/` folder
- [ ] Code pushed to GitHub
- [ ] `.env.local` NOT in Git

### Before Going Live
- [ ] Stripe live keys in Vercel
- [ ] Domain connected and SSL active
- [ ] SendGrid sender verified
- [ ] Full test purchase completed
- [ ] Email delivery tested

---

## Support Contacts

### Platform Support
- **Stripe Support:** https://support.stripe.com
- **Vercel Support:** https://vercel.com/support
- **SendGrid Support:** https://support.sendgrid.com

### Your Sales Page
- **Email:** support@brandora.app

---

## Cost Calculator

**Per $25 Sale:**
- Stripe fee: 2.9% = $0.73
- Stripe fixed: $0.30
- Total fees: $1.03
- You receive: $23.97
- Your margin: 95.9%

**Monthly with 100 sales:**
- Revenue: $2,500
- Fees: $103
- Net: $2,397

---

## Common Tasks

### Update Environment Variable
1. Go to Vercel → Project → Settings
2. Navigate to Environment Variables
3. Edit the variable
4. Trigger redeploy

### Redeploy Site
Option 1: Push new commit to GitHub
Option 2: In Vercel, click "Redeploy"

### View Logs
Vercel → Project → Deployments → Click deployment → View logs

### Check Payments
Stripe → Payments (filter by date range)

### Monitor Emails
SendGrid → Activity → Email Activity

---

## Emergency Contacts

**If site goes down:**
1. Check Vercel status page
2. Review recent deployments
3. Roll back if needed (Vercel → Deployments → Previous deployment → Promote)

**If payments failing:**
1. Check Stripe dashboard
2. Verify API keys are correct
3. Check for Stripe service issues

**If emails not sending:**
1. Check SendGrid activity feed
2. Verify API key is valid
3. Check sender reputation

---

## Success Metrics

Track these in first 30 days:
- Total visitors
- Conversion rate (sales/visitors)
- Average time on page
- Bounce rate
- Email delivery rate
- Customer support requests

---

**Bookmark this page for quick access! 📌**

Last updated: December 2025
