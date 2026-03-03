'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import CategoriesSection from '@/components/CategoriesSection';
import NewsletterSection from '@/components/NewsletterSection';
import FeaturedSection from '@/components/FeaturedSection';
import RiceAndCombsSection from '@/components/RiceAndCombsSection';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setProducts(data);
        setLoading(false);
        return;
      }

      const productsData = await import('@/data/products.json');
      setProducts(productsData.default || productsData);
    } catch (error) {
      console.log('Using local products data');
      try {
        const productsData = await import('@/data/products.json');
        setProducts(productsData.default || productsData);
      } catch (e) {
        console.error('Error loading products:', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const brushProducts = products?.filter(p =>
    p.category !== 'comb' &&
    !p.category?.includes('rice') &&
    p.category !== 'basmati-rice' &&
    p.category !== 'brown-rice' &&
    p.category !== 'jasmine-rice'
  ) || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <section className="relative">
          <HeroSlider />
        </section>

        <FeaturedSection />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-semibold text-slate-900 dark:text-white">
              Featured Brushes
            </h2>
            <a href="/products" className="text-sm font-semibold text-brand hover:text-brand-dark">
              Browse all →
            </a>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-slate-800 rounded-2xl h-64"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brushProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          )}
        </section>

        <RiceAndCombsSection />

        <CategoriesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
