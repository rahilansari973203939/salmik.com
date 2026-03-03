'use client';

import { useState } from 'react';
import { formatCurrency } from '@/utils/helpers';

const categoryOptions = [
    { label: 'Paddle Brushes', value: 'paddle-brush', parent: 'brushes', image: '/images/makaron/makaron.jpeg' },
    { label: 'Round Brushes', value: 'round-brush', parent: 'brushes', image: '/images/curly/curly.jpeg' },
    { label: 'Curly Brushes', value: 'curly', parent: 'brushes', image: '/images/curly/curlyy.jpeg' },
    { label: 'Detanglers', value: 'detangling-brush', parent: 'brushes', image: '/images/jelly/jellyyyy.jpeg' },
    { label: 'Easy Clean', value: 'easy-clean', parent: 'brushes', image: '/images/easy clean/easy clean.jpeg' },
    { label: 'Jelly Brushes', value: 'jelly', parent: 'brushes', image: '/images/jelly/jelly.jpeg' },
    { label: 'Kitty Puf', value: 'kitty-puf', parent: 'brushes', image: '/images/kitty puf/WhatsApp Image 2025-12-26 at 15.30.28.jpeg' },
    { label: 'Love Collection', value: 'love', parent: 'brushes', image: '/images/love/WhatsApp Image 2025-12-26 at 15.30.27.jpeg' },
    { label: 'Makaron', value: 'makaron', parent: 'brushes', image: '/images/makaron/makaron.jpeg' },
    { label: 'Miracle', value: 'miracle', parent: 'brushes', image: '/images/miracle/Miracle.jpeg' },
    { label: 'Mirror Shine', value: 'mirror', parent: 'brushes', image: '/images/mirror/Mirror.jpeg' },
    { label: 'Multy Color', value: 'multy', parent: 'brushes', image: '/images/multy/multy.jpeg' },
    { label: 'Pro Puf', value: 'pro-puf', parent: 'brushes', image: '/images/pro puf/pro puf.jpeg' },
    { label: 'Self Cleaning', value: 'self-cleaning', parent: 'brushes', image: '/images/self cleaning/self cleaning.jpeg' },
    { label: 'Shiny', value: 'shiny', parent: 'brushes', image: '/images/shiny/shinyy.jpeg' },
    { label: 'Smiley', value: 'smiley', parent: 'brushes', image: '/images/smiley/smiley.jpeg' },
    { label: 'Twist', value: 'twist', parent: 'brushes', image: '/images/twist/twist.jpeg' },
    { label: 'Detangler', value: 'detangler', parent: 'brushes', image: '/images/jelly/jelly.jpeg' },
    { label: 'Combs', value: 'comb', parent: 'brushes', image: '/images/twist/twist.jpeg' },
    { label: 'Basmati Rice', value: 'basmati-rice', parent: 'rice', image: '/images/rice/images-1.jpeg' },
    { label: 'Brown Rice', value: 'brown-rice', parent: 'rice', image: '/images/rice/images-2.jpeg' },
    { label: 'Jasmine Rice', value: 'jasmine-rice', parent: 'rice', image: '/images/rice/images-1.jpeg' },
];

const mainCategories = [
    { label: 'All Products', value: '' },
    { label: 'Brushes', value: 'brushes' },
    { label: 'Rice', value: 'rice' },
];

export default function FilterSidebar({
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleMainCategoryChange = (value) => {
        if (value === '') {
            onCategoryChange(null);
        } else if (value === 'brushes') {
            // Show all brush products when "Brushes" is selected
            onCategoryChange('brushes');
        } else if (value === 'rice') {
            // Show all rice products when "Rice" is selected
            onCategoryChange('rice');
        } else {
            onCategoryChange(value);
        }
    };

    const getSelectedMainCategory = () => {
        if (!selectedCategory) return '';
        const brushCategories = ['paddle-brush', 'round-brush', 'curly', 'detangling-brush', 'easy-clean', 'jelly', 'kitty-puf', 'love', 'makaron', 'miracle', 'mirror', 'multy', 'pro-puf', 'self-cleaning', 'shiny', 'smiley', 'twist', 'detangler', 'comb'];
        if (brushCategories.includes(selectedCategory)) {
            return 'brushes';
        }
        if (selectedCategory.includes('rice')) {
            return 'rice';
        }
        return '';
    };

    const selectedMainCategory = getSelectedMainCategory();

    const getSubCategories = () => {
        if (!selectedMainCategory) return categoryOptions;
        return categoryOptions.filter(c => c.parent === selectedMainCategory);
    };

    // Filter Button for Mobile
    const MobileFilterButton = () => (
        <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
        </button>
    );

    // Desktop Sidebar
    const DesktopSidebar = () => (
        <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 sticky top-20 h-fit border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Filters</h3>

            <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                    Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) =>
                        onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-brand"
                />
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Categories</h4>
                <div className="space-y-2">
                    {mainCategories.map((category) => (
                        <label key={category.value} className="flex items-center text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-brand">
                            <input
                                type="radio"
                                name="mainCategory"
                                value={category.value}
                                checked={selectedMainCategory === category.value || (category.value === '' && !selectedCategory)}
                                onChange={(e) => handleMainCategoryChange(e.target.value)}
                                className="mr-2"
                            />
                            {category.label}
                        </label>
                    ))}
                </div>
            </div>

            {selectedMainCategory && (
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        {selectedMainCategory === 'brushes' ? 'Brush Types' : 'Rice Types'}
                    </h4>
                    <div className="space-y-2">
                        {getSubCategories().map((category) => (
                            <label key={category.value} className="flex items-center text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-brand">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.value}
                                    checked={selectedCategory === category.value}
                                    onChange={(e) => onCategoryChange(e.target.value)}
                                    className="mr-2"
                                />
                                {category.label}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // Mobile Filter Drawer (Amazon/Myntra Style)
    const MobileFilterDrawer = () => (
        <>
            {/* Overlay */}
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsFilterOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-white dark:bg-slate-900 z-50 transform transition-transform duration-300 lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h3>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Filter Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={priceRange[1]}
                                onChange={(e) =>
                                    onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
                                }
                                className="w-full accent-brand"
                            />
                        </div>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Categories</h4>
                            <div className="space-y-2">
                                {mainCategories.map((category) => (
                                    <label key={category.value} className="flex items-center text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-brand">
                                        <input
                                            type="radio"
                                            name="mainCategoryMobile"
                                            value={category.value}
                                            checked={selectedMainCategory === category.value || (category.value === '' && !selectedCategory)}
                                            onChange={(e) => handleMainCategoryChange(e.target.value)}
                                            className="mr-2"
                                        />
                                        {category.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {selectedMainCategory && (
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                    {selectedMainCategory === 'brushes' ? 'Brush Types' : 'Rice Types'}
                                </h4>
                                <div className="space-y-2">
                                    {getSubCategories().map((category) => (
                                        <label key={category.value} className="flex items-center text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-brand">
                                            <input
                                                type="radio"
                                                name="categoryMobile"
                                                value={category.value}
                                                checked={selectedCategory === category.value}
                                                onChange={(e) => onCategoryChange(e.target.value)}
                                                className="mr-2"
                                            />
                                            {category.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
                        <button
                            onClick={() => {
                                onCategoryChange(null);
                                onPriceRangeChange([0, 5000]);
                            }}
                            className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-brand to-brand-dark text-white rounded-lg font-medium"
                        >
                            Show Results
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <MobileFilterButton />
            <DesktopSidebar />
            <MobileFilterDrawer />
        </>
    );
}
