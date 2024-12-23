'use client';
import { useState } from 'react';
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full btn-secondary flex items-center justify-center gap-2"
          >
            <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Products Grid with Filters */}
        <ProductGrid 
          products={products.men} 
          showFilters={true}
          showMobileFilters={showMobileFilters}
        />
      </div>
    </div>
  );
} 