'use client';

import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';

// Brush categories FIRST, then Rice categories
const categoryCards = [
    { name: 'Paddle Brushes', value: 'paddle-brush', icon: '🪮', tone: 'from-emerald-100 to-emerald-50' },
    { name: 'Round Brushes', value: 'round-brush', icon: '🌀', tone: 'from-amber-100 to-orange-50' },
    { name: 'Detangling Brushes', value: 'detangling-brush', icon: '✨', tone: 'from-teal-100 to-emerald-50' },
    { name: 'Combs', value: 'comb', icon: '〰️', tone: 'from-violet-100 to-purple-50' },
    { name: 'Basmati Rice', value: 'basmati-rice', icon: '🍚', tone: 'from-yellow-100 to-amber-50' },
    { name: 'Brown Rice', value: 'brown-rice', icon: '🌾', tone: 'from-lime-100 to-emerald-50' },
    { name: 'Jasmine Rice', value: 'jasmine-rice', icon: '🌼', tone: 'from-orange-100 to-yellow-50' },
];

export default function CategoriesSection() {
    const { products } = useProducts();

    const counts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-display font-semibold text-slate-900 dark:text-white">
                        Shop by Category
                    </h2>
                    <Link href="/products" className="text-sm font-semibold text-brand hover:text-brand-dark">
                        View all products →
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categoryCards.map((category) => (
                        <Link
                            key={category.value}
                            href={`/products?category=${category.value}`}
                            className="group"
                        >
                            <div className={`rounded-2xl bg-gradient-to-br ${category.tone} p-5 text-center transition shadow-sm hover:shadow-soft`}>
                                <div className="text-3xl mb-2 group-hover:scale-110 transition">
                                    {category.icon}
                                </div>
                                <h3 className="font-semibold text-slate-800 text-sm mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    {counts[category.value] || 0} items
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
