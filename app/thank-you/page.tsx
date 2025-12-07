'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

    const handleResend = async () => {
    if (!email) {
      setResendMessage('Please enter your email address');
      return;
    }

    setResending(true);
    setResendMessage('');

    try {
      const response = await fetch('/api/send-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setResendMessage('Email sent! Check your inbox.');
      } else {
        setResendMessage(
          'Failed to send email. Please try again or contact support.'
        );
      }
    } catch (error) {
      setResendMessage(
        'An error occurred. Please contact support@brandora.app'
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-slate-600">
            Your book is on its way. Check your email for the download link.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
          <h2 className="font-bold text-slate-900 mb-4">Next Steps:</h2>
          <ol className="space-y-2 text-slate-700">
            <li>1. Check your email (and spam folder) for the download link.</li>
            <li>2. Download the PDF and start with Chapter 1.</li>
            <li>3. Work through the chapters at your own pace.</li>
            <li>4. Build your complete brand strategy as you go.</li>
          </ol>
        </div>

        <div className="bg-slate-50 p-6 rounded mb-8">
          <p className="text-slate-700 mb-4">
            <strong>Did not get the email?</strong> Enter your email below and
            we will send the link again:
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
            />
            <button 
              onClick={handleResend}
              disabled={resending}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
            >
              {resending ? 'Sending...' : 'Resend'}
            </button>
          </div>
          {resendMessage && (
            <p className={`mt-2 text-sm ${resendMessage.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>
              {resendMessage}
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-slate-600 mb-4">
            Questions? Contact support@brandora.app
          </p>
          <Link
            href="/"
            className="inline-block text-teal-600 hover:text-teal-700 font-semibold"
          >
            ← Back to book page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
