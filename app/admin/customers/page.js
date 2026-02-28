'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { getCustomers, getOrders } from '@/services/api';
import { formatCurrency } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState([]);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const loadData = async () => {
            const users = await getCustomers();
            const orders = await getOrders();

            const enriched = users.map((user) => {
                const userOrders = orders.filter((order) => order.userId === user.id);
                const totalSpent = userOrders.reduce((sum, order) => sum + (order.total || 0), 0);
                return {
                    ...user,
                    orders: userOrders.length,
                    totalSpent,
                };
            });

            setCustomers(enriched);
        };
        loadData();
    }, []);

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
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Customer Management</h1>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft overflow-x-auto border border-slate-100 dark:border-slate-800">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Orders</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Total Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100">{customer.name}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{customer.email}</td>
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100">{customer.orders}</td>
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100 font-semibold">{formatCurrency(customer.totalSpent)}</td>
                                    </tr>
                                ))}
                                {customers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                            No customers yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
