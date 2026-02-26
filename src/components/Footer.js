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

                        {/* Social Media Links */}
                        <div className="mt-4 flex gap-4">
                            <a
                                href="https://www.facebook.com/profile.php?id=61572575576161"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-brand transition"
                                aria-label="Facebook"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/salmik.co.uk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-brand transition"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@salmik.ltd?is_from_webapp=1&sender_device=pc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-brand transition"
                                aria-label="TikTok"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                                </svg>
                            </a>
                        </div>
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
