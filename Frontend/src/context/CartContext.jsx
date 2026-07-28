/**
 * CartContext - Shopping Cart State Management
 * Handles cart items, quantities, and totals
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { STORAGE_KEYS, APP_CONSTANTS } from '../utils/constants';

// Create Context
const CartContext = createContext(null);

// Provider Component
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(APP_CONSTANTS.DELIVERY_FEE);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [restaurantId, setRestaurantId] = useState(null);

  // Load Cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setItems(cartData.items || []);
        setRestaurantId(cartData.restaurantId || null);
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  // Save Cart to localStorage & Calculate Totals
  useEffect(() => {
    // Calculate totals
    const newSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newTax = Math.round(newSubtotal * APP_CONSTANTS.TAX_RATE);
    const newTotal = newSubtotal + deliveryFee + newTax;
    const newItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
    setItemCount(newItemCount);

    // Save to localStorage
    const cartData = {
      items,
      restaurantId,
      subtotal: newSubtotal,
      itemCount: newItemCount,
    };
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData));
  }, [items, restaurantId, deliveryFee]);

  // Add Item to Cart
  const addItem = (item, quantity = 1) => {
    // Check if restaurant matches
    if (restaurantId && restaurantId !== item.restaurantId) {
      // Different restaurant - ask to clear cart or return error
      // For now, we'll clear the cart
      clearCart();
    }

    setRestaurantId(item.restaurantId);

    setItems(prevItems => {
      // Check if item already exists
      const existingIndex = prevItems.findIndex(
        cartItem => cartItem.id === item.id
      );

      if (existingIndex !== -1) {
        // Update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // Remove Item from Cart
  const removeItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // If cart is empty, reset restaurant
    if (items.length === 1) {
      setRestaurantId(null);
    }
  };

  // Update Item Quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
    localStorage.removeItem(STORAGE_KEYS.CART);
  };

  // Update Delivery Fee
  const updateDeliveryFee = (fee) => {
    setDeliveryFee(fee);
  };

  // Get Cart Summary
  const getCartSummary = () => {
    return {
      items,
      subtotal,
      deliveryFee,
      tax,
      total,
      itemCount,
      restaurantId,
      isEmpty: items.length === 0,
    };
  };

  // Check if Item is in Cart
  const isInCart = (itemId) => {
    return items.some(item => item.id === itemId);
  };

  // Get Item Quantity
  const getItemQuantity = (itemId) => {
    const item = items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Context Value
  const value = {
    items,
    subtotal,
    deliveryFee,
    tax,
    total,
    itemCount,
    restaurantId,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    updateDeliveryFee,
    getCartSummary,
    isInCart,
    getItemQuantity,
    isEmpty: items.length === 0,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;