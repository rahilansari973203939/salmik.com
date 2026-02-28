'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const { login, loginWithOtp, isLoading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [useOtp, setUseOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpValue, setOtpValue] = useState('');
    const [error, setError] = useState('');
    const [sendingOtp, setSendingOtp] = useState(false);

    // Check if email is registered in the system
    const checkEmailRegistered = (email) => {
        if (!email) return false;
        const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const exists = users.some((u) => u.email === email);

        // Also check for admin email
        if (email === 'admin@salmik.com') return true;

        return exists;
    };

    const sendOtp = async () => {
        setError('');

        if (!formData.email) {
            setError('Please enter your email address.');
            return;
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Check if email is registered before sending OTP
        if (!checkEmailRegistered(formData.email)) {
            setError('This email is not registered. Please sign up first.');
            return;
        }

        setSendingOtp(true);

        // Simulate sending OTP to email (in production, this would call an API)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setOtpSent(true);
        setSendingOtp(false);
        setError('');

        // In production, you would send this OTP via email service
        console.log(`OTP sent to ${formData.email}: ${otp}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (useOtp) {
            if (!otpSent) {
                setError('Please send OTP first by clicking the button below.');
                return;
            }

            if (!otpValue) {
                setError('Please enter the OTP sent to your email.');
                return;
            }

            if (otpValue !== generatedOtp) {
                setError('Invalid OTP. Please check and try again.');
                return;
            }

            // Verify email is registered before OTP login
            if (!checkEmailRegistered(formData.email)) {
                setError('This email is not registered. Please sign up first.');
                return;
            }

            const result = await loginWithOtp(formData.email);
            if (result.success) {
                // Check if user is admin and redirect accordingly
                if (result.user?.role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            } else {
                setError(result.error || 'OTP login failed.');
            }
            return;
        }

        // Check if email is registered before password login
        if (!checkEmailRegistered(formData.email)) {
            setError('This email is not registered. Please sign up first.');
            return;
        }

        const result = await login(formData.email, formData.password);
        if (result.success) {
            // Check if user is admin and redirect accordingly
            if (result.user?.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } else {
            setError(result.error || 'Login failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
                    <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white mb-2 text-center">Welcome Back</h1>
                    <p className="text-center text-slate-500 mb-8">Login to continue shopping.</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                // Reset OTP if email changes
                                if (otpSent) {
                                    setOtpSent(false);
                                    setOtpValue('');
                                }
                            }}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                        />

                        {!useOtp && (
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                required
                            />
                        )}

                        {useOtp && (
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    onClick={sendOtp}
                                    disabled={sendingOtp || otpSent}
                                    className="w-full px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition disabled:opacity-50"
                                >
                                    {sendingOtp ? 'Sending OTP...' : otpSent ? 'OTP Sent ✓' : 'Send OTP to Email'}
                                </button>
                                {otpSent && (
                                    <>
                                        <p className="text-sm text-green-600 dark:text-green-400">
                                            ✓ OTP has been sent to your email: {formData.email}
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter OTP from your email"
                                            value={otpValue}
                                            onChange={(e) => setOtpValue(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                            required
                                        />
                                        <p className="text-xs text-slate-500">Demo OTP: {generatedOtp}</p>
                                    </>
                                )}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading || (useOtp && !otpSent)} className="w-full px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition disabled:opacity-50">
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <div className="mt-4 flex items-center justify-between text-sm">
                        <button
                            type="button"
                            onClick={() => {
                                setUseOtp(!useOtp);
                                setOtpSent(false);
                                setOtpValue('');
                                setError('');
                            }}
                            className="text-brand font-semibold hover:underline"
                        >
                            {useOtp ? 'Use password instead' : 'Use OTP instead'}
                        </button>
                        <Link href="/signup" className="text-slate-600 dark:text-slate-300 hover:text-brand">
                            Create account
                        </Link>
                    </div>

                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                        <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                            <span className="font-semibold">Admin Login:</span><br />
                            Email: admin@salmik.com<br />
                            Password: admin123
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
