'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-8">Contact Us</h1>

                    {/* Search Option */}
                    <div className="mb-8">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition"
                            >
                                Search
                            </button>
                        </form>
                    </div>

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

                    {/* Google Map - Now at the bottom */}
                    <div className="mt-8">
                        <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2157.482737839594!2d-2.1028!3d57.1497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTfCsDA4JzU0LjAiTiAywrAwNic1Mi4xJcKWMDDCsTA0JzAwLjAiVw!5e0!3m2!1sen!2suk!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Our Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
