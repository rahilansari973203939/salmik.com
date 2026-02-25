'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/utils/helpers';

const formatCategory = (value) => value.split('-').map(word => word[0]?.toUpperCase() + word.slice(1)).join(' ');

export default function ProductCard({ product, onAddToCart }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        onAddToCart(product);
        setTimeout(() => setIsAdding(false), 500);
    };

    const discountPercent = product.mrp
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    // Check if product is rice
    const isRice = product.category?.includes('rice');

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft hover:shadow-glow transition-shadow duration-300 overflow-hidden group border border-slate-100 dark:border-slate-800">
            <Link href={`/product/${product.id}`} aria-label={`View ${product.name}`} className="block">
                <div className="relative overflow-hidden bg-white h-64 sm:h-72">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {discountPercent > 0 && !isRice && (
                        <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-md text-xs font-semibold">
                            -{discountPercent}%
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                    {formatCategory(product.category)}
                </p>

                <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white hover:text-brand transition cursor-pointer">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center mt-2 mb-3">
                    <span className="text-yellow-400">{'⭐'.repeat(Math.floor(product.rating || 0))}</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 ml-2">
                        {product.rating?.toFixed(1) || '0.0'} ({product.reviews || 0})
                    </span>
                </div>

                {/* Only show price for non-rice products */}
                {!isRice ? (
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-lg sm:text-xl font-bold text-brand">{formatCurrency(product.price)}</span>
                        {product.mrp && (
                            <span className="text-sm text-slate-400 line-through">{formatCurrency(product.mrp)}</span>
                        )}
                    </div>
                ) : (
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-sm font-bold text-brand">Coming Soon</span>
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    disabled={isAdding || product.stock === 0 || isRice}
                    className="w-full bg-gradient-to-r from-brand to-brand-dark text-white py-2 rounded-lg font-semibold hover:shadow-soft transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    {isRice ? 'Coming Soon' : isAdding ? '✓ Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
