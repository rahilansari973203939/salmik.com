'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getOrders } from '@/services/api';

const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-emerald-100 text-emerald-800',
};

export default function MyOrdersPage() {
    const { user, isLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const loadOrders = async () => {
            if (user?.id) {
                const userOrders = await getOrders(user.id);
                setOrders(userOrders || []);
            }
        };
        loadOrders();
    }, [user]);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                    <p className="text-slate-600">Loading...</p>
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
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">My Orders</h1>

                    {orders.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-soft">
                            <span className="text-6xl mb-4 block">📦</span>
                            <p className="text-2xl text-slate-600 dark:text-slate-300 mb-6">No orders yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map(order => (
                                <div key={order.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-slate-500 text-sm mb-1">Order ID</p>
                                            <p className="font-bold text-slate-900 dark:text-white">{order.orderNumber || order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-sm mb-1">Date</p>
                                            <p className="font-bold text-slate-900 dark:text-white">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-sm mb-1">Total</p>
                                            <p className="font-bold text-brand">₹{order.total}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-sm mb-1">Status</p>
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status] || statusStyles.pending}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
