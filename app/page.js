'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import CategoriesSection from '@/components/CategoriesSection';
import NewsletterSection from '@/components/NewsletterSection';
import FeaturedSection from '@/components/FeaturedSection';
import RiceAndCombsSection from '@/components/RiceAndCombsSection';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

export default function HomePage() {
  const { products } = useProducts();
  const { addToCart } = useCart();

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.filter(p => p.category !== 'comb' && !p.category.includes('rice')).slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </section>

        <RiceAndCombsSection />

        <CategoriesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
