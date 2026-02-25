'use client';

import { formatCurrency } from '@/utils/helpers';

const categoryOptions = [
    { label: 'Paddle Brushes', value: 'paddle-brush', parent: 'brushes' },
    { label: 'Round Brushes', value: 'round-brush', parent: 'brushes' },
    { label: 'Detangling Brushes', value: 'detangling-brush', parent: 'brushes' },
    { label: 'Combs', value: 'comb', parent: 'brushes' },
    { label: 'Basmati Rice', value: 'basmati-rice', parent: 'rice' },
    { label: 'Brown Rice', value: 'brown-rice', parent: 'rice' },
    { label: 'Jasmine Rice', value: 'jasmine-rice', parent: 'rice' },
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
    // Handle main category selection (Brushes or Rice)
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

    // Determine which main category is currently selected
    const getSelectedMainCategory = () => {
        if (!selectedCategory) return '';
        if (['paddle-brush', 'round-brush', 'detangling-brush', 'comb'].includes(selectedCategory)) {
            return 'brushes';
        }
        if (selectedCategory.includes('rice')) {
            return 'rice';
        }
        return '';
    };

    const selectedMainCategory = getSelectedMainCategory();

    // Filter sub-categories based on main category
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

            {/* Sub-categories based on main selection */}
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
