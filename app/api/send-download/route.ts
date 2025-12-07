import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const msg = {
      to: email,
      from: 'noreply@brandora.app',
      subject: 'Your Stand Out and Scale Book',
      html: `
        <h2>Thank you for your purchase!</h2>
        <p>Your book is ready to download:</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/stand-out-and-scale.pdf">
          Download Stand Out and Scale (PDF)
        </a></p>
        <p>If you have any questions, reply to this email.</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
