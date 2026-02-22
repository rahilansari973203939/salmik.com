'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
    items: [],
    total: 0,
    itemCount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                            : item
                    ),
                    total: state.total + (action.payload.price * (action.payload.quantity || 1)),
                    itemCount: state.itemCount + (action.payload.quantity || 1),
                };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
                total: state.total + (action.payload.price * (action.payload.quantity || 1)),
                itemCount: state.itemCount + (action.payload.quantity || 1),
            };
        }

        case 'UPDATE_QUANTITY': {
            const item = state.items.find(item => item.id === action.payload.id);
            if (!item) return state;

            const quantityDifference = action.payload.quantity - item.quantity;
            const priceDifference = item.price * quantityDifference;

            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id),
                    total: Math.max(0, state.total - item.price * item.quantity),
                    itemCount: Math.max(0, state.itemCount - item.quantity),
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
                total: state.total + priceDifference,
                itemCount: state.itemCount + quantityDifference,
            };
        }

        case 'REMOVE_FROM_CART': {
            const item = state.items.find(item => item.id === action.payload);
            if (!item) return state;

            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                total: Math.max(0, state.total - item.price * item.quantity),
                itemCount: Math.max(0, state.itemCount - item.quantity),
            };
        }

        case 'CLEAR_CART':
            return initialState;

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product, quantity = 1) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, quantity },
        });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: productId, quantity },
        });
    };

    const removeFromCart = (productId) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: productId,
        });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
