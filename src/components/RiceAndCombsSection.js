'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/utils/helpers';

export default function RiceAndCombsSection() {
    const { products } = useProducts();
    const [activeRiceType, setActiveRiceType] = useState('basmati-rice');
    const [activeBrushCategory, setActiveBrushCategory] = useState('paddle-brush');

    const brushProducts = products?.filter(p =>
        ['paddle-brush', 'round-brush', 'detangling-brush', 'comb', 'curly', 'easy-clean', 'jelly', 'kitty-puf', 'love', 'makaron', 'miracle', 'mirror', 'multy', 'pro-puf', 'self-cleaning', 'shiny', 'smiley', 'twist', 'detangler'].includes(p.category)
    ) || [];
    const riceProducts = products?.filter(p => ['basmati-rice', 'brown-rice', 'jasmine-rice'].includes(p.category)) || [];

    const brushCategories = ['paddle-brush', 'round-brush', 'curly', 'detangling-brush', 'easy-clean', 'jelly', 'kitty-puf', 'love', 'makaron', 'miracle', 'mirror', 'multy', 'pro-puf', 'self-cleaning', 'shiny', 'smiley', 'twist', 'detangler', 'comb'];
    const riceTypes = ['basmati-rice', 'brown-rice', 'jasmine-rice'];

    // Rice images from /images/rice/ folder as per requirements
    const riceDisplayImages = ['/images/rice/images-1.jpeg', '/images/rice/images-2.jpeg'];

    const riceTypeLabels = {
        'basmati-rice': 'Basmati Rice',
        'brown-rice': 'Brown Rice',
        'jasmine-rice': 'Jasmine Rice'
    };

    const brushCategoryLabels = {
        'paddle-brush': 'Paddle Brushes',
        'round-brush': 'Round Brushes',
        'curly': 'Curly Brushes',
        'detangling-brush': 'Detanglers',
        'easy-clean': 'Easy Clean',
        'jelly': 'Jelly Brushes',
        'kitty-puf': 'Kitty Puf',
        'love': 'Love Collection',
        'makaron': 'Makaron',
        'miracle': 'Miracle',
        'mirror': 'Mirror Shine',
        'multy': 'Multy Color',
        'pro-puf': 'Pro Puf',
        'self-cleaning': 'Self Cleaning',
        'shiny': 'Shiny',
        'smiley': 'Smiley',
        'twist': 'Twist',
        'detangler': 'Detangler',
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
                                            <p className="text-brand font-bold">{formatCurrency(product.price)}</p>
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

                    {/* Rice Products Grid - Coming Soon with 5kg */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {riceProducts
                            .filter(p => p.category === activeRiceType)
                            .slice(0, 4)
                            .map((product, index) => (
                                <div
                                    key={product.id}
                                    className="group block bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-soft transition relative"
                                >
                                    {/* Product Image with Coming Soon overlay */}
                                    <div className="aspect-square p-4 relative">
                                        <img
                                            src={riceDisplayImages[index % riceDisplayImages.length] || product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                        {/* Coming Soon overlay */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <span className="bg-white/90 text-brand font-bold px-4 py-2 rounded-full text-sm">
                                                Coming Soon
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Info - Shows 5kg instead of price */}
                                    <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                                        <h3 className="font-semibold text-slate-800 dark:text-white text-sm truncate">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-slate-500">5kg</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
