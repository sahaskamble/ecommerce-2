'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-8">Loading Cart...</h1>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-8">Your Cart is Empty</h1>
          <p className="mb-8 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-4 mb-6 p-4 bg-foreground/5 rounded-lg"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.price}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="text-red-500 ml-auto hover:text-red-600 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-foreground/5 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button className="btn-primary w-full">
              Proceed to Checkout
            </button>
            <Link href="/" className="btn-secondary w-full mt-4 text-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 