'use client';

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
    const handleMainCategoryChange = (value) => {
        if (value === '') {
            onCategoryChange(null);
        } else if (value === 'brushes') {
            onCategoryChange('paddle-brush');
        } else if (value === 'rice') {
            onCategoryChange('basmati-rice');
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

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-4 sm:p-6 sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto border border-slate-100 dark:border-slate-800">
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
}
