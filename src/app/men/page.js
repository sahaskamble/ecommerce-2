'use client';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

export default function MenPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Men's Collection</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our latest men's fashion collection. From casual essentials to formal wear, 
            find your perfect style.
          </p>
        </div>

        {/* Products Grid with Filters */}
        <ProductGrid products={products.men} showFilters={true} />
      </div>
    </div>
  );
} 