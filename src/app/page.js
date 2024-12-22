'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCallback } from 'react';

const products = [
  {
    id: 1,
    name: "Classic White Tee",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    hoverImage: "https://images.unsplash.com/photo-1622445275576-721325763afe"
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    hoverImage: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6"
  },
  {
    id: 3,
    name: "Summer Dress",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    hoverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c"
  }
];

const categories = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59"
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b"
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93"
  },
  {
    name: "Sale",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a"
  }
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "floop.co.in has completely transformed my wardrobe. The quality and style are unmatched!"
  },
  {
    name: "Rahul Mehta",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "Amazing collection and even better customer service. Will definitely shop again!"
  },
  {
    name: "Ananya Patel",
    role: "Style Influencer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    text: "My go-to destination for trendy fashion. Love their sustainable approach!"
  }
];

const stats = [
  { label: "Happy Customers", value: "50K+" },
  { label: "Products Delivered", value: "100K+" },
  { label: "Cities Covered", value: "100+" },
  { label: "5★ Reviews", value: "25K+" }
];

const features = [
  {
    icon: "🚚",
    title: "Free Shipping",
    description: "On orders above ₹999"
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    description: "30-day return policy"
  },
  {
    icon: "🛡️",
    title: "Secure Payments",
    description: "100% safe & secure"
  },
  {
    icon: "💫",
    title: "Premium Quality",
    description: "Guaranteed authenticity"
  }
];

export default function Home() {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(async (product) => {
    try {
      const success = await addToCart(product);
      if (success) {
        alert('Added to cart!');
      } else {
        alert('Failed to add to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart.');
    }
  }, [addToCart]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Background Image with Overlay */}
          <Image
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm" />
          
          {/* Floating Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            floop<span className="text-primary">.co.in</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Elevate Your Style, Sustainably
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">Learn More</button>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-10 bg-foreground/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-background shadow-sm"
              >
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                className="gradient-border-mask p-4 bg-background shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-80 mb-4 overflow-hidden rounded-lg group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} alternate view`}
                    fill
                    className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.price}</p>
                <button 
                  className="w-full btn-primary"
                  onClick={() => handleAddToCart(product)}
                  type="button"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-lg gradient-border-mask"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-foreground/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                className="relative h-60 rounded-lg overflow-hidden gradient-border-mask cursor-pointer bg-background"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16 bg-foreground/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Trending Now</h2>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll">
              {[...products, ...products].map((product, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64"
                >
                  <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-primary">{product.price}</p>
                  <button 
                    className="w-full btn-primary mt-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg gradient-border-mask"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{testimonial.text}</p>
              </motion.div>
            ))}
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

      {/* Download App Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-4">Shop On The Go</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Download our app for a seamless shopping experience. Get exclusive app-only offers and faster checkout!
              </p>
              <div className="flex gap-4">
                <button className="btn-primary">
                  <span className="text-2xl mr-2">📱</span> App Store
                </button>
                <button className="btn-secondary">
                  <span className="text-2xl mr-2">🤖</span> Play Store
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3"
                alt="Mobile App"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
