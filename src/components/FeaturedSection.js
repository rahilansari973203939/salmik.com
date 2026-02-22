export default function FeaturedSection() {
    const features = [
        { icon: '🚚', title: 'Free Shipping', desc: 'On orders above £50' },
        { icon: '🛡️', title: 'Secure Checkout', desc: 'Safe & encrypted payments' },
        { icon: '↩️', title: 'Easy Returns', desc: '15-day return policy' },
        { icon: '⭐', title: 'Top Rated', desc: 'Trusted by 10k+ shoppers' },
    ];

    return (
        <section className="py-12 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="text-center p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800 hover:shadow-soft transition"
                        >
                            <span className="text-3xl mb-3 block">{feature.icon}</span>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
