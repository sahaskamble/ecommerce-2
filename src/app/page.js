'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { products, categories } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const { addToCart } = useCart();

  // Get featured products from each category
  const featuredProducts = [
    ...products.men.slice(0, 3),
    ...products.women.slice(0, 3),
    ...products.sale.slice(0, 2)
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-dvh flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Discover Your Style
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Explore our latest collection of modern fashion essentials.
            </p>
            <div className="flex gap-4">
              <Link href="/men" className="btn-primary">
                Shop Men
              </Link>
              <Link href="/women" className="btn-secondary">
                Shop Women
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-foreground/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our handpicked selection of trending styles and seasonal favorites.
            </p>
          </div>
          <ProductGrid products={featuredProducts} showFilters={false} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-foreground/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/${category.name.toLowerCase()}`}
                className="group relative h-80 overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a"
              alt="Sale"
              width={1200}
              height={400}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="px-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  End of Season Sale
                </h2>
                <p className="text-white/90 mb-6 max-w-md">
                  Up to 50% off on selected items. Limited time offer.
                </p>
                <Link href="/sale" className="btn-primary">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive offers, style tips, and new arrival updates!
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-black"
            />
            <button className="px-8 py-3 bg-black rounded-full hover:bg-gray-900 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
