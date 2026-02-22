'use client';

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';

export function ClientProvider({ children }) {
    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
}
