// Utility function to format currency
export function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

// Utility function to format date
export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Utility function to calculate discount percentage
export function getDiscountPercent(originalPrice, salePrice) {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Utility function for local storage with error handling
export const storage = {
    getItem: (key, defaultValue = null) => {
        if (typeof window === 'undefined') return defaultValue;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading from localStorage: ${key}`, error);
            return defaultValue;
        }
    },

    setItem: (key, value) => {
        if (typeof window === 'undefined') return false;
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage: ${key}`, error);
            return false;
        }
    },

    removeItem: (key) => {
        if (typeof window === 'undefined') return false;
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing from localStorage: ${key}`, error);
            return false;
        }
    },

    clear: () => {
        if (typeof window === 'undefined') return false;
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage', error);
            return false;
        }
    },
};

// Utility function for debouncing
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function for validating email
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function for validating phone number
export function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Utility function for truncating text
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Utility function to check if an object is empty
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
