'use client';

import { useState } from 'react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="py-12 bg-gradient-to-r from-brand-light via-white to-accent-light">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-display font-semibold text-slate-900 mb-2">
                    Fresh drops, brush tips, and pantry picks.
                </h2>
                <p className="text-slate-600 mb-6">
                    Join our newsletter for early access deals and care guides delivered monthly.
                </p>

                <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-4 py-3 rounded-full border border-brand/20 focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold shadow-soft hover:shadow-glow transition"
                    >
                        Subscribe
                    </button>
                </form>

                {submitted && (
                    <p className="mt-4 text-emerald-600 font-semibold">✓ Thanks for subscribing!</p>
                )}
            </div>
        </section>
    );
}
