# Stand Out and Scale - Sales Page

A zero-cost infrastructure sales page for the "Stand Out and Scale" book using Next.js, Stripe, and Vercel.

## Features

- ✅ **$0 infrastructure cost** using Vercel's free tier
- ✅ **Stripe integration** for payments (pay only transaction fees: ~2.9% + $0.30)
- ✅ **Automated email delivery** via SendGrid (free tier: 100 emails/day for 60 days)
- ✅ **Long-form sales page** with conversion-optimized design
- ✅ **Thank you page** with download instructions
- ✅ **Responsive design** using Tailwind CSS

## Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payments**: Stripe Checkout
- **Email**: SendGrid (optional)
- **Hosting**: Vercel

## Quick Start

### 1. Clone and Install

```bash
cd stand-out-and-scale-sales
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
SENDGRID_API_KEY=your_sendgrid_key_here
```

### 3. Get Your Stripe Keys

1. Go to [stripe.com](https://stripe.com) and create an account
2. Navigate to **Developers → API keys**
3. Copy your **Publishable key** and **Secret key**
4. Add them to `.env.local`

### 4. Set Up SendGrid (Optional but Recommended)

1. Go to [sendgrid.com](https://sendgrid.com) and create an account
2. Generate an **API key**
3. Add it to `.env.local` as `SENDGRID_API_KEY`
4. Verify your sender email address in SendGrid

### 5. Add Your Assets

Place these files in the `public/` directory:

- `book-cover.jpg` - Your book cover image
- `stand-out-and-scale.pdf` - Your book PDF

### 6. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test the checkout flow.

## Testing

### Test Stripe Checkout

1. Click "Get Instant Access — $25"
2. Use test card number: `4242 4242 4242 4242`
3. Use any valid future expiry date and any 3-digit CVC
4. Complete checkout
5. You should be redirected to `/thank-you`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stand-out-and-scale-sales.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel URL)
   - `SENDGRID_API_KEY` (optional)

4. Deploy!

### Connect Your Domain

**Option 1: Subdomain**
- In Vercel, add domain: `book.brandora.app`
- In your DNS provider, create a CNAME record:
  - Name: `book`
  - Value: `cname.vercel-dns.com`

**Option 2: Path-based**
- Integrate this into your main Brandora app as `/book`

### Switch to Live Stripe Keys

When ready to accept real payments:

1. In Stripe dashboard, switch to **Live mode**
2. Get your live keys (`pk_live_...` and `sk_live_...`)
3. Update environment variables in Vercel
4. Redeploy

## Project Structure

```
stand-out-and-scale-sales/
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts          # Stripe checkout session creation
│   │   └── send-download/
│   │       └── route.ts          # SendGrid email delivery
│   ├── thank-you/
│   │   └── page.tsx              # Post-purchase thank you page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main sales page
├── public/
│   ├── book-cover.jpg            # Your book cover (add this)
│   └── stand-out-and-scale.pdf   # Your book PDF (add this)
├── .env.local                    # Your environment variables (not committed)
├── .env.example                  # Environment variable template
└── package.json
```

## API Routes

### POST /api/checkout
Creates a Stripe Checkout Session and returns the session ID.

**Request:**
```json
{ "quantity": 1 }
```

**Response:**
```json
{ "sessionId": "cs_test_..." }
```

### POST /api/send-download
Sends download email via SendGrid.

**Request:**
```json
{ "email": "customer@example.com" }
```

**Response:**
```json
{ "success": true }
```

## Cost Breakdown

### Infrastructure: $0/month
- Vercel Hobby plan: Free
- Next.js hosting: Free
- SSL certificate: Free (via Vercel)
- CDN: Free (via Vercel)

### Per Transaction
- Stripe: ~2.9% + $0.30 per successful charge
- Example: $25 sale = $0.73 + $0.30 = $1.03 fee
- You receive: $23.97

### Email (Optional)
- SendGrid Free Trial: 100 emails/day for 60 days
- After trial: Pay-as-you-go or upgrade

## Customization

### Change Price
Edit `app/api/checkout/route.ts`:
```typescript
unit_amount: 2500, // Change to desired price in cents
```

### Update Copy
Edit `app/page.tsx` to change headlines, descriptions, or sections.

### Modify Branding
Current colors:
- Primary: `teal-600` (#0d9488)
- Background: `slate-50` to `slate-100`

Update these in the Tailwind classes throughout the components.

## Security Notes

- Never commit `.env.local` to Git
- Keep Stripe secret keys secure
- Use test mode until ready to accept real payments
- PDF in `public/` folder is accessible by anyone with the link
  - For better security, consider S3 with signed URLs later

## Support

For issues or questions:
- Email: support@brandora.app
- Documentation: See `sales-page-manual.md`

## License

© 2025 Brandora. All rights reserved.
