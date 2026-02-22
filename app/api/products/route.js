import { NextResponse } from 'next/server';

// GET /api/products - Get all products
export async function GET(request) {
    try {
        // In production, this would fetch from your backend database
        // For now, return a placeholder response
        const products = [
            {
                id: 1,
                name: 'Sample Product',
                price: 99.99,
                description: 'This is a sample product',
                category: 'brushes',
                image: '/images/sample.jpg',
                stock: 10,
                rating: 4.5,
                createdAt: new Date().toISOString(),
            },
        ];

        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST /api/products - Create a new product (admin)
export async function POST(request) {
    try {
        const body = await request.json();

        // In production, this would save to your backend database
        const newProduct = {
            id: Date.now(),
            ...body,
            createdAt: new Date().toISOString(),
        };

        return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create product' },
            { status: 500 }
        );
    }
}
