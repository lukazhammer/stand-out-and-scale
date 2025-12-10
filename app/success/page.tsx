'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Download, Mail, ArrowRight, BookOpen } from 'lucide-react';

interface SessionData {
    customer_email: string | null;
    payment_status: string;
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [session, setSession] = useState<SessionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            fetchSession();
        } else {
            setLoading(false);
            setError('No session ID found');
        }
    }, [sessionId]);

    const fetchSession = async () => {
        try {
            const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setSession(data);
            }
        } catch (err) {
            setError('Failed to verify purchase');
        } finally {
            setLoading(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFCFF] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Confirming your purchase...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !session) {
        return (
            <div className="min-h-screen bg-[#FAFCFF] flex items-center justify-center px-6">
                <div className="max-w-md text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-red-500 text-2xl">!</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#050A30] mb-4">Something went wrong</h1>
                    <p className="text-slate-600 mb-6">
                        We couldn't verify your purchase. If you completed payment, please contact us and we'll sort it out.
                    </p>
                    <a
                        href="mailto:support@brandora.com"
                        className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
                    >
                        <Mail size={18} />
                        Contact Support
                    </a>
                </div>
            </div>
        );
    }

    // Success state
    return (
        <div className="min-h-screen bg-[#FAFCFF]">
            {/* Header */}
            <div className="bg-[#050A30] py-4 px-6">
                <div className="max-w-4xl mx-auto">
                    <span className="text-white font-semibold">Stand Out and Scale</span>
                </div>
            </div>

            <main className="py-16 px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Success message */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={40} className="text-green-600" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#050A30] mb-4">
                            You're in!
                        </h1>
                        <p className="text-lg text-slate-600">
                            Your copy of Stand Out and Scale is ready to download.
                            {session.customer_email && (
                                <span className="block mt-2 text-sm">
                                    A receipt has been sent to <strong>{session.customer_email}</strong>
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Download card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 mb-8">
                        <div className="flex items-start gap-6">
                            {/* Book thumbnail */}
                            <div className="hidden sm:block w-24 flex-shrink-0">
                                <div className="bg-[#050A30] rounded-lg p-4 text-center">
                                    <BookOpen size={32} className="text-cyan-400 mx-auto" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#050A30] mb-2">
                                    Stand Out and Scale
                                </h2>
                                <p className="text-slate-600 text-sm mb-6">
                                    Strategic Brand Building for Serious Entrepreneurs
                                </p>

                                {/* Download button */}
                                <a
                                    href="/downloads/stand-out-and-scale.pdf"
                                    download
                                    className="inline-flex items-center gap-3 bg-[#050A30] hover:bg-[#0a1045] text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                                >
                                    <Download size={20} />
                                    Download PDF
                                </a>

                                <p className="text-xs text-slate-400 mt-4">
                                    Trouble downloading? Right-click and select "Save link as..."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What's next */}
                    <div className="bg-slate-50 rounded-xl p-6 mb-8">
                        <h3 className="font-bold text-[#050A30] mb-4">What's Next?</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium text-[#050A30]">Download and save your PDF</p>
                                    <p className="text-sm text-slate-600">Keep it somewhere you can easily access it.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium text-[#050A30]">Block time to work through it</p>
                                    <p className="text-sm text-slate-600">Each chapter builds on the last. Set aside focused sessions.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium text-[#050A30]">Do the exercises</p>
                                    <p className="text-sm text-slate-600">The value is in the work. Write directly in the PDF or print it out.</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    {/* Brandora upsell - subtle */}
                    <div className="border border-slate-200 rounded-xl p-6 bg-white">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <ArrowRight size={20} className="text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#050A30] mb-1">Want Expert Guidance?</h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    Brandora offers guided brand strategy assessments that build on this framework. Get personalized feedback on your brand positioning.
                                </p>
                                <a
                                    href="https://brandora.com"
                                    className="text-cyan-600 hover:text-cyan-700 text-sm font-medium inline-flex items-center gap-1"
                                >
                                    Learn more about Brandora
                                    <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Support footer */}
                    <div className="text-center mt-12 text-sm text-slate-500">
                        <p>
                            Questions? Email{' '}
                            <a href="mailto:support@brandora.com" className="text-cyan-600 hover:underline">
                                support@brandora.com
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FAFCFF] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}