/**
 * OrderTracking Page
 * Live order status tracking with timeline
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import { formatDate, formatTime } from '../../helpers/dateHelper';
import { formatPrice } from '../../helpers/priceHelper';
import { ORDER_STATUS, ORDER_STATUS_LABELS, ORDER_STATUS_ICONS } from '../../utils/constants';
import { ROUTES } from '../../utils/routes';
import { showError } from '../../helpers/notificationHelper';
import {
  TrackingContainer,
  TrackingHeader,
  TrackingTitle,
  TrackingSubtitle,
  TimelineContainer,
  TimelineStep,
  TimelineIcon,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
  TimelineConnector,
  OrderInfo,
  OrderInfoGrid,
  OrderInfoItem,
  OrderInfoLabel,
  OrderInfoValue,
  DeliveryPerson,
  DeliveryPersonAvatar,
  DeliveryPersonInfo,
  DeliveryPersonName,
  DeliveryPersonPhone,
  DeliveryPersonVehicle,
  ActionsContainer,
  ActionButton,
  StatusBadge,
} from './OrderTracking.styles';

const OrderTracking = () => {
  const { id } = useParams();
  const { currentOrder, loading, trackOrder, error } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      trackOrder(id);
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  // Poll for updates every 10 seconds
  useEffect(() => {
    if (!id) return;

    const interval = setInterval(() => {
      trackOrder(id);
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading || !currentOrder) {
    return <Loader fullScreen text="Tracking your order..." />;
  }

  const order = currentOrder;
  const status = order.status || 'pending';
  const statusLabel = ORDER_STATUS_LABELS[status] || status;
  const statusIcon = ORDER_STATUS_ICONS[status] || '📦';

  // Build timeline
  const timelineSteps = [
    { key: 'pending', label: 'Order Placed', date: order.createdAt },
    { key: 'confirmed', label: 'Order Confirmed', date: order.confirmedAt },
    { key: 'preparing', label: 'Preparing Your Food', date: order.preparingAt },
    { key: 'ready', label: 'Food is Ready', date: order.readyAt },
    { key: 'out_for_delivery', label: 'Out for Delivery', date: order.outForDeliveryAt },
    { key: 'delivered', label: 'Delivered', date: order.deliveredAt },
  ];

  // Filter out steps without dates
  const activeTimeline = timelineSteps.filter(step => step.date);
  const currentStepIndex = activeTimeline.findIndex(step => step.key === status);
  const isCompleted = status === 'delivered' || status === 'cancelled';

  return (
    <TrackingContainer>
      <TrackingHeader>
        <TrackingTitle>
          {statusIcon} {isCompleted ? 'Order Complete' : 'Tracking Your Order'}
        </TrackingTitle>
        <TrackingSubtitle>
          Order #{order.orderId || order._id.slice(-6)}
          <StatusBadge status={status}>
            {statusLabel}
          </StatusBadge>
        </TrackingSubtitle>
      </TrackingHeader>

      {/* Timeline */}
      <TimelineContainer>
        {activeTimeline.map((step, index) => {
          const isActive = step.key === status;
          const isPast = activeTimeline.findIndex(s => s.key === step.key) <= currentStepIndex;

          return (
            <TimelineStep key={step.key}>
              <TimelineIcon active={isActive} completed={isPast && !isActive}>
                {isPast ? '✅' : statusIcon}
              </TimelineIcon>
              <TimelineContent>
                <TimelineTitle active={isActive}>
                  {step.label}
                </TimelineTitle>
                <TimelineTime>
                  {step.date ? formatTime(step.date) : 'Pending'}
                </TimelineTime>
              </TimelineContent>
              {index < activeTimeline.length - 1 && (
                <TimelineConnector active={isPast} />
              )}
            </TimelineStep>
          );
        })}
      </TimelineContainer>

      {/* Order Info */}
      <OrderInfo>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
          Order Details
        </h3>
        <OrderInfoGrid>
          <OrderInfoItem>
            <OrderInfoLabel>Restaurant</OrderInfoLabel>
            <OrderInfoValue>{order.restaurantId?.name || 'Restaurant'}</OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>Total</OrderInfoLabel>
            <OrderInfoValue>{formatPrice(order.totalPrice)}</OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>Payment</OrderInfoLabel>
            <OrderInfoValue>{order.paymentMethod || 'Cash on Delivery'}</OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>Delivery Address</OrderInfoLabel>
            <OrderInfoValue>{order.deliveryAddress?.address || 'N/A'}</OrderInfoValue>
          </OrderInfoItem>
        </OrderInfoGrid>
      </OrderInfo>

      {/* Delivery Person */}
      {order.deliveryPersonName && (
        <DeliveryPerson>
          <DeliveryPersonAvatar>
            {order.deliveryPersonName.charAt(0)}
          </DeliveryPersonAvatar>
          <DeliveryPersonInfo>
            <DeliveryPersonName>{order.deliveryPersonName}</DeliveryPersonName>
            <DeliveryPersonPhone>📱 {order.deliveryPersonPhone || 'N/A'}</DeliveryPersonPhone>
            {order.deliveryPersonVehicle && (
              <DeliveryPersonVehicle>🚗 {order.deliveryPersonVehicle}</DeliveryPersonVehicle>
            )}
          </DeliveryPersonInfo>
        </DeliveryPerson>
      )}

      {/* Actions */}
      <ActionsContainer>
        {status !== 'delivered' && status !== 'cancelled' && (
          <ActionButton
            onClick={() => showError('Cancellation feature coming soon')}
            variant="danger"
          >
            Cancel Order
          </ActionButton>
        )}
        <Link to={ROUTES.ORDERS}>
          <ActionButton variant="outline">View All Orders</ActionButton>
        </Link>
        <Link to={ROUTES.HOME}>
          <ActionButton variant="outline">Continue Shopping</ActionButton>
        </Link>
      </ActionsContainer>
    </TrackingContainer>
  );
};

export default OrderTracking;