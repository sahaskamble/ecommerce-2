'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { filters } from '@/data/products';

const ProductImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      // If primary image fails, use a fallback image
      setImgSrc('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f');
      setIsError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      onError={handleError}
    />
  );
};

export default function ProductGrid({ products, showFilters = true, showMobileFilters = false }) {
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    color: [],
    size: [],
    priceRange: [],
    sortBy: 'newest'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeFilters.category.length && !activeFilters.category.includes(product.category)) {
      return false;
    }
    if (activeFilters.color.length && !activeFilters.color.includes(product.color)) {
      return false;
    }
    if (activeFilters.size.length && !product.size.some(s => activeFilters.size.includes(s))) {
      return false;
    }
    return true;
  });

  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {showFilters && (
        <AnimatePresence>
          {(showMobileFilters || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full lg:w-1/4 space-y-4 lg:space-y-6 h-fit lg:sticky lg:top-24 bg-background/50 backdrop-blur-sm p-4 lg:p-0 rounded-lg overflow-hidden"
            >
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 text-black py-3 rounded-lg border border-foreground/10 focus:outline-none focus:border-primary text-sm lg:text-base"
                />
              </div>

              {/* Filters */}
              <div className="space-y-4 lg:space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                    {filters.categories.map(category => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={activeFilters.category.includes(category)}
                          onChange={() => handleFilterChange('category', category)}
                          className="rounded text-primary focus:ring-primary w-4 h-4"
                        />
                        <span className="text-sm lg:text-base">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-semibold mb-3">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleFilterChange('color', color)}
                        className={`px-3 py-1.5 rounded-full text-xs lg:text-sm whitespace-nowrap ${
                          activeFilters.color.includes(color)
                            ? 'bg-primary text-white'
                            : 'bg-foreground/5 hover:bg-foreground/10'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="font-semibold mb-3">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleFilterChange('size', size)}
                        className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full text-sm ${
                          activeFilters.size.includes(size)
                            ? 'bg-primary text-white'
                            : 'bg-foreground/5 hover:bg-foreground/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Ranges */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                    {filters.priceRanges.map(range => (
                      <label key={range.value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={activeFilters.priceRange.includes(range.value)}
                          onChange={() => handleFilterChange('priceRange', range.value)}
                          className="rounded text-primary focus:ring-primary w-4 h-4"
                        />
                        <span className="text-sm lg:text-base">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 min-h-[400px] h-fit">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center h-[400px] text-center px-4">
            <h3 className="text-lg lg:text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="gradient-border-mask p-3 lg:p-4 bg-background h-full"
            >
              <div className="relative h-64 sm:h-72 lg:h-80 mb-3 lg:mb-4 overflow-hidden rounded-lg group">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                {product.hoverImage && (
                  <ProductImage
                    src={product.hoverImage}
                    alt={`${product.name} alternate view`}
                    className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                    New
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    {Math.round(((parseFloat(product.originalPrice.replace('₹', '').replace(',', '')) - 
                      parseFloat(product.price.replace('₹', '').replace(',', ''))) / 
                      parseFloat(product.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF
                  </span>
                )}
              </div>
              <h3 className="text-base lg:text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">{product.price}</p>
                  {product.originalPrice && (
                    <p className="text-xs lg:text-sm text-gray-400 line-through">{product.originalPrice}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm lg:text-base">{product.rating}</span>
                  <span className="text-gray-400 text-xs lg:text-sm">({product.reviews})</span>
                </div>
              </div>
              <button 
                className="w-full btn-primary text-sm lg:text-base py-2 lg:py-3"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 