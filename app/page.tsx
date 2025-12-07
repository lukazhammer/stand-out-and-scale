'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export default function SalesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        setError(stripeError.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="text-2xl font-bold text-teal-600">Brandora</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            The Strategic Brand Framework That Helps Entrepreneurs Build
            Companies Worth Multiples
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            A 10-chapter system you work through directly in the book itself.
            No separate workbooks. No busywork. Just clear frameworks and
            strategic questions that guide you to build your brand as you read.
          </p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors mb-4"
          >
            {loading ? 'Processing...' : 'Get Instant Access — $25'}
          </button>

          <p className="text-sm text-slate-500">
            ✓ Instant digital delivery | ✓ 30-day money back guarantee | ✓ No
            spam
          </p>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Most Entrepreneurs Get Branding Backwards
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 rounded-lg">
              <p className="text-slate-700 font-semibold mb-2">
                You build a great product
              </p>
              <p className="text-slate-600">
                ...but customers treat it like a commodity.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <p className="text-slate-700 font-semibold mb-2">
                You invest in marketing
              </p>
              <p className="text-slate-600">
                ...but returns are weak because there is no foundation.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <p className="text-slate-700 font-semibold mb-2">
                You&apos;re competing on price
              </p>
              <p className="text-slate-600">
                ...because customers don&apos;t see how you&apos;re
                different.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <p className="text-slate-700 font-semibold mb-2">
                Your brand disappears
              </p>
              <p className="text-slate-600">
                ...the moment you stop paying for ads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Here&apos;s Exactly What You&apos;ll Have By The End
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                chapter: 'Chapter 1',
                title: 'Why You Need a Brand',
                desc: 'The concrete benefits that translate to revenue increases.',
              },
              {
                chapter: 'Chapter 2',
                title: 'Your Brand Vision',
                desc: 'Define your North Star with guided questions.',
              },
              {
                chapter: 'Chapter 3',
                title: 'Your Brand Mission',
                desc: 'Work through your "how" directly in the chapter.',
              },
              {
                chapter: 'Chapter 4',
                title: 'Your Target Audience',
                desc: 'Map your ideal customer with built-in frameworks.',
              },
              {
                chapter: 'Chapter 5',
                title: 'Your Brand Promise',
                desc: 'Craft what you will consistently deliver.',
              },
              {
                chapter: 'Chapter 6',
                title: 'Your Brand Positioning',
                desc: 'Find your unique position with step-by-step guidance.',
              },
              {
                chapter: 'Chapter 7',
                title: 'Your Brand Persona',
                desc: 'Choose and develop your archetype.',
              },
              {
                chapter: 'Chapters 8–10',
                title: 'Expression, Management & Protection',
                desc: 'Complete your brand with expression and legal protection.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 border border-slate-200 rounded-lg">
                <p className="text-teal-600 font-bold text-sm mb-1">
                  {item.chapter}
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded">
            <h3 className="font-bold text-slate-900 mb-4">What&apos;s Different:</h3>
            <ul className="space-y-3 text-slate-700">
              <li>✓ No separate workbooks to buy.</li>
              <li>✓ No busywork exercises.</li>
              <li>
                ✓ The book is structured so you do your real strategic work
                directly in the chapters.
              </li>
              <li>✓ Every question is actionable, not theoretical.</li>
              <li>
                ✓ By the end of Chapter 10, you have a complete brand strategy
                built.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            By Lucas Hamel
          </h2>
          <div className="bg-white p-8 rounded-lg border border-slate-200">
            <p className="text-slate-700 mb-4">
              This isn&apos;t theory. It&apos;s the exact system used with
              $10M+ founder-led businesses in consulting practice.
            </p>
            <p className="text-slate-700 mb-4">
              The difference: 20+ years of consulting are distilled into a book
              you can work through yourself. The frameworks that normally cost
              thousands in strategy sessions are embedded directly in the
              chapters.
            </p>
            <p className="font-semibold text-slate-900">
              You do the work. You get the clarity. You own the strategy.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Is this just a book I read and put on a shelf?',
                a: 'No. The strategic questions are embedded throughout each chapter. You are working through your brand framework as you read. By the time you finish, you will have your complete brand strategy documented.',
              },
              {
                q: 'Do I need separate materials or workbooks?',
                a: 'No. Everything you need is in the book. The chapters guide you through the strategic work directly—no separate downloads or materials required.',
              },
              {
                q: 'How long does it take to work through?',
                a: 'Most entrepreneurs complete it in 4–6 weeks, spending a few hours per chapter on the strategic thinking.',
              },
              {
                q: 'What makes this different from other branding books?',
                a: 'Most branding books teach concepts. This one guides you to build your actual brand. The frameworks are questions you answer directly in the book to create your own strategy.',
              },
              {
                q: 'What if I do not like it?',
                a: 'There is a 30-day money-back guarantee.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-6">
                <h3 className="font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build a Brand That Lasts?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Get instant access to Stand Out and Scale. You will have your brand
            foundation in weeks, not years.
          </p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-white hover:bg-slate-100 disabled:bg-gray-300 text-teal-600 font-bold py-4 px-12 rounded-lg text-lg transition-colors"
          >
            {loading ? 'Processing...' : 'Get Instant Access for $25'}
          </button>

          <p className="text-teal-100 text-sm mt-4">
            ✓ Instant digital delivery | ✓ 30-day money back guarantee | ✓ No
            spam
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p>
            © 2025 Brandora. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
