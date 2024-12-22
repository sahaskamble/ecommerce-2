'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const menProducts = [
  {
    id: 'm1',
    name: "Classic White Tee",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 'm2',
    name: "Denim Jacket",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  },
  // Add more men's products
];

export default function MenPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Men's Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="gradient-border-mask p-4 bg-background"
            >
              <div className="relative h-80 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{product.price}</p>
              <button 
                className="btn-primary w-full"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 