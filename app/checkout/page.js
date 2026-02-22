'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/services/api';

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = await createOrder({
            userId: user?.id,
            items,
            total,
            paymentMethod,
            shipping: formData,
        });
        localStorage.setItem('lastOrder', JSON.stringify(order));
        clearCart();
        router.push('/order-confirmation');
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Checkout</h1>
                        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-soft">
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">Please log in to proceed with checkout</p>
                            <Link href="/login" className="inline-block px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition">Log In</Link>
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
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Shipping Address</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required />
                                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required />
                                    <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required />
                                    <input type="text" placeholder="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required />
                                    <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="sm:col-span-2 w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required />
                                    <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required />
                                    <input type="text" placeholder="ZIP Code" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" required />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Payment Method</h2>
                                <div className="space-y-3 text-slate-700 dark:text-slate-300">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="payment" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                                        <span>Pay with Razorpay</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                        <span>Cash on Delivery</span>
                                    </label>
                                </div>
                                {paymentMethod === 'razorpay' && (
                                    <button
                                        type="button"
                                        className="mt-4 w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition"
                                    >
                                        Pay with Razorpay
                                    </button>
                                )}
                            </div>

                            <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition">Place Order</button>
                        </form>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 h-fit border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                                {items?.map(item => (
                                    <div key={item.id} className="flex justify-between text-slate-600 dark:text-slate-300">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                                    <span>Subtotal</span>
                                    <span>£{total?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                                    <span>Total</span>
                                    <span>£{total?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
