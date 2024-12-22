'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import {
  initDB,
  addToCartDB,
  removeFromCartDB,
  updateQuantityDB,
  getAllCartItemsDB,
  clearCartDB
} from '@/utils/indexedDB';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize DB and load cart data
  useEffect(() => {
    const loadCart = async () => {
      try {
        setError(null);
        await initDB();
        const items = await getAllCartItemsDB();
        setCart(items || []); // Ensure we always have an array
      } catch (error) {
        console.error('Error loading cart:', error);
        setError(error.message || 'Failed to load cart');
        setCart([]); // Set empty cart on error
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      setError(null);
      if (!product || !product.id) {
        throw new Error('Invalid product data');
      }
      const updatedProduct = await addToCartDB(product);
      setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
        if (existingItemIndex >= 0) {
          return prevCart.map((item, index) =>
            index === existingItemIndex ? updatedProduct : item
          );
        }
        return [...prevCart, updatedProduct];
      });
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError(error.message || 'Failed to add to cart');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartDB(productId);
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        return removeFromCart(productId);
      }
      const updatedProduct = await updateQuantityDB(productId, quantity);
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? updatedProduct : item
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  };

  const clearCart = async () => {
    try {
      await clearCartDB();
      setCart([]);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      clearCart,
      isLoading,
      error
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 