// Routes Configuration
export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id) => `/product/${id}`,
    CART: '/cart',
    CHECKOUT: '/checkout',
    MY_ORDERS: '/my-orders',
    LOGIN: '/login',
    REGISTER: '/signup',
    ABOUT: '/about',
    CONTACT: '/contact',
    ORDER_CONFIRMATION: '/order-confirmation',
    ADMIN: {
        DASHBOARD: '/admin',
        PRODUCTS: '/admin/products',
        ORDERS: '/admin/orders',
        CUSTOMERS: '/admin/customers',
    },
};

// Price Constants
export const PRICE = {
    MIN: 100,
    MAX: 2000,
    TAX_RATE: 0.18,
    SHIPPING_FREE_ABOVE: 500,
    SHIPPING_COST: 0,
};

// Order Status
export const ORDER_STATUS = {
    PENDING: 'pending',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
    RAZORPAY: 'razorpay',
    COD: 'cod',
};

// Product Categories
export const CATEGORIES = [
    { id: 'paddle-brush', name: 'Paddle Brushes', icon: '🪮' },
    { id: 'round-brush', name: 'Round Brushes', icon: '🌀' },
    { id: 'detangling-brush', name: 'Detangling Brushes', icon: '✨' },
    { id: 'basmati-rice', name: 'Basmati Rice', icon: '🍚' },
    { id: 'brown-rice', name: 'Brown Rice', icon: '🌾' },
    { id: 'jasmine-rice', name: 'Jasmine Rice', icon: '🌼' },
];

// Messages
export const MESSAGES = {
    LOADING: 'Loading...',
    ERROR: 'Something went wrong. Please try again.',
    SUCCESS: 'Success!',
    CART_UPDATED: 'Cart updated',
    ITEM_ADDED: 'Item added to cart',
    ITEM_REMOVED: 'Item removed from cart',
    ORDER_PLACED: 'Order placed successfully',
    LOGIN_REQUIRED: 'Please login to continue',
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
    PRODUCTS: '/api/products',
    ORDERS: '/api/orders',
    CUSTOMERS: '/api/customers',
    AUTH: '/api/auth',
};
