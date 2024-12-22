'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const saleProducts = [
  {
    id: 's1',
    name: "Vintage Denim",
    price: "₹1,999",
    originalPrice: "₹3,999",
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a",
  },
  {
    id: 's2',
    name: "Casual Sneakers",
    price: "₹2,499",
    originalPrice: "₹4,999",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 's3',
    name: "Leather Jacket",
    price: "₹3,999",
    originalPrice: "₹7,999",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  },
];

export default function SalePage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Sale</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
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
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  {Math.round(((parseFloat(product.originalPrice.replace('₹', '').replace(',', '')) - 
                    parseFloat(product.price.replace('₹', '').replace(',', ''))) / 
                    parseFloat(product.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% OFF
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-gray-600 dark:text-gray-300">{product.price}</p>
                <p className="text-gray-400 line-through text-sm">{product.originalPrice}</p>
              </div>
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