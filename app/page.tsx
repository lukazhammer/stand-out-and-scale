'use client';

import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  Lock,
  ShieldCheck,
  BookOpen,
  ChevronDown,
  Sparkles,
  Play
} from 'lucide-react';

export default function SalesPage() {
  const [loading, setLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleCheckout = async () => {
    setLoading(true);

    // @ts-ignore
    if (typeof window !== 'undefined' && window.fbq) {
      // @ts-ignore
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Stand Out and Scale Book',
        value: 7.99,
        currency: 'USD'
      });
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_1ScgVt2aAqf5IZtUXYNH87Ah' }),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFCFF]">
      {/* Minimal top bar - trust, not pressure */}
      <div className="bg-[#050A30] py-2.5 px-4 text-center text-sm text-slate-300">
        <span className="flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-cyan-400" />
          30-Day Money-Back Guarantee • Instant PDF Download
        </span>
      </div>

      {/* HERO - Clean, focused, single CTA */}
      <header className="relative bg-[#050A30] overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Copy */}
            <div className="order-2 lg:order-1">
              {/* Social proof badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-cyan-300 px-4 py-2 rounded-full text-sm mb-8">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&auto=format&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&auto=format&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&auto=format&fit=crop&crop=faces"
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Entrepreneur"
                      className="w-8 h-8 rounded-full border-2 border-[#050A30] object-cover"
                    />
                  ))}
                </div>
                <span className="text-white/80">1,200+ entrepreneurs building brands</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                Stop Competing on Price.
                <span className="block text-cyan-400 mt-2">Start Building a Brand.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-lg">
                The 10-chapter strategic framework that transforms your product into an irreplaceable brand. Used by founders building companies they can eventually sell.
              </p>

              {/* Primary CTA */}
              <div className="mb-8">
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="group bg-amber-400 hover:bg-amber-300 text-[#050A30] font-bold text-lg py-4 px-8 rounded-lg shadow-lg shadow-amber-400/20 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/30 flex items-center gap-3"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      Get Instant Access
                      <span className="bg-[#050A30]/10 px-2 py-0.5 rounded text-sm">$7.99</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-slate-400 text-sm mt-3 flex items-center gap-2">
                  <Lock size={12} />
                  Secure checkout. Instant delivery.
                </p>
              </div>

              {/* Quick benefits */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><Check size={14} className="text-cyan-400" /> 10 Strategic Chapters</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-cyan-400" /> Lifetime Access</span>
                <span className="flex items-center gap-1.5"><Check size={14} className="text-cyan-400" /> Work Directly in Book</span>
              </div>
            </div>

            {/* Right: Book Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-cyan-500/20 blur-3xl rounded-full" />
                <img
                  src="/standoutcover3d.JPG"
                  alt="Stand Out and Scale - Strategic Brand Building for Serious Entrepreneurs by Lucas Hamel"
                  className="relative w-full max-w-sm lg:max-w-md drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* THE PROBLEM - Relatable, not fear-based */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#050A30] mb-6">
            <span className="bg-amber-300/20 text-[#050A30] px-2 leading-tight decoration-amber-400 underline decoration-4 underline-offset-4">Great Products Fail Every Day</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-12">
            Not because they don't work. Because nobody remembers them. Without a strategic foundation, you're just another option in an endless scroll.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Invisible", desc: "Customers scroll past you. They can't tell why you're different from the ten alternatives." },
              { title: "Price Wars", desc: "Without brand equity, you compete on price. That kills margins and attracts the wrong customers." },
              { title: "Zero Loyalty", desc: "People buy once and leave. There's no relationship, no repeat business, no referrals." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-400/50 hover:bg-amber-50/30 hover:shadow-lg hover:shadow-amber-400/5 transition-all duration-300 group">
                <h3 className="font-bold text-[#050A30] mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION - What's inside */}
      <section className="py-20 px-6 bg-[#050A30]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              A Complete Strategic System
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Not theory. A 10-chapter framework you work through directly. Each chapter builds on the last until you have a complete brand strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: "01", title: "Brand Vision", desc: "Define your North Star beyond profit" },
              { num: "02", title: "Brand Mission", desc: "Turn aspiration into daily action" },
              { num: "03", title: "Target Audience", desc: "Psychographic profiles, not demographics" },
              { num: "04", title: "Brand Promise", desc: "Your operational guarantee" },
              { num: "05", title: "Positioning", desc: "Own mental real estate" },
              { num: "06", title: "Brand Persona", desc: "12 archetypes for human character" },
              { num: "07", title: "Brand Identity", desc: "Visual and verbal expression" },
              { num: "08", title: "Management", desc: "Systems for consistency at scale" },
              { num: "09", title: "Protection", desc: "Legal frameworks and trademarks" },
              { num: "10", title: "Execution", desc: "Bring it all together and launch" },
            ].map((item) => (
              <div
                key={item.num}
                className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300"
              >
                <span className="text-cyan-400 font-mono text-sm opacity-60">{item.num}</span>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleCheckout}
              className="bg-cyan-400 hover:bg-cyan-300 text-[#050A30] font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-lg shadow-cyan-400/20"
            >
              Get The Framework — $7.99
            </button>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#050A30] text-center mb-12">Built For Founders At Every Stage</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stage: "Pre-Launch", desc: "Build your foundation before you waste money on marketing that doesn't convert." },
              { stage: "Early Stage", desc: "You have sales, but they're inconsistent. Time to pivot from hustle to brand." },
              { stage: "Scaling", desc: "Your brand is messy. You need systems so your team can execute without you." }
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-600 mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-bold text-[#050A30] mb-2">{item.stage}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Testimonial */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="absolute -top-3 left-8 bg-amber-400 text-[#050A30] text-xs font-bold px-3 py-1 rounded-full">
              READER FEEDBACK
            </div>
            <blockquote className="text-xl md:text-2xl text-[#050A30] font-medium leading-relaxed mb-6">
              "I've spent $25k on consultants who gave me less clarity than Chapter 6 of this book."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&crop=faces" alt="Marcus T." className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-[#050A30]">Marcus T.</p>
                <p className="text-sm text-slate-500">SaaS Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE ANCHORING - Simple comparison */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#050A30] text-center mb-4">The Same Strategy. A Fraction of the Cost.</h2>
          <p className="text-center text-slate-600 mb-12 max-w-xl mx-auto">
            Brand consultants charge $5,000 to $25,000 for frameworks like this. Get the complete system for less than lunch.
          </p>

          <div className="max-w-md mx-auto">
            <div className="bg-[#050A30] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative">
                <h3 className="text-xl font-bold mb-1">Stand Out and Scale</h3>
                <p className="text-slate-400 text-sm mb-6">Complete 10-Chapter Strategic Framework</p>

                <div className="mb-6">
                  <span className="text-slate-500 line-through text-lg mr-2">$24.99</span>
                  <span className="text-5xl font-extrabold text-cyan-400">$7.99</span>
                </div>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex gap-3 items-center">
                    <Check size={16} className="text-cyan-400 flex-shrink-0" />
                    <span>Complete 10-chapter strategy framework</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Check size={16} className="text-cyan-400 flex-shrink-0" />
                    <span>Work directly in the book (no separate workbooks)</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Check size={16} className="text-cyan-400 flex-shrink-0" />
                    <span>Lifetime access to PDF</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Check size={16} className="text-cyan-400 flex-shrink-0" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-[#050A30] font-bold py-4 rounded-lg text-lg transition-all duration-300"
                >
                  {loading ? 'Processing...' : 'Get Instant Access'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Objection handling */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#050A30] text-center mb-10">Common Questions</h2>

          <div className="space-y-3">
            {[
              {
                q: "I'm not a designer. Can I still use this?",
                a: "Absolutely. This book teaches strategy, not design software. You'll learn the thinking that comes before visuals. Once you have the strategy, briefing a designer becomes straightforward."
              },
              {
                q: "I need sales now, not branding.",
                a: "Branding is what makes sales sustainable. Without it, you're on a hamster wheel. Investing a few weeks in this foundation makes every future pitch easier and more effective."
              },
              {
                q: "Is this a physical book?",
                a: "No, it's a digital PDF designed for immediate use. You can print it if you prefer working on paper."
              },
              {
                q: "What if I don't find it useful?",
                a: "You're covered by a 30-day money-back guarantee. If you don't feel more clarity about your brand strategy, email for a full refund."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-[#050A30]">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ${activeAccordion === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {activeAccordion === i && (
                  <div className="px-5 pb-5">
                    <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE AUTHOR */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-24 h-24 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden border-4 border-white shadow-lg">
              <img src="/lucas-hamel.png" alt="Lucas Hamel" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#050A30] mb-2">About Lucas Hamel</h3>
              <p className="text-slate-600 leading-relaxed">
                With 20+ years of marketing experience across Europe and North America, Lucas has built brand strategies for startups and established companies alike. This book distills the frameworks he's used to help founders transform products into lasting brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-[#050A30] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.1),transparent_50%)]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build a Brand That Lasts?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            Stop being forgettable. Get the strategic foundation that turns customers into advocates and products into assets.
          </p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-amber-400 hover:bg-amber-300 text-[#050A30] font-bold text-xl py-5 px-12 rounded-lg shadow-lg shadow-amber-400/20 transition-all duration-300 mb-8"
          >
            {loading ? 'Processing...' : 'Get Instant Access — $7.99'}
          </button>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Lock size={14} /> Secure Payment</span>
            <span className="flex items-center gap-2"><ShieldCheck size={14} /> 30-Day Guarantee</span>
            <span className="flex items-center gap-2"><BookOpen size={14} /> Instant Delivery</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#020510] text-slate-500 py-8 px-6 text-center text-sm">
        <p>© 2025 Brandora. All rights reserved.</p>
      </footer>
    </div>
  );
}