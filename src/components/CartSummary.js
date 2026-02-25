'use client';

import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/helpers';

export default function CartSummary() {
    const { items, total } = useCart();

    if (items.length === 0) return null;

    return (
        <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>VAT (20%)</span>
                    <span>{formatCurrency(total * 0.20)}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-brand">{formatCurrency(total + total * 0.20)}</span>
                </div>
            </div>
        </div>
    );
}
