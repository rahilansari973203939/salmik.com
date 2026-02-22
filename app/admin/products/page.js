'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createProduct, deleteProduct, getProducts, updateProduct } from '@/services/api';

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

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-display font-semibold text-slate-900 dark:text-white mb-6">Product Management</h1>

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
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100">₹{product.price}</td>
                                        <td className="px-6 py-4 text-slate-800 dark:text-slate-100">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-brand hover:text-brand-dark font-semibold mr-4" onClick={() => handleEdit(product)}>Edit</button>
                                            <button className="text-red-600 hover:text-red-800 font-semibold" onClick={() => handleDelete(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
