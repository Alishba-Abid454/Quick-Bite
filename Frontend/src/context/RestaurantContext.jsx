/**
 * RestaurantContext - Restaurant State Management
 * Handles restaurant listing, filtering, and search
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { restaurantService } from '../services/restaurantService';

// Create Context
const RestaurantContext = createContext(null);

// Provider Component
export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    city: '',
    minRating: 0,
    isOpen: true,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Load Restaurants
  const loadRestaurants = async (filterParams = {}, page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        ...filters,
        ...filterParams,
        page,
        limit,
      };

      const response = await restaurantService.getAll(params);//Sends GET request to backend

      if (response.success) {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
        setPagination({
          page: response.pagination?.page || page,
          limit: response.pagination?.limit || limit,
          total: response.pagination?.total || 0,
          totalPages: response.pagination?.totalPages || 0,
        });
      } else {
        setError(response.message || 'Failed to load restaurants');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load restaurants';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get Single Restaurant
  const getRestaurant = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await restaurantService.getById(id);

      if (response.success) {
        setSelectedRestaurant(response.data.restaurant);
        return { success: true, restaurant: response.data.restaurant };
      } else {
        setError(response.message || 'Failed to load restaurant');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load restaurant';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Search Restaurants
  const searchRestaurants = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const params = { search: query, ...filters };
      const response = await restaurantService.getAll(params);

      if (response.success) {
        setFilteredRestaurants(response.data);
        setPagination({
          page: response.pagination?.page || 1,
          limit: response.pagination?.limit || 10,
          total: response.pagination?.total || 0,
          totalPages: response.pagination?.totalPages || 0,
        });
        return { success: true };
      } else {
        setError(response.message || 'Search failed');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Search failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Apply Filters
  const applyFilters = async (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    await loadRestaurants({ ...filters, ...newFilters }, 1);
  };

  // Clear Filters
  const clearFilters = () => {
    setFilters({
      search: '',
      cuisine: '',
      city: '',
      minRating: 0,
      isOpen: true,
    });
    loadRestaurants({}, 1);
  };

  // Change Page
  const changePage = (page) => {
    loadRestaurants(filters, page);
  };

  // Load Initial Data
  useEffect(() => {
    loadRestaurants();//Loads restaurants when the app starts
  }, []);

  // Context Value
  const value = {
    restaurants: filteredRestaurants,
    allRestaurants: restaurants,
    selectedRestaurant,
    loading,
    error,
    filters,
    pagination,
    loadRestaurants,
    getRestaurant,
    searchRestaurants,
    applyFilters,
    clearFilters,
    changePage,
    setSelectedRestaurant,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

// Custom Hook
export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

export default RestaurantContext;