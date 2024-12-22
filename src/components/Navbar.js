'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            floop<span className="text-primary">.co.in</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/men" className="hover:text-primary transition-colors">Men</Link>
            <Link href="/women" className="hover:text-primary transition-colors">Women</Link>
            <Link href="/accessories" className="hover:text-primary transition-colors">Accessories</Link>
            <Link href="/sale" className="hover:text-primary transition-colors">Sale</Link>
            <div className="relative">
              <Link 
                href="/cart" 
                className="btn-primary inline-block"
              >
                Cart ({cartCount})
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute w-full bg-black/90 backdrop-blur-md"
        >
          <div className="container mx-auto px-6 py-4 text-white">
            <div className="flex flex-col gap-4">
              <Link href="/men" className="hover:text-primary transition-colors text-white/90">Men</Link>
              <Link href="/women" className="hover:text-primary transition-colors text-white/90">Women</Link>
              <Link href="/accessories" className="hover:text-primary transition-colors text-white/90">Accessories</Link>
              <Link href="/sale" className="hover:text-primary transition-colors text-white/90">Sale</Link>
              <div className="relative">
                <Link 
                  href="/cart" 
                  className="btn-primary inline-block"
                >
                  Cart ({cartCount})
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 