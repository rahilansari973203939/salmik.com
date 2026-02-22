import { NextResponse } from 'next/server';

// POST /api/auth/register - Register a new user
export async function POST(request) {
    try {
        const body = await request.json();
        const { action, email, password, name } = body;

        if (action === 'register') {
            // In production, this would:
            // 1. Validate the input
            // 2. Check if user already exists in database
            // 3. Hash the password
            // 4. Save to database

            const newUser = {
                id: Date.now().toString(),
                email,
                name,
                createdAt: new Date().toISOString(),
            };

            // Return user without password
            const { password: _, ...userWithoutPassword } = newUser;

            return NextResponse.json({
                success: true,
                data: { user: userWithoutPassword },
                message: 'User registered successfully'
            }, { status: 201 });
        }

        if (action === 'login') {
            // In production, this would:
            // 1. Find user by email
            // 2. Compare hashed password
            // 3. Generate JWT token

            // Mock user for demo
            const user = {
                id: '1',
                email,
                name: 'Demo User',
                token: 'mock-jwt-token-' + Date.now(),
            };

            return NextResponse.json({
                success: true,
                data: { user },
                message: 'Login successful'
            });
        }

        if (action === 'logout') {
            // In production, this would:
            // 1. Invalidate the JWT token

            return NextResponse.json({
                success: true,
                message: 'Logout successful'
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Authentication failed' },
            { status: 500 }
        );
    }
}

// GET /api/auth - Get current user (protected route)
export async function GET(request) {
    try {
        // In production, this would:
        // 1. Verify JWT token from header
        // 2. Fetch user from database

        // Mock user for demo
        const user = {
            id: '1',
            email: 'user@example.com',
            name: 'Demo User',
        };

        return NextResponse.json({ success: true, data: { user } });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }
}
