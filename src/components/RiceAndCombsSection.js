'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';

export default function RiceAndCombsSection() {
    const { products } = useProducts();
    const [activeRiceType, setActiveRiceType] = useState('basmati-rice');
    const [activeBrushCategory, setActiveBrushCategory] = useState('paddle-brush');

    const brushProducts = products?.filter(p => ['paddle-brush', 'round-brush', 'detangling-brush', 'comb'].includes(p.category)) || [];
    const riceProducts = products?.filter(p => ['basmati-rice', 'brown-rice', 'jasmine-rice'].includes(p.category)) || [];

    const brushCategories = ['paddle-brush', 'round-brush', 'detangling-brush', 'comb'];
    const riceTypes = ['basmati-rice', 'brown-rice', 'jasmine-rice'];

    const riceDisplayImages = ['/images/rice-images/images-1.jpeg', '/images/rice-images/images-2.jpeg'];

    const riceTypeLabels = {
        'basmati-rice': 'Basmati Rice',
        'brown-rice': 'Brown Rice',
        'jasmine-rice': 'Jasmine Rice'
    };

    const brushCategoryLabels = {
        'paddle-brush': 'Paddle Brushes',
        'round-brush': 'Round Brushes',
        'detangling-brush': 'Detangling Brushes',
        'comb': 'Combs'
    };

    return (
        <section className="py-12 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Brushes Section - FIRST */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-display font-semibold text-slate-900 dark:text-white">
                            Brush Categories
                        </h2>
                        <Link href="/products?category=paddle-brush" className="text-sm font-semibold text-brand hover:text-brand-dark">
                            View All Brushes →
                        </Link>
                    </div>

                    {/* Brush Category Tabs */}
                    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                        {brushCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveBrushCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeBrushCategory === category
                                    ? 'bg-brand text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand/10'
                                    }`}
                            >
                                {brushCategoryLabels[category] || category}
                            </button>
                        ))}
                    </div>

                    {/* Brush Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {brushProducts
                            .filter(p => p.category === activeBrushCategory)
                            .slice(0, 4)
                            .map(product => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="group block bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-soft transition"
                                >
                                    {/* Product Image */}
                                    <div className="aspect-square p-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                                        <h3 className="font-semibold text-slate-800 dark:text-white text-sm truncate">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-brand font-bold">£{product.price}</p>
                                            <span className="text-xs text-slate-500 capitalize">{product.color}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>

                {/* Rice Section - SECOND */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-display font-semibold text-slate-900 dark:text-white">
                            Premium Rice
                        </h2>
                        <Link href="/products?category=rice" className="text-sm font-semibold text-brand hover:text-brand-dark">
                            View All Rice →
                        </Link>
                    </div>

                    {/* Rice Type Tabs */}
                    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                        {riceTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveRiceType(type)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeRiceType === type
                                    ? 'bg-brand text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand/10'
                                    }`}
                            >
                                {riceTypeLabels[type]}
                            </button>
                        ))}
                    </div>

                    {/* Rice Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {riceProducts
                            .filter(p => p.category === activeRiceType)
                            .slice(0, 4)
                            .map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="group relative block bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-soft transition"
                                >
                                    {/* Coming Soon Overlay */}
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                        <span className="text-white font-semibold text-lg px-4 py-2 bg-brand rounded-full">
                                            Coming Soon
                                        </span>
                                    </div>

                                    {/* Product Image */}
                                    <div className="aspect-square p-4">
                                        <img
                                            src={riceDisplayImages[index % riceDisplayImages.length] || product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                                        <h3 className="font-semibold text-slate-800 dark:text-white text-sm truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-brand font-bold">£{product.price}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
