'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getProducts, getCategories } from '@/services/api';

function ProductsContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Get category from URL on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        if (selectedCategory) {
            if (selectedCategory === 'rice') {
                if (!product.category?.includes('rice')) return false;
            } else if (product.category !== selectedCategory) {
                return false;
            }
        }
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0;
        }
    });

    // Get category display name
    const getCategoryDisplayName = (category) => {
        const names = {
            'paddle-brush': 'Paddle Brushes',
            'round-brush': 'Round Brushes',
            'detangling-brush': 'Detangling Brushes',
            'comb': 'Combs',
            'rice': 'Rice',
            'basmati-rice': 'Basmati Rice',
            'brown-rice': 'Brown Rice',
            'jasmine-rice': 'Jasmine Rice'
        };
        return names[category] || category;
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white mb-8">
                    {selectedCategory ? getCategoryDisplayName(selectedCategory) : 'All Products'}
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <FilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                    />

                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {sortedProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-slate-500 dark:text-slate-400">No products found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ProductsPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
                <ProductsContent />
            </Suspense>
            <Footer />
        </>
    );
}
