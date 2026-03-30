import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/menu');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userId = localStorage.getItem('userId');
    if (isLoggedIn && userId) {
      fetchCart(userId);
    }
  }, []);

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/user/${userId}`);
      if (response.ok) {
        const cartItems = await response.json();
        setCart(cartItems);
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  const addToCart = async (product) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first');
      return;
    }
    const existingProduct = cart.find((item) => item.foodItemId === product.id);
    const currentQty = existingProduct ? existingProduct.quantity : 0;
    const quantityToAdd = product.quantity || 1;

    const prod = products.find(p => p.id === product.id);
    if (currentQty + quantityToAdd > prod.stockQuantity) {
      alert(`Sorry! Only ${prod.stockQuantity} units available for ${prod.name}`);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'UserId': userId
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          foodItemId: product.id,
          quantity: currentQty + quantityToAdd
        })
      });
      if (response.ok) {
        const addedItem = await response.json();
        setCart(prev => {
          const existing = prev.find(i => i.foodItemId === product.id);
          if (existing) {
            return prev.map(i => i.foodItemId === product.id ? addedItem : i);
          } else {
            return [...prev, addedItem];
          }
        });
      }
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const removeFromCart = (foodItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.foodItemId !== foodItemId));
    // TODO: call backend to remove, but no endpoint provided
  };

  const updateQuantity = (foodItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const item = cart.find(i => i.foodItemId === foodItemId);
    const prod = products.find(p => p.id === foodItemId);
    if (prod && newQuantity > prod.stockQuantity) {
      alert(`Sorry! Only ${prod.stockQuantity} units available for ${prod.name}`);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.foodItemId === foodItemId ? { ...item, quantity: newQuantity } : item
      )
    );
    // TODO: call backend to update, but no endpoint provided
  };

  const clearCart = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await fetch(`http://localhost:8080/cart/clear/${userId}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error('Failed to clear cart', error);
      }
    }
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, products, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
