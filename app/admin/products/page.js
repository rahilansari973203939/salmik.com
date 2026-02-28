'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/services/api';
import { formatCurrency } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';

const categoryOptions = [
    { label: 'Paddle Brush', value: 'paddle-brush' },
    { label: 'Round Brush', value: 'round-brush' },
    { label: 'Detangling Brush', value: 'detangling-brush' },
    { label: 'Basmati Rice', value: 'basmati-rice' },
    { label: 'Brown Rice', value: 'brown-rice' },
    { label: 'Jasmine Rice', value: 'jasmine-rice' },
];

const emptyForm = {
    name: '',
    category: 'paddle-brush',
    price: '',
    mrp: '',
    stock: '',
    rating: 4.2,
    description: '',
    image: '',
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [importStatus, setImportStatus] = useState('');
    const fileInputRef = useRef(null);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const loadProducts = async () => {
            const loadedProducts = await getProducts();
            setProducts(loadedProducts);
        };
        loadProducts();
    }, []);

    const refreshProducts = async () => {
        const loadedProducts = await getProducts();
        setProducts(loadedProducts);
        setEditingId(null);
        setFormData(emptyForm);
    };

    // Export products to JSON file
    const handleExport = () => {
        const dataStr = JSON.stringify(products, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `products-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Import products from JSON file
    const handleImport = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const importedProducts = JSON.parse(event.target?.result);

                if (!Array.isArray(importedProducts)) {
                    setImportStatus('Error: Invalid file format. Expected an array of products.');
                    return;
                }

                // Validate imported products
                const validProducts = importedProducts.filter(p => p.name && p.category);

                if (validProducts.length === 0) {
                    setImportStatus('Error: No valid products found in the file.');
                    return;
                }

                // Save to localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('products', JSON.stringify(validProducts));
                    localStorage.setItem('productsVersion', '3');
                }

                setImportStatus(`Success! Imported ${validProducts.length} products.`);
                refreshProducts();

                // Clear status after 3 seconds
                setTimeout(() => setImportStatus(''), 3000);
            } catch (error) {
                setImportStatus('Error: Failed to parse the file. Please check the JSON format.');
            }
        };
        reader.readAsText(file);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageValue = formData.image || '/images/mixed.jpeg';
        const payload = {
            ...formData,
            image: imageValue,
            thumbnail: imageValue,
            price: Number(formData.price),
            mrp: Number(formData.mrp),
            stock: Number(formData.stock),
            reviews: 0,
            images: [imageValue, imageValue, imageValue],
        };

        if (editingId) {
            await updateProduct(editingId, payload);
        } else {
            await createProduct(payload);
        }
        refreshProducts();
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            mrp: product.mrp,
            stock: product.stock,
            rating: product.rating,
            description: product.description,
            image: product.image,
        });
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        refreshProducts();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminSidebar />
            <main className="ml-64 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white">Product Management</h1>

                        {/* Export/Import Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Export Products
                            </button>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    ref={fileInputRef}
                                    className="hidden"
                                    id="import-products"
                                />
                                <label
                                    htmlFor="import-products"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Import Products
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Import Status Message */}
                    {importStatus && (
                        <div className={`mb-4 p-3 rounded-lg ${importStatus.startsWith('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {importStatus}
                        </div>
                    )}

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft p-6 border border-slate-100 dark:border-slate-800 mb-8">
                        <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-4">
                            {editingId ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                required
                            />
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                            >
                                {categoryOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                required
                            />
                            <input
                                type="number"
                                placeholder="MRP"
                                value={formData.mrp}
                                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL (optional)"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full"
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="md:col-span-2 w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                                rows="3"
                            />
                            <div className="md:col-span-2 flex gap-3">
                                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full font-semibold hover:shadow-glow transition">
                                    {editingId ? 'Update Product' : 'Add Product'}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={refreshProducts}
                                        className="px-6 py-3 border border-slate-200 rounded-full font-semibold text-slate-600 hover:text-brand transition"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft overflow-x-auto border border-slate-100 dark:border-slate-800">
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Product</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Category</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Price</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Stock</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-800 dark:text-slate-100">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100 font-semibold">{product.name}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{product.category}</td>
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100">
                                            {product.category?.includes('rice') ? 'Coming Soon' : formatCurrency(product.price)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-brand hover:text-brand-dark font-semibold mr-4" onClick={() => handleEdit(product)}>Edit</button>
                                            <button className="text-red-600 hover:text-red-800 font-semibold" onClick={() => handleDelete(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                No products found. Add some products or import from a JSON file.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
