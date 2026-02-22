'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const coupons = {
    BRUSH10: 0.1,
    RICE15: 0.15,
};

const formatCategory = (value) => value?.split('-').map(word => word[0]?.toUpperCase() + word.slice(1)).join(' ');

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    const discountRate = appliedCoupon ? coupons[appliedCoupon] : 0;
    const discountAmount = total * discountRate;
    const grandTotal = Math.max(total - discountAmount, 0);

    const handleApplyCoupon = () => {
        const normalized = couponCode.trim().toUpperCase();
        if (coupons[normalized]) {
            setAppliedCoupon(normalized);
            setCouponError('');
        } else {
            setAppliedCoupon(null);
            setCouponError('Invalid coupon code.');
        }
    };

    if (!items || items.length === 0) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>
                        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-soft">
                            <p className="text-2xl text-slate-600 dark:text-slate-300 mb-6">Your cart is empty</p>
                            <Link href="/products" className="inline-block px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition">Continue Shopping</Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 flex flex-col sm:flex-row gap-4 border border-slate-100 dark:border-slate-800">
                                        <div className="h-24 w-24 rounded-xl bg-white overflow-hidden border border-slate-100 dark:border-slate-800">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                                            <p className="text-slate-500 text-sm">{formatCategory(item.category)}</p>
                                            <p className="text-lg font-bold text-brand mt-2">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 border border-slate-200 dark:border-slate-700 rounded hover:bg-brand/10">-</button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 border border-slate-200 dark:border-slate-700 rounded hover:bg-brand/10">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800 font-semibold">Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 h-fit border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-6">Order Summary</h2>
                            <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                                    <span>Subtotal</span>
                                    <span>₹{total?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between text-emerald-600 font-semibold">
                                        <span>Coupon ({appliedCoupon})</span>
                                        <span>-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white mb-6">
                                <span>Total</span>
                                <span>₹{grandTotal.toFixed(2)}</span>
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Apply Coupon</label>
                                <div className="mt-2 flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="BRUSH10 or RICE15"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && (
                                    <p className="text-xs text-red-500 mt-2">{couponError}</p>
                                )}
                            </div>

                            <Link href="/checkout" className="block w-full px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition text-center">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
