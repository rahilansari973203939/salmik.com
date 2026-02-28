'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { getDashboardStats } from '@/services/api';
import { formatCurrency } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';

const salesSeries = [12, 18, 9, 22, 16, 28, 20];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalSales: 0,
        todayOrders: 0,
        totalOrders: 0,
        lowStockProducts: [],
    });
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const loadStats = async () => {
            const dashboardStats = await getDashboardStats();
            setStats(dashboardStats);
        };
        loadStats();
    }, []);

    const todayOrders = stats.todayOrders || 12;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="ml-64 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Admin Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-slate-500 text-sm font-semibold mb-2">Total Sales</h3>
                            <p className="text-3xl font-bold text-brand">{formatCurrency(stats.totalSales)}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-slate-500 text-sm font-semibold mb-2">Today&apos;s Orders</h3>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{todayOrders}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-slate-500 text-sm font-semibold mb-2">Total Orders</h3>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-slate-500 text-sm font-semibold mb-2">Low Stock Alerts</h3>
                            <p className="text-3xl font-bold text-accent">{stats.lowStockProducts.length}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Sales Chart</h2>
                            <div className="flex items-end gap-3 h-48">
                                {salesSeries.map((value, idx) => (
                                    <div key={idx} className="flex-1">
                                        <div
                                            className="rounded-2xl bg-gradient-to-t from-brand to-accent"
                                            style={{ height: `${value * 5}px` }}
                                        ></div>
                                        <p className="text-xs text-slate-500 mt-2 text-center">Day {idx + 1}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Low Stock Alerts</h2>
                            <div className="space-y-3">
                                {stats.lowStockProducts.length === 0 ? (
                                    <p className="text-sm text-slate-500">All products healthy.</p>
                                ) : (
                                    stats.lowStockProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between text-sm">
                                            <span className="text-slate-700 dark:text-slate-300">{product.name}</span>
                                            <span className="font-semibold text-accent">Stock: {product.stock}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
