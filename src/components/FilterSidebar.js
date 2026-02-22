'use client';

const categoryOptions = [
    { label: 'Paddle Brushes', value: 'paddle-brush' },
    { label: 'Round Brushes', value: 'round-brush' },
    { label: 'Detangling Brushes', value: 'detangling-brush' },
    { label: 'Combs', value: 'comb' },
    { label: 'All Rice', value: 'rice' },
    { label: 'Basmati Rice', value: 'basmati-rice' },
    { label: 'Brown Rice', value: 'brown-rice' },
    { label: 'Jasmine Rice', value: 'jasmine-rice' },
];

export default function FilterSidebar({
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
}) {

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-4 sm:p-6 sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Filters</h3>

            <div className="mb-6">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                    Price Range: £{priceRange[0]} - £{priceRange[1]}
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
                    <label className="flex items-center text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-brand">
                        <input
                            type="radio"
                            name="category"
                            value=""
                            checked={!selectedCategory}
                            onChange={() => onCategoryChange(null)}
                            className="mr-2"
                        />
                        All Categories
                    </label>
                    {categoryOptions.map((category) => (
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
        </div>
    );
}
