'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '@/services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: null,
        priceRange: [100, 2000],
        rating: 0,
        searchQuery: '',
    });
    const [sortBy, setSortBy] = useState('newest');

    // Load products on mount
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const loadedProducts = await getProducts();
                setProducts(loadedProducts || []);
                setFilteredProducts(loadedProducts || []);
            } catch (error) {
                console.error('Failed to load products:', error);
                setProducts([]);
                setFilteredProducts([]);
            }
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    // Define brush categories (all brush types)
    const brushCategories = [
        'paddle-brush', 'round-brush', 'curly', 'detangling-brush',
        'easy-clean', 'jelly', 'kitty-puf', 'love', 'makaron',
        'miracle', 'mirror', 'multy', 'pro-puf', 'self-cleaning',
        'shiny', 'smiley', 'twist', 'detangler', 'comb'
    ];

    // Define rice categories
    const riceCategories = ['basmati-rice', 'brown-rice', 'jasmine-rice'];

    // Apply filters and sorting
    useEffect(() => {
        let filtered = [...products];

        // Search filter
        if (filters.searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
            );
        }

        // Category filter with proper brush/rice separation
        if (filters.category) {
            // If selected category is a brush category
            if (brushCategories.includes(filters.category)) {
                filtered = filtered.filter(product => product.category === filters.category);
            }
            // If selected category is a rice category
            else if (riceCategories.includes(filters.category)) {
                filtered = filtered.filter(product => product.category === filters.category);
            }
            // Legacy support for 'rice' selection
            else if (filters.category === 'rice') {
                filtered = filtered.filter(product => riceCategories.includes(product.category));
            }
            // Legacy support for 'brushes' selection
            else if (filters.category === 'brushes') {
                filtered = filtered.filter(product => brushCategories.includes(product.category));
            }
            // For any other category
            else {
                filtered = filtered.filter(product => product.category === filters.category);
            }
        }

        // Price filter
        filtered = filtered.filter(
            product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        // Rating filter
        if (filters.rating > 0) {
            filtered = filtered.filter(product => (product.rating || 0) >= filters.rating);
        }

        // Sorting
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [products, filters, sortBy]);

    const updateFilter = (filterKey, value) => {
        setFilters(prev => ({
            ...prev,
            [filterKey]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            category: null,
            priceRange: [100, 2000],
            rating: 0,
            searchQuery: '',
        });
        setSortBy('newest');
    };

    // Get product by ID - handles both string and number IDs
    const getProductById = (id) => {
        const idStr = String(id);
        const idNum = parseInt(id);
        return products.find(product =>
            String(product.id) === idStr ||
            product.id === idNum ||
            product.id === id
        );
    };

    // Get related products - same category, excluding current product
    const getRelatedProducts = (productId, limit = 4) => {
        const product = getProductById(productId);
        if (!product) return [];

        return products
            .filter(
                p => p.category === product.category && String(p.id) !== String(productId)
            )
            .slice(0, limit);
    };

    // Get products by category
    const getProductsByCategory = (category) => {
        return products.filter(p => p.category === category);
    };

    // Check if product is rice category
    const isRiceProduct = (productId) => {
        const product = getProductById(productId);
        return product?.category?.includes('rice');
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                filteredProducts,
                isLoading,
                filters,
                sortBy,
                updateFilter,
                resetFilters,
                setSortBy,
                getProductById,
                getRelatedProducts,
                getProductsByCategory,
                isRiceProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within ProductProvider');
    }
    return context;
};
