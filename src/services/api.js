// ============================================
// CONFIGURATION
// ============================================
// Set USE_BACKEND = true when you connect your backend
// Set USE_BACKEND = false to use localStorage (current behavior)
export const USE_BACKEND = false;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ============================================
// LOCAL STORAGE HELPERS (Fallback Mode)
// ============================================
import productsData from '@/data/products.json';

const PRODUCTS_KEY = 'products';
const PRODUCTS_VERSION_KEY = 'productsVersion';
const PRODUCTS_VERSION = 3;
const ORDERS_KEY = 'orders';
const USERS_KEY = 'allUsers';

const safeParse = (value, fallback) => {
    try {
        const parsed = JSON.parse(value);
        return parsed ?? fallback;
    } catch (error) {
        return fallback;
    }
};

const ensureProducts = () => {
    if (typeof window === 'undefined') return productsData;
    const storedVersion = parseInt(localStorage.getItem(PRODUCTS_VERSION_KEY) || '0', 10);
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored || storedVersion !== PRODUCTS_VERSION) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsData));
        localStorage.setItem(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION.toString());
        return productsData;
    }
    const parsed = safeParse(stored, productsData);
    if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsData));
        localStorage.setItem(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION.toString());
        return productsData;
    }
    return parsed;
};

const setProducts = (products) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// ============================================
// API HELPER FUNCTIONS
// ============================================
const apiFetch = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'API request failed');
    }
    return data;
};

// ============================================
// PRODUCTS API
// ============================================
export const getProducts = async () => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/products');
        return response.data;
    }
    return ensureProducts();
};

export const getProductById = async (id) => {
    if (USE_BACKEND) {
        const response = await apiFetch(`/api/products/${id}`);
        return response.data;
    }
    return ensureProducts().find(product => product.id === parseInt(id));
};

export const getCategories = async () => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/categories');
        return response.data;
    }
    const categories = new Set(ensureProducts().map(p => p.category));
    return Array.from(categories);
};

export const createProduct = async (productData) => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(productData),
        });
        return response.data;
    }
    const products = ensureProducts();
    const newProduct = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        stock: 0,
        ...productData,
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    return newProduct;
};

export const updateProduct = async (id, updates) => {
    if (USE_BACKEND) {
        const response = await apiFetch(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
        return response.data;
    }
    const products = ensureProducts();
    const updated = products.map(product =>
        product.id === id ? { ...product, ...updates } : product
    );
    setProducts(updated);
    return updated.find(product => product.id === id);
};

export const deleteProduct = async (id) => {
    if (USE_BACKEND) {
        await apiFetch(`/api/products/${id}`, {
            method: 'DELETE',
        });
        return true;
    }
    const products = ensureProducts();
    const updated = products.filter(product => product.id !== id);
    setProducts(updated);
    return updated;
};

// Orders API
export const getOrders = (userId = null) => {
    if (typeof window === 'undefined') return [];
    const orders = safeParse(localStorage.getItem(ORDERS_KEY) || '[]', []);
    if (userId) {
        return orders.filter(order => order.userId === userId);
    }
    return orders;
};

export const createOrder = (orderData) => {
    if (typeof window === 'undefined') return null;
    const orders = safeParse(localStorage.getItem(ORDERS_KEY) || '[]', []);
    const newOrder = {
        id: Date.now().toString(),
        orderNumber: `BRM-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending',
    };
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
    if (typeof window === 'undefined') return null;
    const orders = safeParse(localStorage.getItem(ORDERS_KEY) || '[]', []);
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
        return orders[orderIndex];
    }
    return null;
};

// Admin Dashboard API
export const getDashboardStats = () => {
    if (typeof window === 'undefined') return { totalSales: 0, todayOrders: 0, totalOrders: 0, lowStockProducts: [] };
    const orders = safeParse(localStorage.getItem(ORDERS_KEY) || '[]', []);
    const today = new Date().toDateString();

    const todayOrders = orders.filter(
        order => new Date(order.createdAt).toDateString() === today
    );

    const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const lowStockProducts = ensureProducts().filter(p => p.stock < 10);

    return {
        totalSales,
        todayOrders: todayOrders.length,
        totalOrders: orders.length,
        lowStockProducts,
    };
};

// Customers API
export const getCustomers = () => {
    if (typeof window === 'undefined') return [];
    const users = safeParse(localStorage.getItem(USERS_KEY) || '[]', []);
    return users;
};

// Tracking
export const getTrackingInfo = (orderId) => {
    if (typeof window === 'undefined') return null;
    const orders = safeParse(localStorage.getItem(ORDERS_KEY) || '[]', []);
    const order = orders.find(o => o.id === orderId);

    if (!order) return null;

    const statuses = {
        pending: { step: 1, label: 'Order Confirmed' },
        shipped: { step: 2, label: 'Shipped' },
        delivered: { step: 3, label: 'Delivered' },
    };

    return {
        ...order,
        currentStep: statuses[order.status]?.step || 1,
        statusLabel: statuses[order.status]?.label || 'Pending',
    };
};

// Search API
export const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return ensureProducts().filter(
        product =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery)
    );
};

// Filter API
export const filterProducts = (filters) => {
    let filtered = [...ensureProducts()];

    if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.priceRange) {
        filtered = filtered.filter(
            p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );
    }

    if (filters.rating) {
        filtered = filtered.filter(p => (p.rating || 0) >= filters.rating);
    }

    return filtered;
};

// ============================================
// CART API
// ============================================
export const getCart = async () => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/cart');
        return response.data;
    }
    if (typeof window === 'undefined') return { items: [], total: 0, itemCount: 0 };
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [], total: 0, itemCount: 0 };
};

export const addToCart = async (product, quantity = 1) => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify({ productId: product.id, quantity }),
        });
        return response.data;
    }
    // Fallback to localStorage
    if (typeof window === 'undefined') return null;
    const cart = await getCart();
    const existingItem = cart.items.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ ...product, quantity });
    }

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

export const updateCartQuantity = async (productId, quantity) => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/cart', {
            method: 'PUT',
            body: JSON.stringify({ productId, quantity }),
        });
        return response.data;
    }
    if (typeof window === 'undefined') return null;
    const cart = await getCart();
    const item = cart.items.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            cart.items = cart.items.filter(item => item.id !== productId);
        } else {
            item.quantity = quantity;
        }
    }

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

export const removeFromCart = async (productId) => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/cart', {
            method: 'DELETE',
            body: JSON.stringify({ productId }),
        });
        return response.data;
    }
    if (typeof window === 'undefined') return null;
    const cart = await getCart();
    cart.items = cart.items.filter(item => item.id !== productId);

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

// ============================================
// CHECKOUT API
// ============================================
export const processCheckout = async (checkoutData) => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(checkoutData),
        });
        return response.data;
    }
    // Fallback: create order directly
    return createOrder(checkoutData);
};

// ============================================
// CONTACT API
// ============================================
export const submitContactForm = async (formData) => {
    if (USE_BACKEND) {
        const response = await apiFetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        return response.data;
    }
    // Fallback: just return success
    return {
        id: Date.now(),
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
    };
};
