/**
 * OrderContext - Order State Management
 * Handles order placement, tracking, and history
 */

import React, { createContext, useState, useContext } from 'react';
import { orderService } from '../services/orderService';
import { useAuth } from './AuthContext';

// Create Context
const OrderContext = createContext(null);

// Provider Component
export const OrderProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Place Order
  const placeOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.placeOrder(orderData);

      if (response.success) {
        setCurrentOrder(response.data.order);
        return { success: true, order: response.data.order };
      } else {
        setError(response.message || 'Order placement failed');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Order placement failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get User Orders
  const getUserOrders = async (page = 1, limit = 10, status = null) => {
    if (!isAuthenticated) {
      setError('Please login to view orders');
      return { success: false, error: 'Not authenticated' };
    }

    try {
      setLoading(true);
      setError(null);

      const params = { page, limit };
      if (status) params.status = status;

      const response = await orderService.getAll(params);

      if (response.success) {
        setOrders(response.data);
        setPagination({
          page: response.pagination?.page || page,
          limit: response.pagination?.limit || limit,
          total: response.pagination?.total || 0,
          totalPages: response.pagination?.totalPages || 0,
        });
        return { success: true, orders: response.data };
      } else {
        setError(response.message || 'Failed to load orders');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load orders';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get Order by ID
  const getOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.getOrderById(orderId);

      if (response.success) {
        setCurrentOrder(response.data.order);
        return { success: true, order: response.data.order };
      } else {
        setError(response.message || 'Order not found');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Order not found';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Track Order
  const trackOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.getOrderById(orderId);

      if (response.success) {
        setCurrentOrder(response.data.order);
        return { 
          success: true, 
          order: response.data.order,
          status: response.data.order.status,
          timeline: response.data.timeline || [],
        };
      } else {
        setError(response.message || 'Failed to track order');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to track order';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cancel Order
  const cancelOrder = async (orderId, reason = '') => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.cancelOrder(orderId, reason);

      if (response.success) {
        setCurrentOrder(response.data.order);
        // Refresh orders list
        await getUserOrders(pagination.page);
        return { success: true, order: response.data.order };
      } else {
        setError(response.message || 'Failed to cancel order');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to cancel order';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update Order Status (Admin/Restaurant Owner)
  const updateOrderStatus = async (orderId, status) => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.updateOrderStatus(orderId, status);

      if (response.success) {
        setCurrentOrder(response.data.order);
        // Refresh orders list
        await getUserOrders(pagination.page);
        return { success: true, order: response.data.order };
      } else {
        setError(response.message || 'Failed to update order status');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update order status';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get Order History (with filters)
  const getOrderHistory = async (filters = {}, page = 1, limit = 10) => {
    return await getUserOrders(page, limit, filters.status);
  };

  // Get Order Status
  const getOrderStatus = async (orderId) => {
    try {
      const response = await orderService.getOrderById(orderId);
      if (response.success) {
        return { success: true, status: response.data.order.status };
      }
      return { success: false, error: response.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Context Value
  const value = {
    orders,
    currentOrder,
    loading,
    error,
    pagination,
    placeOrder,
    getUserOrders,
    getOrder,
    trackOrder,
    cancelOrder,
    updateOrderStatus,
    getOrderHistory,
    getOrderStatus,
    setCurrentOrder,
    clearCurrentOrder: () => setCurrentOrder(null),
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom Hook
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;