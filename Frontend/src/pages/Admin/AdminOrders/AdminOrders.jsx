/**
 * AdminOrders Page
 * View and manage all orders
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../../components/Loader/Loader';
import { formatDate, getTimeAgo } from '../../../helpers/dateHelper';
import { formatPrice } from '../../../helpers/priceHelper';
import { ORDER_STATUS, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../../utils/constants';
import { showError } from '../../../helpers/notificationHelper';
import {
  Container,
  Header,
  Title,
  Filters,
  FilterButton,
  TableContainer,
  Table,
  Th,
  Td,
  StatusBadge,
  ActionButtons,
  ActionButton,
  EmptyState,
} from './AdminOrders.styles';

const AdminOrders = () => {
  const { orders, loading, getUserOrders, updateOrderStatus, pagination } = useOrder();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Preparing', value: 'preparing' },
    { label: 'Ready', value: 'ready' },
    { label: 'Out for Delivery', value: 'out_for_delivery' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  useEffect(() => {
    loadOrders();
  }, [page, activeFilter]);

  const loadOrders = async () => {
    const status = activeFilter === 'all' ? null : activeFilter;
    const result = await getUserOrders(page, 20, status);
    if (!result.success) {
      showError(result.error || 'Failed to load orders');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    if (!window.confirm(`Change order status to "${ORDER_STATUS_LABELS[status]}"?`)) {
      return;
    }

    try {
      const result = await updateOrderStatus(orderId, status);
      if (result.success) {
        await loadOrders();
      } else {
        showError(result.error || 'Failed to update order status');
      }
    } catch (error) {
      showError(error.message || 'Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    return ORDER_STATUS_COLORS[status] || '#636E72';
  };

  if (loading && orders.length === 0) {
    return <Loader fullScreen text="Loading orders..." />;
  }

  return (
    <Container>
      <Header>
        <Title>Orders</Title>
        <Filters>
          {statusFilters.map((filter) => (
            <FilterButton
              key={filter.value}
              active={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </Filters>
      </Header>

      {orders.length === 0 ? (
        <EmptyState>
          <p>No orders match this filter yet.</p>
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Order ID</Th>
                <Th>Customer</Th>
                <Th>Restaurant</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <Td>
                    <strong>#{order.orderId || order._id.slice(-6)}</strong>
                  </Td>
                  <Td>{order.userId?.name || 'Guest'}</Td>
                  <Td>{order.restaurantId?.name || 'Restaurant'}</Td>
                  <Td>{formatPrice(order.totalPrice)}</Td>
                  <Td>
                    <StatusBadge color={getStatusColor(order.status)}>
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </StatusBadge>
                  </Td>
                  <Td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {getTimeAgo(order.createdAt)}
                  </Td>
                  <Td>
                    <ActionButtons>
                      <Link to={`/admin/orders/${order._id}`}>
                        <ActionButton variant="view">👁️</ActionButton>
                      </Link>
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <select
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          value={order.status}
                          style={{
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border)',
                            fontSize: '12px',
                            background: 'var(--card)',
                          }}
                        >
                          {Object.values(ORDER_STATUS).map((status) => (
                            <option key={status} value={status}>
                              {ORDER_STATUS_LABELS[status]}
                            </option>
                          ))}
                        </select>
                      )}
                    </ActionButtons>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          <button
            onClick={() => setPage(page - 1)}
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
            onClick={() => setPage(page + 1)}
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
    </Container>
  );
};

export default AdminOrders;