import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
        return NextResponse.json(
            { error: 'Missing session_id parameter' },
            { status: 400 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Verify payment was successful
        if (session.payment_status !== 'paid') {
            return NextResponse.json(
                { error: 'Payment not completed' },
                { status: 400 }
            );
        }

        // Return only the data the frontend needs
        return NextResponse.json({
            customer_email: session.customer_details?.email || null,
            payment_status: session.payment_status,
        });
    } catch (error) {
        console.error('Session verification error:', error);

        if (error instanceof Stripe.errors.StripeError) {
            return NextResponse.json(
                { error: 'Invalid session' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to verify session' },
            { status: 500 }
        );
    }
}