import { NextResponse } from 'next/server';

// GET /api/products/[id] - Get product by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        // In production, this would fetch from your backend database
        // Mock product for demo
        const product = {
            id: parseInt(id),
            name: 'Sample Product',
            price: 99.99,
            description: 'This is a sample product description',
            category: 'brushes',
            image: '/images/sample.jpg',
            stock: 10,
            rating: 4.5,
            createdAt: new Date().toISOString(),
        };

        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Product not found' },
            { status: 404 }
        );
    }
}

// PUT /api/products/[id] - Update product (admin)
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        // In production, this would update in your backend database
        const updatedProduct = {
            id: parseInt(id),
            ...body,
            updatedAt: new Date().toISOString(),
        };

        return NextResponse.json({ success: true, data: updatedProduct });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE /api/products/[id] - Delete product (admin)
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // In production, this would delete from your backend database

        return NextResponse.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
