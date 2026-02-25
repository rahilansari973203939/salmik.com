import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-16 bg-slate-950 text-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    <div>
                        {/* Logo - matching navbar size */}
                        <Link href="/" className="inline-block mb-3">
                            <span className="h-16 w-52 sm:h-18 sm:w-56 md:h-20 md:w-64 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src="/images/salmik.png"
                                    alt="BrushRiceMart"
                                    className="h-24 sm:h-32 md:h-40 w-auto"
                                />
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400">
                            Curated hair brushes and premium rice varieties delivered with care.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/" className="hover:text-brand transition">Home</Link></li>
                            <li><Link href="/products" className="hover:text-brand transition">Products</Link></li>
                            <li><Link href="/about" className="hover:text-brand transition">About</Link></li>
                            <li><Link href="/contact" className="hover:text-brand transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Categories</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/products?category=paddle-brush" className="hover:text-brand transition">Paddle Brushes</Link></li>
                            <li><Link href="/products?category=round-brush" className="hover:text-brand transition">Round Brushes</Link></li>
                            <li><Link href="/products?category=detangling-brush" className="hover:text-brand transition">Detangling</Link></li>
                            <li><Link href="/products?category=comb" className="hover:text-brand transition">Combs</Link></li>
                            <li><Link href="/products?category=basmati-rice" className="hover:text-brand transition">Basmati Rice</Link></li>
                            <li><Link href="/products?category=brown-rice" className="hover:text-brand transition">Brown Rice</Link></li>
                            <li><Link href="/products?category=jasmine-rice" className="hover:text-brand transition">Jasmine Rice</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Contact</h4>
                        <p className="text-sm text-slate-400 mb-2">misbah@salmik.co.uk</p>
                        <p className="text-sm text-slate-400 mb-2">+44 7425 697500</p>
                        <p className="text-sm text-slate-400">Forbes Street, Aberdeen, Scotland, AB25 2WN</p>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
                    <p>© 2026 BrushRiceMart. All rights reserved.</p>
                    <p>Created By Goldtronix Systems LLC</p>
                </div>
            </div>
        </footer>
    );
}
