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

        // Category filter
        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
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

    const getProductById = (id) => {
        return products.find(product => product.id === parseInt(id));
    };

    const getRelatedProducts = (productId, limit = 4) => {
        const product = getProductById(productId);
        if (!product) return [];

        return products
            .filter(
                p => p.category === product.category && p.id !== productId
            )
            .slice(0, limit);
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
