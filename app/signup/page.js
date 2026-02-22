'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
    const { register, isLoading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpValue, setOtpValue] = useState('');

    const sendOtp = () => {
        if (!formData.email) {
            setError('Enter your email to receive OTP.');
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setOtpSent(true);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!otpSent) {
            setError('Please verify OTP to continue.');
            return;
        }

        if (otpValue !== generatedOtp) {
            setError('Invalid OTP. Try again.');
            return;
        }

        try {
            const result = await register(formData.email, formData.password, formData.name);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.error || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
                    <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white mb-2 text-center">Create Account</h1>
                    <p className="text-center text-slate-500 mb-8">Join BrushRiceMart to start shopping.</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            required
                        />

                        <button
                            type="button"
                            onClick={sendOtp}
                            className="w-full px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition"
                        >
                            {otpSent ? 'Resend OTP' : 'Send OTP'}
                        </button>

                        {otpSent && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otpValue}
                                    onChange={(e) => setOtpValue(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                    required
                                />
                                <p className="text-xs text-slate-500 mt-2">Demo OTP: {generatedOtp}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition disabled:opacity-50"
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-600 dark:text-slate-300">
                            Already have an account?{' '}
                            <Link href="/login" className="text-brand font-semibold hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
