'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const womenProducts = [
  {
    id: 'w1',
    name: "Summer Dress",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
  },
  {
    id: 'w2',
    name: "Floral Maxi Dress",
    price: "₹3,299",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
  },
  {
    id: 'w3',
    name: "Casual Blazer",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1548624149-f20d8a2211a3",
  },
];

export default function WomenPage() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Women's Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {womenProducts.map((product) => (
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