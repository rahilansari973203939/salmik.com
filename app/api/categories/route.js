import { NextResponse } from 'next/server';

// GET /api/categories - Get all product categories
export async function GET(request) {
    try {
        // In production, this would fetch from your backend database
        const categories = [
            { id: 1, name: 'Brushes', slug: 'brushes', image: '/images/brushes.jpg' },
            { id: 2, name: 'Hair Care', slug: 'hair-care', image: '/images/hair-care.jpg' },
            { id: 3, name: 'Accessories', slug: 'accessories', image: '/images/accessories.jpg' },
        ];

        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}
