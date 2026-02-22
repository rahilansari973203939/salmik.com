import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Force dynamic rendering - server-rendered on demand
export const dynamic = 'force-dynamic';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">About BrushRiceMart</h1>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 mb-8 border border-slate-100 dark:border-slate-800">
                        <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Our Story</h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                            BrushRiceMart blends everyday essentials with boutique care. We started by curating professional-grade brushes and expanded
                            into premium rice varieties that elevate home cooking.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                            From salons to kitchens, we obsess over quality, sourcing, and the little details that make routines feel special.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Our Mission</h2>
                            <p className="text-slate-600 dark:text-slate-300">
                                To deliver beautiful brushing experiences and premium pantry staples with transparent pricing, thoughtful packaging, and
                                reliable delivery.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Contact</h2>
                            <p className="text-slate-600 dark:text-slate-300">
                                Email: hello@brushricemart.com<br />
                                Phone: +1 (503) 555-0182
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
