'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import ThemeToggle from '@/components/ThemeToggle';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { itemCount } = useCart();
    const { user, logout } = useAuth();
    const { updateFilter } = useProducts();

    const handleSearch = (e) => {
        e.preventDefault();
        updateFilter('searchQuery', searchQuery);
        router.push('/products');
        setSearchQuery('');
        setIsSearchOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center">
                        <span className="h-16 w-52 sm:h-18 sm:w-56 md:h-20 md:w-64 rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/salmik.png"
                                alt="Salmik logo"
                                className="h-24 sm:h-32 md:h-40 w-auto object-contain"
                            />
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 mx-10">


                        {/* Navigation Menu Items */}
                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-brand dark:text-slate-300">
                                Home
                            </Link>
                            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-brand dark:text-slate-300">
                                About
                            </Link>
                            <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-brand dark:text-slate-300">
                                Products
                            </Link>

                            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-brand dark:text-slate-300">
                                Contact
                            </Link>
                        </div>

                        <form onSubmit={handleSearch} className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search brushes & rice..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand"
                                >
                                    🔍
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-slate-600 hover:text-brand dark:text-slate-300"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Toggle search"
                        >
                            🔍
                        </button>

                        <ThemeToggle />

                        <Link
                            href="/cart"
                            className="relative text-slate-600 hover:text-brand transition dark:text-slate-200"
                            aria-label="View cart"
                        >
                            <span className="text-2xl">🛒</span>
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-sm text-slate-600 dark:text-slate-300">Hi, {user.name}</span>
                                <Link href="/my-orders" className="text-sm text-slate-600 hover:text-brand dark:text-slate-300">
                                    Orders
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-sm text-slate-600 hover:text-brand dark:text-slate-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-brand to-brand-dark px-4 py-2 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition"
                            >
                                Login
                            </Link>
                        )}

                        <button
                            className="md:hidden text-slate-600 hover:text-brand dark:text-slate-200"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {isSearchOpen && (
                    <form onSubmit={handleSearch} className="lg:hidden pb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search brushes & rice..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand/60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                            />
                        </div>
                    </form>
                )}

                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-slate-200/70 dark:border-slate-800">
                        <div className="flex flex-col gap-2 py-3 text-sm text-slate-600 dark:text-slate-300">
                            <Link href="/" className="hover:text-brand">Home</Link>
                            <Link href="/products" className="hover:text-brand">Products</Link>
                            <Link href="/about" className="hover:text-brand">About</Link>
                            <Link href="/contact" className="hover:text-brand">Contact</Link>
                        </div>
                        {user ? (
                            <>
                                <div className="py-2 text-sm text-slate-700 dark:text-slate-200 font-medium">{user.name}</div>
                                <Link href="/my-orders" className="block py-2 text-slate-600 hover:text-brand dark:text-slate-300">
                                    My Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-2 text-slate-600 hover:text-brand dark:text-slate-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="block py-2 text-brand font-medium">
                                Login / Register
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
