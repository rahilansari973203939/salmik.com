'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Contact Us</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Get in Touch</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" required />
                                <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" required />
                                <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows="5" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" required></textarea>
                                <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition">Send Message</button>
                            </form>
                        </div>

                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-8 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">Our Information</h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-300">
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
                                    <p>misbah@salmik.co.uk</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Phone</h3>
                                    <p>+44 7425 697500</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Address</h3>
                                    <p>Forbes Street, Aberdeen, United Kingdom, AB25 2WN</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Hours</h3>
                                    <p>Mon - Fri: 8am - 6pm PST</p>
                                    <p>Saturday: 9am - 2pm PST</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
