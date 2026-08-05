/**
 * AdminOrderDetails Page
 * View detailed order information
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';
import Loader from '../../../components/Loader/Loader';
import { formatDate, formatTime } from '../../../helpers/dateHelper';
import { formatPrice } from '../../../helpers/priceHelper';
import { ORDER_STATUS_LABELS } from '../../../utils/constants';
import { showError } from '../../../helpers/notificationHelper';
import {
  Container,
  BackButton,
  Header,
  OrderId,
  OrderStatus,
  Grid,
  Section,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  ItemsTable,
  ItemRow,
  ItemName,
  ItemQty,
  ItemPrice,
  TotalRow,
  TotalLabel,
  TotalValue,
  StatusHistory,
  StatusItem,
  StatusDot,
  StatusLabel,
  StatusTime,
} from './AdminOrderDetails.styles';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentOrder, getOrder, loading } = useOrder();

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [id]);

  if (loading || !currentOrder) {
    return <Loader fullScreen text="Loading order details..." />;
  }

  const order = currentOrder;

  // Build status history
  const statusHistory = [
    { status: 'pending', label: 'Order Placed', date: order.createdAt },
    { status: 'confirmed', label: 'Order Confirmed', date: order.confirmedAt },
    { status: 'preparing', label: 'Preparing', date: order.preparingAt },
    { status: 'ready', label: 'Ready', date: order.readyAt },
    { status: 'out_for_delivery', label: 'Out for Delivery', date: order.outForDeliveryAt },
    { status: 'delivered', label: 'Delivered', date: order.deliveredAt },
    { status: 'cancelled', label: 'Cancelled', date: order.cancelledAt },
  ].filter(item => item.date);

  return (
    <Container>
      <BackButton onClick={() => navigate('/admin/orders')}>
        ← Back to Orders
      </BackButton>

      <Header>
        <OrderId>Order #{order.orderId || order._id.slice(-6)}</OrderId>
        <OrderStatus status={order.status}>
          {ORDER_STATUS_LABELS[order.status] || order.status}
        </OrderStatus>
      </Header>

      <Grid>
        {/* Customer Info */}
        <Section>
          <SectionTitle>Customer Information</SectionTitle>
          <InfoRow>
            <InfoLabel>Name</InfoLabel>
            <InfoValue>{order.userId?.name || 'Guest'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{order.userId?.email || 'N/A'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>{order.deliveryPhone || 'N/A'}</InfoValue>
          </InfoRow>
        </Section>

        {/* Delivery Info */}
        <Section>
          <SectionTitle>Delivery Information</SectionTitle>
          <InfoRow>
            <InfoLabel>Address</InfoLabel>
            <InfoValue>{order.deliveryAddress?.address || 'N/A'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>City</InfoLabel>
            <InfoValue>{order.deliveryAddress?.city || 'N/A'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Payment</InfoLabel>
            <InfoValue>{order.paymentMethod || 'N/A'}</InfoValue>
          </InfoRow>
        </Section>

        {/* Restaurant Info */}
        <Section>
          <SectionTitle>Restaurant</SectionTitle>
          <InfoRow>
            <InfoLabel>Name</InfoLabel>
            <InfoValue>{order.restaurantId?.name || 'Restaurant'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>{order.restaurantId?.phone || 'N/A'}</InfoValue>
          </InfoRow>
        </Section>

        {/* Order Items */}
        <Section fullWidth>
          <SectionTitle>Order Items</SectionTitle>
          <ItemsTable>
            <thead>
              <tr>
                <th>Item</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Price</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, index) => (
                <ItemRow key={index}>
                  <ItemName>{item.name}</ItemName>
                  <ItemQty>{item.quantity}</ItemQty>
                  <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                  <ItemPrice>{formatPrice(item.price * item.quantity)}</ItemPrice>
                </ItemRow>
              ))}
            </tbody>
            <tfoot>
              <TotalRow>
                <TotalLabel>Subtotal</TotalLabel>
                <TotalValue>{formatPrice(order.subtotal)}</TotalValue>
              </TotalRow>
              <TotalRow>
                <TotalLabel>Delivery Fee</TotalLabel>
                <TotalValue>{formatPrice(order.deliveryFee)}</TotalValue>
              </TotalRow>
              <TotalRow>
                <TotalLabel>Tax</TotalLabel>
                <TotalValue>{formatPrice(order.tax)}</TotalValue>
              </TotalRow>
              <TotalRow style={{ fontWeight: 700, fontSize: '18px' }}>
                <TotalLabel>Total</TotalLabel>
                <TotalValue>{formatPrice(order.totalPrice)}</TotalValue>
              </TotalRow>
            </tfoot>
          </ItemsTable>
        </Section>

        {/* Status History */}
        <Section fullWidth>
          <SectionTitle>Status History</SectionTitle>
          <StatusHistory>
            {statusHistory.map((item, index) => (
              <StatusItem key={index}>
                <StatusDot active={item.status === order.status} />
                <StatusLabel active={item.status === order.status}>
                  {item.label}
                </StatusLabel>
                <StatusTime>{item.date ? formatTime(item.date) : 'Pending'}</StatusTime>
              </StatusItem>
            ))}
          </StatusHistory>
        </Section>
      </Grid>
    </Container>
  );
};

export default AdminOrderDetails;