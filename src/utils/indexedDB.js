const DB_NAME = 'floopDB';
const DB_VERSION = 1;
const CART_STORE = 'cart';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    // Check if IndexedDB is available
    if (!window.indexedDB) {
      reject('IndexedDB is not supported in this browser');
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      // Add error handler for the database
      db.onerror = (event) => {
        console.error('Database error:', event.target.error);
      };
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(CART_STORE)) {
        db.createObjectStore(CART_STORE, { keyPath: 'id' });
      }
    };
  });
};

export const addToCartDB = async (product) => {
  console.log('Adding to cart:', product);
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CART_STORE], 'readwrite');
    const store = transaction.objectStore(CART_STORE);

    // First check if product exists
    const getRequest = store.get(product.id);

    getRequest.onsuccess = (event) => {
      const existingItem = event.target.result;
      console.log('Existing item:', existingItem);
      const updatedProduct = existingItem
        ? { ...existingItem, quantity: existingItem.quantity + 1 }
        : { ...product, quantity: 1 };

      console.log('Updated product:', updatedProduct);
      const putRequest = store.put(updatedProduct);

      putRequest.onsuccess = () => {
        console.log('Successfully added to cart');
        resolve(updatedProduct);
      };
      putRequest.onerror = (error) => {
        console.error('Error in put request:', error);
        reject('Error adding to cart');
      };
    };

    getRequest.onerror = (error) => {
      console.error('Error in get request:', error);
      reject('Error checking product existence');
    };
  });
};

export const removeFromCartDB = async (productId) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CART_STORE], 'readwrite');
    const store = transaction.objectStore(CART_STORE);
    const request = store.delete(productId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject('Error removing from cart');
  });
};

export const updateQuantityDB = async (productId, quantity) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CART_STORE], 'readwrite');
    const store = transaction.objectStore(CART_STORE);
    
    const getRequest = store.get(productId);

    getRequest.onsuccess = (event) => {
      const product = event.target.result;
      if (product) {
        const updatedProduct = { ...product, quantity };
        const putRequest = store.put(updatedProduct);
        
        putRequest.onsuccess = () => resolve(updatedProduct);
        putRequest.onerror = () => reject('Error updating quantity');
      } else {
        reject('Product not found');
      }
    };

    getRequest.onerror = () => reject('Error getting product');
  });
};

export const getAllCartItemsDB = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CART_STORE], 'readonly');
    const store = transaction.objectStore(CART_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Error getting cart items');
  });
};

export const clearCartDB = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CART_STORE], 'readwrite');
    const store = transaction.objectStore(CART_STORE);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject('Error clearing cart');
  });
}; 