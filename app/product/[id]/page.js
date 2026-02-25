'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { formatCurrency } from '@/utils/helpers';

const reviewsData = [
    { name: 'Ananya', rating: 5, comment: 'Fantastic quality and very gentle on my hair.', date: 'Jan 18, 2026' },
    { name: 'Rohit', rating: 4, comment: 'Smooths frizz instantly and feels premium.', date: 'Jan 12, 2026' },
    { name: 'Sana', rating: 5, comment: 'Perfect grip and great for everyday use.', date: 'Jan 07, 2026' },
    { name: 'Meera', rating: 4, comment: 'Lovely finish, will buy again.', date: 'Dec 28, 2025' },
    { name: 'Karan', rating: 4, comment: 'Solid build and stylish look.', date: 'Dec 20, 2025' },
];

const brushColorImageMap = {
    black: '/images/Brush-images/images-1.jpeg',
    brown: '/images/Brush-images/images-2.jpeg',
    blue: '/images/Brush-images/images-3.jpeg',
    purple: '/images/Brush-images/images-4.jpeg',
    green: '/images/Brush-images/green-images/green-1.jpeg',
    pink: '/images/Brush-images/pink-images/pink-1.jpeg',
    yellow: '/images/Brush-images/yellow-images/yellow-1.jpeg',
    white: '/images/Brush-images/images-5.jpeg',
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { getProductById, getRelatedProducts, isLoading, products: allProducts } = useProducts();
    const { addToCart } = useCart();
    const product = getProductById?.(params.id);
    const [activeImage, setActiveImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const isBrushCategory = !!product?.category && product.category.includes('brush');
    const isRiceCategory = !!product?.category && product.category.includes('rice');

    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return getRelatedProducts(product.id, 4);
    }, [getRelatedProducts, product]);

    useEffect(() => {
        if (!product) return;
        const defaultImage = isBrushCategory
            ? (brushColorImageMap[product.color] || product.images?.[0] || product.image)
            : (product.images?.[0] || product.image);
        setActiveImage(defaultImage);
        setSelectedSize(product.sizes?.[0] || '');
        setSelectedColor(product.color || '');
    }, [product, isBrushCategory]);

    // Get available colors for this product category
    const availableColors = useMemo(() => {
        if (!allProducts || !product) return [];
        const colors = allProducts
            .filter(p => p.category === product.category)
            .map(p => p.color);
        const uniqueColors = [...new Set(colors)].filter(Boolean);

        if (isBrushCategory) {
            const mappedColors = Object.keys(brushColorImageMap);
            return [...new Set([...uniqueColors, ...mappedColors])];
        }

        return uniqueColors;
    }, [allProducts, product, isBrushCategory]);

    // Handle color click - update image to show selected color
    const handleColorClick = (color) => {
        setSelectedColor(color);
        if (isBrushCategory && brushColorImageMap[color]) {
            setActiveImage(brushColorImageMap[color]);
            return;
        }

        const colorProduct = allProducts?.find(p =>
            p.category === product?.category && p.color === color
        );
        if (colorProduct && colorProduct.images && colorProduct.images[0]) {
            setActiveImage(colorProduct.images[0]);
        } else if (colorProduct) {
            setActiveImage(colorProduct.image);
        }
    };

    if (isLoading) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                    <LoadingSpinner />
                </main>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white mb-4">Product Not Found</h1>
                        <Link href="/products" className="text-brand hover:underline">Back to Products</Link>
                    </div>
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
                    <Link href="/products" className="text-brand hover:underline mb-8 inline-block">← Back to Products</Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-slate-900 rounded-3xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
                        <div>
                            <div className={`bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden ${product.category?.includes('rice') ? 'h-[500px]' : 'h-96'}`}>
                                <img
                                    src={activeImage || product.image}
                                    alt={product.name}
                                    className={`h-full w-full ${product.category?.includes('rice') ? 'object-contain' : 'object-contain'}`}
                                />
                            </div>
                            <div className="mt-4 flex gap-3">
                                {(product.images || [product.image]).map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`h-16 w-16 rounded-xl border ${activeImage === img ? 'border-brand' : 'border-slate-200 dark:border-slate-700'} overflow-hidden`}
                                    >
                                        <img src={img} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-contain bg-white" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500 mb-2">BrushRiceMart</p>
                                <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-yellow-400">{'⭐'.repeat(Math.floor(product.rating || 0))}</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        {product.rating?.toFixed(1)} ({product.reviews} reviews)
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">{product.description}</p>

                                {!isRiceCategory ? (
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-3xl font-bold text-brand">{formatCurrency(product.price)}</span>
                                        {product.mrp && (
                                            <span className="text-lg text-slate-400 line-through">{formatCurrency(product.mrp)}</span>
                                        )}
                                        {product.mrp && (
                                            <span className="text-sm font-semibold text-emerald-600">
                                                Save {formatCurrency(product.mrp - product.price)}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-2xl font-bold text-brand">Coming Soon</span>
                                    </div>
                                )}

                                {(product.color || availableColors.length > 0) && (
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                                            Color: {selectedColor ? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1) : 'Select'}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {availableColors.slice(0, 8).map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => handleColorClick(color)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${selectedColor === color
                                                        ? 'border-brand bg-brand/10 text-brand'
                                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand hover:text-brand'
                                                        }`}
                                                >
                                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.sizes && (
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Size</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${selectedSize === size ? 'border-brand bg-brand/10 text-brand' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'} transition`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.features && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Why you&apos;ll love it</h3>
                                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300">
                                            {product.features.map((f) => <li key={f}>{f}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                {isRiceCategory ? (
                                    <button
                                        disabled
                                        className="w-full px-6 py-3 bg-slate-300 text-slate-500 rounded-xl font-semibold cursor-not-allowed"
                                    >
                                        Coming Soon
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-xl font-semibold hover:shadow-soft transition"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                addToCart(product);
                                                router.push('/checkout');
                                            }}
                                            className="w-full px-6 py-3 border border-brand text-brand rounded-xl font-semibold hover:bg-brand/10 transition text-center"
                                        >
                                            Buy Now
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <section className="mt-12">
                        <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-6">Reviews</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {reviewsData.map((review) => (
                                <div key={review.name} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">{review.name}</p>
                                        <span className="text-xs text-slate-500">{review.date}</span>
                                    </div>
                                    <div className="text-yellow-400 text-sm mb-2">{'⭐'.repeat(review.rating)}</div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-12">
                        <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => (
                                <ProductCard key={item.id} product={item} onAddToCart={() => addToCart(item)} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
