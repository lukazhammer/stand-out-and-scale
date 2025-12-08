import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Keep this in sync with the Stripe API version expected by the SDK types.
});

export async function POST(request: NextRequest) {
  try {
    const { quantity = 1 } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stand Out and Scale',
              description: 'Strategic Brand Building for Serious Entrepreneurs',
              images: [
                `${process.env.NEXT_PUBLIC_APP_URL}/book-cover.jpg`,
              ],
            },
            unit_amount: 2500, // $25.00 in cents
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
