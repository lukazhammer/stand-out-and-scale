import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stand Out and Scale',
              description: 'Strategic Brand Building for Serious Entrepreneurs',
              images: [`${baseUrl}/standoutcover3d.JPG`],
            },
            unit_amount: 799, // $7.99
          },
          quantity: 1,
        },
      ],
      // Redirect URLs after checkout
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,

      // Optional: Collect billing address for tax purposes
      billing_address_collection: 'auto',

      // Optional: Allow promotion codes
      allow_promotion_codes: true,

      // Optional: Pre-fill customer email if you have it
      // customer_email: 'customer@example.com',

      // Metadata for your records
      metadata: {
        product: 'stand-out-and-scale-ebook',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}