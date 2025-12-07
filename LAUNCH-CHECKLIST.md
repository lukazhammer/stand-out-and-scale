# Launch Checklist

Use this checklist before sending traffic to your sales page.

## Local Development

- [ ] `npm run dev` works without errors
- [ ] Sales page loads at `http://localhost:3000`
- [ ] "Get Instant Access" button triggers checkout
- [ ] Stripe test checkout page loads
- [ ] Test card `4242 4242 4242 4242` completes successfully
- [ ] Redirect to `/thank-you` works after successful payment
- [ ] PDF link is accessible (if public hosting used)
- [ ] Email resend button functions (if SendGrid configured)

## Stripe Configuration (Test Mode)

- [ ] Test payment completes successfully
- [ ] Payment appears in Stripe test dashboard
- [ ] Correct amount ($25.00) is charged
- [ ] Thank you page displays with session ID
- [ ] No console errors during checkout flow

## Assets

- [ ] Book cover image added to `public/book-cover.jpg`
- [ ] Book PDF added to `public/stand-out-and-scale.pdf`
- [ ] Both files are optimized for web delivery
- [ ] Book cover displays correctly on sales page
- [ ] PDF download link works

## Vercel Deployment

- [ ] Code pushed to GitHub
- [ ] Vercel project created and linked
- [ ] Environment variables configured in Vercel:
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `NEXT_PUBLIC_APP_URL` (set to production URL)
  - [ ] `SENDGRID_API_KEY` (if using email)
- [ ] Initial deployment successful
- [ ] Live URL accessible
- [ ] Full checkout flow works on production

## Domain Configuration

- [ ] Domain connected in Vercel settings
  - [ ] Option 1: `book.brandora.app` subdomain configured
  - [ ] Option 2: Integrated into main app at `brandora.app/book`
- [ ] DNS records updated:
  - [ ] CNAME record: `book` → `cname.vercel-dns.com`
- [ ] HTTPS certificate auto-provisioned by Vercel
- [ ] Domain resolves correctly
- [ ] No mixed content warnings

## Email Delivery (if using SendGrid)

- [ ] SendGrid account created
- [ ] API key generated and added to Vercel
- [ ] Sender email verified in SendGrid
- [ ] Test email sent successfully
- [ ] Email not landing in spam (check Gmail, Outlook, etc.)
- [ ] Download link in email is correct
- [ ] Resend button on thank-you page works

## Stripe Live Mode

- [ ] Business details completed in Stripe
- [ ] Bank account connected for payouts
- [ ] Stripe live keys obtained:
  - [ ] `pk_live_...`
  - [ ] `sk_live_...`
- [ ] Live keys added to Vercel environment variables
- [ ] Redeployed with live keys
- [ ] Test purchase with real card (optional, small amount)
- [ ] Payment appears in Stripe live dashboard
- [ ] Automatic payout schedule configured

## Security & Legal

- [ ] `.env.local` not committed to Git
- [ ] `.gitignore` includes `.env.local`
- [ ] Stripe secret keys kept secure
- [ ] No sensitive data in client-side code
- [ ] Terms of service link added (if required)
- [ ] Privacy policy link added (if required)
- [ ] Refund policy stated (30-day money back guarantee)

## Analytics & Tracking (Optional)

- [ ] Facebook Pixel installed (if running ads)
- [ ] PageView event tracking on sales page
- [ ] Purchase event tracking on thank-you page
- [ ] Google Analytics configured (optional)
- [ ] Conversion tracking verified

## Content & Copy

- [ ] All copy reviewed for typos
- [ ] Headlines compelling and clear
- [ ] CTAs (Call-to-Actions) visible and prominent
- [ ] Price clearly displayed
- [ ] Guarantee mentioned (30-day money back)
- [ ] FAQ section answers common objections
- [ ] Social proof/credentials included
- [ ] Contact information accessible

## Performance

- [ ] Page loads in under 3 seconds
- [ ] Images optimized for web
- [ ] Mobile responsive design verified
- [ ] Tests on multiple browsers:
  - [ ] Chrome
  - [ ] Safari
  - [ ] Firefox
  - [ ] Edge
- [ ] Tests on mobile devices:
  - [ ] iOS Safari
  - [ ] Android Chrome

## Pre-Launch Testing

- [ ] Complete end-to-end purchase test on production
- [ ] Verify email delivery in production
- [ ] Test on different devices and browsers
- [ ] Check mobile experience thoroughly
- [ ] Verify all links work
- [ ] Test with different email providers

## Launch Day

- [ ] Monitor Stripe dashboard for transactions
- [ ] Monitor email delivery
- [ ] Check for error logs in Vercel
- [ ] Have support email ready (support@brandora.app)
- [ ] Monitor traffic and conversion rates
- [ ] Be ready to handle customer questions

## Post-Launch (First 24 Hours)

- [ ] Verify first real purchases complete successfully
- [ ] Confirm customers receive download emails
- [ ] Monitor for any error reports
- [ ] Check refund requests
- [ ] Gather initial customer feedback
- [ ] Fix any issues immediately

## Ongoing Maintenance

- [ ] Weekly check of Stripe dashboard
- [ ] Monitor email delivery rates
- [ ] Review customer feedback
- [ ] Update copy based on conversion data
- [ ] Keep Stripe account in good standing
- [ ] Maintain SendGrid email reputation

---

## Quick Reference

**Test Card Numbers:**
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

**Support Email:** support@brandora.app

**Stripe Dashboard:** https://dashboard.stripe.com
**Vercel Dashboard:** https://vercel.com/dashboard
**SendGrid Dashboard:** https://app.sendgrid.com

---

**Status:** Ready to launch when all items are checked ✓
