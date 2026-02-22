'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function OrderConfirmationPage() {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('lastOrder');
        if (saved) {
            try {
                setOrder(JSON.parse(saved));
            } catch (error) {
                setOrder(null);
            }
        }
    }, []);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
                <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 text-center border border-slate-100 dark:border-slate-800">
                    <div className="text-6xl mb-4">✓</div>
                    <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white mb-2">Order Confirmed!</h1>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">Thank you for your order. We&apos;ll notify you when it ships.</p>

                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
                        <p className="text-sm text-slate-500 mb-1">Order Number</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{order?.orderNumber || 'BRM-XXXXXX'}</p>
                    </div>

                    <div className="space-y-2 mb-6 text-left text-sm text-slate-600 dark:text-slate-300">
                        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
                        <p><strong>Payment Method:</strong> {order?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay'}</p>
                        <p><strong>Questions?</strong> Contact us at hello@brushricemart.com</p>
                    </div>

                    <div className="space-y-2">
                        <Link href="/my-orders" className="block px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition">View My Orders</Link>
                        <Link href="/products" className="block px-8 py-3 border border-brand text-brand rounded-full font-semibold hover:bg-brand/10 transition">Continue Shopping</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
