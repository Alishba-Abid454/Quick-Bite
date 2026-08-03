/**
 * Orders Page
 * Displays user's order history with filters and pagination
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import { formatDate, getTimeAgo } from '../../helpers/dateHelper';
import { formatPrice } from '../../helpers/priceHelper';
import { ORDER_STATUS, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants';
import { routeHelpers } from '../../utils/routes';
import { showError } from '../../helpers/notificationHelper';
import {
  OrdersContainer,
  OrdersHeader,
  OrdersTitle,
  OrdersSub,
  OrdersFilter,
  FilterButton,
  OrdersList,
  OrderCard,
  OrderCardHeader,
  OrderId,
  OrderStatus,
  OrderDate,
  OrderCardBody,
  OrderRestaurant,
  OrderRestaurantName,
  OrderRestaurantInfo,
  OrderItems,
  OrderItem,
  OrderCardFooter,
  OrderTotal,
  OrderActions,
  OrderActionBtn,
  EmptyOrders,
  EmptyOrdersIcon,
  EmptyOrdersTitle,
  EmptyOrdersText,
} from './Orders.styles';

const Orders = () => {
  const { orders, loading, error, getUserOrders, pagination } = useOrder();
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [page, activeFilter]);

  const loadOrders = async () => {
    const status = activeFilter === 'all' ? null : activeFilter;
    const result = await getUserOrders(page, 10, status);
    if (!result.success) {
      showError(result.error || 'Failed to load orders');
    }
  };

  const getStatusColor = (status) => {
    return ORDER_STATUS_COLORS[status] || '#636E72';
  };

  const getStatusLabel = (status) => {
    return ORDER_STATUS_LABELS[status] || status;
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading && orders.length === 0) {
    return <Loader fullScreen text="Loading your orders..." />;
  }

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <OrdersHeader>
          <div>
          <OrdersTitle>My Orders</OrdersTitle>
          <OrdersSub>
            Every order you've placed, newest first.
          </OrdersSub>
          </div>
        </OrdersHeader>
        <EmptyOrders>
          <EmptyOrdersIcon>
            <svg 
              width="34" 
              height="34" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ED5A2D"  
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>     
           </EmptyOrdersIcon>
          <EmptyOrdersTitle>No orders here yet</EmptyOrdersTitle>
          <EmptyOrdersText>
            When you place an order it'll show up in this list.
          </EmptyOrdersText>
          <Link to="/">
            <Button>Browse Restaurants</Button>
          </Link>
        </EmptyOrders>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <OrdersHeader>
        <OrdersTitle>My Orders</OrdersTitle>
        <OrdersFilter>
          {statusFilters.map((filter) => (
            <FilterButton
              key={filter.value}
              active={activeFilter === filter.value}
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </OrdersFilter>
      </OrdersHeader>

      {error && <p style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</p>}

      <OrdersList>
        {orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderCardHeader>
              <OrderId>Order #{order.orderId || order._id.slice(-6)}</OrderId>
              <OrderStatus color={getStatusColor(order.status)}>
                ● {getStatusLabel(order.status)}
              </OrderStatus>
              <OrderDate>
                {formatDate(order.createdAt, 'MMM DD, YYYY')} · {getTimeAgo(order.createdAt)}
              </OrderDate>
            </OrderCardHeader>

            <OrderCardBody>
              <OrderRestaurant>
                <OrderRestaurantName>
                  {order.restaurantId?.name || 'Restaurant'}
                </OrderRestaurantName>
                <OrderRestaurantInfo>
                  {order.items?.length || 0} items
                </OrderRestaurantInfo>
              </OrderRestaurant>

              <OrderItems>
                {order.items?.slice(0, 3).map((item, index) => (
                  <OrderItem key={index}>
                    {item.quantity}× {item.name}
                  </OrderItem>
                ))}
                {order.items?.length > 3 && (
                  <OrderItem>+ {order.items.length - 3} more</OrderItem>
                )}
              </OrderItems>
            </OrderCardBody>

            <OrderCardFooter>
              <OrderTotal>
                Total: {formatPrice(order.totalPrice)}
              </OrderTotal>
              <OrderActions>
                <OrderActionBtn to={routeHelpers.orderTracking(order._id)}>
                  Track Order
                </OrderActionBtn>
                <OrderActionBtn to={routeHelpers.orderDetails(order._id)} variant="outline">
                  View Details
                </OrderActionBtn>
              </OrderActions>
            </OrderCardFooter>
          </OrderCard>
        ))}
      </OrdersList>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              cursor: page <= 1 ? 'not-allowed' : 'pointer',
              opacity: page <= 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <span style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pagination.totalPages}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              cursor: page >= pagination.totalPages ? 'not-allowed' : 'pointer',
              opacity: page >= pagination.totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      )}
    </OrdersContainer>
  );
};

export default Orders;