/**
 * AdminDashboard Page
 * Admin dashboard with statistics and overview
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useOrder } from '../../../context/OrderContext';
import { useRestaurant } from '../../../context/RestaurantContext';
import Loader from '../../../components/Loader/Loader';
import {
  ShoppingBag,
  DollarSign,
  Store,
  Users
} from "lucide-react";
import { formatPrice } from '../../../helpers/priceHelper';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  StatsGrid,
  StatCard,
  StatCardIcon,
  StatCardContent,
  StatCardNumber,
  StatCardLabel,
  RecentActivity,
  ActivityTitle,
  ActivityList,
  ActivityItem,
  ActivityItemText,
  ActivityItemTime,
} from './AdminDashboard.styles';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { orders, getUserOrders, loading: orderLoading } = useOrder();
  const { restaurants, loadRestaurants, loading: restaurantLoading } = useRestaurant();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalRestaurants: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    loadRestaurants();
    getUserOrders(1, 100);
  }, []);

  useEffect(() => {
    if (orders && restaurants) {
      setStats({
        totalOrders: orders.length || 0,
        totalRevenue: orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0),
        totalRestaurants: restaurants.length || 0,
        totalUsers: 0, // Will be fetched from API
      });
    }
  }, [orders, restaurants]);

  if (orderLoading || restaurantLoading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <div>
          <DashboardTitle>Dashboard</DashboardTitle>
          <DashboardSubtitle>Last 7 days across the QuickBite platform.</DashboardSubtitle>
        </div>
      </DashboardHeader>

      <StatsGrid>
        <StatCard>
          <StatCardIcon>  
             <ShoppingBag size={28}/>
          </StatCardIcon>
          <StatCardContent>
            <StatCardNumber>{stats.totalOrders}</StatCardNumber>
            <StatCardLabel>Orders</StatCardLabel>
          </StatCardContent>
        </StatCard>

        <StatCard>
          <StatCardIcon>
            <DollarSign size={28}/>
          </StatCardIcon>
          <StatCardContent>
            <StatCardNumber>{formatPrice(stats.totalRevenue)}</StatCardNumber>
            <StatCardLabel>Revenue</StatCardLabel>
          </StatCardContent>
        </StatCard>

        <StatCard>
          <StatCardIcon>
            <Store size={28}/>
          </StatCardIcon>
          <StatCardContent>
            <StatCardNumber>{stats.totalRestaurants}</StatCardNumber>
            <StatCardLabel>Restaurants</StatCardLabel>
          </StatCardContent>
        </StatCard>

        <StatCard>
          <StatCardIcon>
            <Users size={28}/>
          </StatCardIcon>
          <StatCardContent>
            <StatCardNumber>{stats.totalUsers}</StatCardNumber>
            <StatCardLabel>Users</StatCardLabel>
          </StatCardContent>
        </StatCard>
      </StatsGrid>

      <RecentActivity>
        <ActivityTitle>Recent Orders</ActivityTitle>
        {recentOrders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '20px 0', textAlign: 'center' }}>
            No live orders yet. Place one as a customer to see it here.
          </p>
        ) : (
          <ActivityList>
            {recentOrders.map((order) => (
              <ActivityItem key={order._id}>
                <ActivityItemText>
                  Order #{order.orderId || order._id.slice(-6)} - 
                  {order.restaurantId?.name || 'Restaurant'} - 
                  {formatPrice(order.totalPrice)}
                </ActivityItemText>
                <ActivityItemTime>
                  {new Date(order.createdAt).toLocaleDateString()}
                </ActivityItemTime>
              </ActivityItem>
            ))}
          </ActivityList>
        )}
      </RecentActivity>
    </DashboardContainer>
  );
};

export default AdminDashboard;