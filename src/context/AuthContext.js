'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Failed to load user:', error);
            }
        }
        setIsLoading(false);
    }, []);

    const register = async (email, password, name) => {
        try {
            const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const exists = users.find((u) => u.email === email);
            if (exists) {
                return { success: false, error: 'Email already registered' };
            }

            // Mock registration
            const newUser = {
                id: Date.now().toString(),
                email,
                name,
                password, // In real app, password should be hashed
                createdAt: new Date().toISOString(),
            };

            localStorage.setItem('allUsers', JSON.stringify([newUser, ...users]));
            const sessionUser = { ...newUser, password: undefined };
            localStorage.setItem('user', JSON.stringify(sessionUser));
            setUser(sessionUser);
            return { success: true, user: newUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            // Mock login
            const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const existingUser = users.find((u) => u.email === email);

            if (!existingUser || existingUser.password !== password) {
                return { success: false, error: 'Invalid email or password' };
            }

            const sessionUser = { ...existingUser, password: undefined };
            localStorage.setItem('user', JSON.stringify(sessionUser));
            setUser(sessionUser);
            return { success: true, user: sessionUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const loginWithOtp = async (email) => {
        try {
            const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const existingUser = users.find((u) => u.email === email);
            if (!existingUser) {
                return { success: false, error: 'No account found for this email' };
            }
            const sessionUser = { ...existingUser, password: undefined };
            localStorage.setItem('user', JSON.stringify(sessionUser));
            setUser(sessionUser);
            return { success: true, user: sessionUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, register, login, loginWithOtp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
