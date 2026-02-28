'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
    {
        name: 'Dashboard',
        href: '/admin',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        name: 'Products',
        href: '/admin/products',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
    },
    {
        name: 'Customers',
        href: '/admin/customers',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
    {
        name: 'Orders',
        href: '/admin/orders',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-lg z-50">
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-brand to-brand-dark rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-display font-semibold text-slate-900 dark:text-white">Admin Panel</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">BrushRiceMart</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-md'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {item.icon}
                                <span className="font-semibold">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                {user?.name || 'Admin'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {user?.email || 'admin@salmik.com'}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span className="font-medium">View Store</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
