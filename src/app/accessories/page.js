'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const accessoryProducts = [
  {
    id: 'a1',
    name: "Classic Watch",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
  },
  {
    id: 'a2',
    name: "Leather Bag",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
  },
  {
    id: 'a3',
    name: "Sunglasses",
    price: "₹1,999",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
  },
];

export default function AccessoriesPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Accessories</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessoryProducts.map((product) => (
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