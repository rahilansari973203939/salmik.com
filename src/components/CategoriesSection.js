'use client';

import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';

// All categories - Brushes first, then Rice - with images from folders
const categoryCards = [
    { name: 'Paddle Brushes', value: 'paddle-brush', icon: '🪮', tone: 'from-emerald-100 to-emerald-50', image: '/images/makaron/makaronnnn.jpeg' },
    { name: 'Round Brushes', value: 'round-brush', icon: '🌀', tone: 'from-amber-100 to-orange-50', image: '/images/curly/curlyyyyy.jpeg' },
    { name: 'Curly Brushes', value: 'curly', icon: '🦱', tone: 'from-pink-100 to-rose-50', image: '/images/curly/curly.jpeg' },
    { name: 'Detanglers', value: 'detangling-brush', icon: '✨', tone: 'from-teal-100 to-emerald-50', image: '/images/makaron/makaronnnn.jpeg' },
    { name: 'Easy Clean', value: 'easy-clean', icon: '🚿', tone: 'from-blue-100 to-cyan-50', image: '/images/easy clean/easy clean.jpeg' },
    { name: 'Jelly Brushes', value: 'jelly', icon: '🫧', tone: 'from-purple-100 to-violet-50', image: '/images/jelly/jelly.jpeg' },
    { name: 'Kitty Puf', value: 'kitty-puf', icon: '🐱', tone: 'from-pink-100 to-rose-50', image: '/images/kitty puf/WhatsApp Image 2025-12-26 at 15.30.28.jpeg' },
    { name: 'Love Collection', value: 'love', icon: '❤️', tone: 'from-red-100 to-rose-50', image: '/images/love/WhatsApp Image 2025-12-26 at 15.30.27.jpeg' },
    { name: 'Makaron', value: 'makaron', icon: '🧁', tone: 'from-pink-100 to-amber-50', image: '/images/makaron/makaron.jpeg' },
    { name: 'Miracle', value: 'miracle', icon: '⭐', tone: 'from-yellow-100 to-amber-50', image: '/images/miracle/Miracle.jpeg' },
    { name: 'Mirror Shine', value: 'mirror', icon: '💫', tone: 'from-slate-100 to-slate-50', image: '/images/mirror/Mirror.jpeg' },
    { name: 'Multy Color', value: 'multy', icon: '🌈', tone: 'from-indigo-100 to-purple-50', image: '/images/multy/multy.jpeg' },
    { name: 'Pro Puf', value: 'pro-puf', icon: '☁️', tone: 'from-white to-slate-50', image: '/images/pro puf/pro puf.jpeg' },
    { name: 'Self Cleaning', value: 'self-cleaning', icon: '🔄', tone: 'from-green-100 to-emerald-50', image: '/images/self cleaning/self cleaning.jpeg' },
    { name: 'Shiny', value: 'shiny', icon: '✨', tone: 'from-yellow-100 to-amber-50', image: '/images/shiny/shinyy.jpeg' },
    { name: 'Smiley', value: 'smiley', icon: '😊', tone: 'from-yellow-100 to-amber-50', image: '/images/smiley/smiley.jpeg' },
    { name: 'Twist', value: 'twist', icon: '🌀', tone: 'from-violet-100 to-purple-50', image: '/images/twist/twist.jpeg' },
    { name: 'Combs', value: 'comb', icon: '〰️', tone: 'from-violet-100 to-purple-50', image: '/images/curly/curlyy.jpeg' },
    { name: 'Detangler', value: 'detangler', icon: '🪮', tone: 'from-teal-100 to-cyan-50', image: '/images/makaron/makaronnnn.jpeg' },
    { name: 'Basmati Rice', value: 'basmati-rice', icon: '🍚', tone: 'from-yellow-100 to-amber-50', image: '/images/rice/images-1.jpeg' },
    { name: 'Brown Rice', value: 'brown-rice', icon: '🌾', tone: 'from-lime-100 to-emerald-50', image: '/images/rice/images-2.jpeg' },
    { name: 'Jasmine Rice', value: 'jasmine-rice', icon: '🌼', tone: 'from-orange-100 to-yellow-50', image: '/images/rice/images-1.jpeg' },
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

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {categoryCards.map((category) => (
                        <Link
                            key={category.value}
                            href={`/products?category=${category.value}`}
                            className="group"
                        >
                            <div className={`rounded-2xl bg-gradient-to-br ${category.tone} p-2 text-center transition shadow-sm hover:shadow-soft overflow-hidden`}>
                                {/* Category Image */}
                                <div className="aspect-square mb-2 rounded-xl overflow-hidden bg-white">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="text-2xl mb-1 group-hover:scale-110 transition">
                                    {category.icon}
                                </div>
                                <h3 className="font-semibold text-slate-800 text-xs mb-1">
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
