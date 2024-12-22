'use client';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

export default function WomenPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Women's Collection</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated women's fashion collection. From elegant dresses to comfortable casuals, 
            find your signature look.
          </p>
        </div>

        {/* Products Grid with Filters */}
        <ProductGrid products={products.women} showFilters={true} />
      </div>
    </div>
  );
}