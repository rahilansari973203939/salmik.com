'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { getOrders, updateOrderStatus } from '@/services/api';
import { formatCurrency } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const loadOrders = async () => {
            const loadedOrders = await getOrders();
            setOrders(loadedOrders);
        };
        loadOrders();
    }, []);

    const handleStatusChange = async (id, status) => {
        await updateOrderStatus(id, status);
        const updatedOrders = await getOrders();
        setOrders(updatedOrders);
    };

    const handleInvoice = (order) => {
        const hasRiceItems = (order.items || []).some((item) => item.category?.includes('rice'));
        const invoiceWindow = window.open('', '_blank');
        if (!invoiceWindow) return;
        invoiceWindow.document.write(`
            <html>
                <head>
                    <title>Invoice ${order.orderNumber || order.id}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { margin-bottom: 0; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; }
                        th { background: #f4f4f4; }
                    </style>
                </head>
                <body>
                    <h1>BrushRiceMart Invoice</h1>
                    <p>Order: ${order.orderNumber || order.id}</p>
                    <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Customer: ${order.shipping?.fullName || 'Guest'}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${(order.items || []).map(item => `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.category?.includes('rice') ? 'Coming Soon' : formatCurrency(item.price * item.quantity)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <h3>Total: ${hasRiceItems ? 'Coming Soon' : formatCurrency(order.total || 0)}</h3>
                </body>
            </html>
        `);
        invoiceWindow.document.close();
        invoiceWindow.print();
    };

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
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Order Management</h1>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft overflow-x-auto border border-slate-100 dark:border-slate-800">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Order ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Customer</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Amount</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Date</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => {
                                    const hasRiceItems = (order.items || []).some((item) => item.category?.includes('rice'));
                                    return (
                                        <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                                            <td className="px-6 py-4 text-slate-800 dark:text-slate-100 font-semibold">{order.orderNumber || order.id}</td>
                                            <td className="px-6 py-4 text-slate-800 dark:text-slate-100">{order.shipping?.fullName || 'Guest'}</td>
                                            <td className="px-6 py-4 text-slate-800 dark:text-slate-100 font-semibold">{hasRiceItems ? 'Coming Soon' : formatCurrency(order.total)}</td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <button className="text-brand hover:text-brand-dark font-semibold" onClick={() => handleInvoice(order)}>
                                                    Invoice
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                            No orders yet.
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
