'use client';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

export default function SalePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="relative mb-12 text-center p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Sale</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            Incredible deals on your favorite styles. Up to 50% off on selected items.
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-primary/10 px-4 py-2 rounded-full">
              <span className="font-semibold text-primary">Up to 50% Off</span>
            </div>
            <div className="bg-secondary/10 px-4 py-2 rounded-full">
              <span className="font-semibold text-secondary">Limited Time</span>
            </div>
          </div>
        </div>

        {/* Products Grid with Filters */}
        <ProductGrid products={products.sale} showFilters={true} />
      </div>
    </div>
  );
}