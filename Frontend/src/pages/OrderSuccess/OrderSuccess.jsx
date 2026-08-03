/**
 * OrderSuccess Page
 * Shows order confirmation after successful placement
 */

import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../helpers/priceHelper';
import { ROUTES, routeHelpers } from '../../utils/routes';
import {
  SuccessContainer,
  SuccessIcon,
  SuccessTitle,
  SuccessSubtitle,
  OrderDetails,
  OrderDetailRow,
  OrderDetailLabel,
  OrderDetailValue,
  OrderItemsList,
  OrderItem,
  OrderItemName,
  OrderItemQty,
  OrderTotalLarge,
  ActionsContainer,
} from './OrderSuccess.styles';

const OrderSuccess = () => {
  const { id } = useParams();
  const { currentOrder, getOrder, loading } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [id]);

  // Redirect if no order
  useEffect(() => {
    if (!loading && !currentOrder) {
      navigate(ROUTES.HOME);
    }
  }, [loading, currentOrder, navigate]);

  if (loading || !currentOrder) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading order details...</div>;
  }

  const order = currentOrder;

  return (
    <SuccessContainer>
      <SuccessIcon>✅</SuccessIcon>
      <SuccessTitle>Order Placed Successfully!</SuccessTitle>
      <SuccessSubtitle>
        Your order has been confirmed. You'll receive a confirmation email shortly.
      </SuccessSubtitle>

      <OrderDetails>
        <OrderDetailRow>
          <OrderDetailLabel>Order ID</OrderDetailLabel>
          <OrderDetailValue>#{order.orderId || order._id.slice(-6)}</OrderDetailValue>
        </OrderDetailRow>

        <OrderDetailRow>
          <OrderDetailLabel>Status</OrderDetailLabel>
          <OrderDetailValue style={{ color: 'var(--success)' }}>
            {order.status || 'Confirmed'}
          </OrderDetailValue>
        </OrderDetailRow>

        <OrderDetailRow>
          <OrderDetailLabel>Restaurant</OrderDetailLabel>
          <OrderDetailValue>
            {order.restaurantId?.name || 'Restaurant'}
          </OrderDetailValue>
        </OrderDetailRow>

        <OrderDetailRow>
          <OrderDetailLabel>Delivery Address</OrderDetailLabel>
          <OrderDetailValue>
            {order.deliveryAddress?.address || 'N/A'}
          </OrderDetailValue>
        </OrderDetailRow>

        <OrderItemsList>
          <OrderDetailLabel>Items</OrderDetailLabel>
          {order.items?.map((item, index) => (
            <OrderItem key={index}>
              <OrderItemName>{item.name}</OrderItemName>
              <OrderItemQty>{item.quantity}× {formatPrice(item.price)}</OrderItemQty>
            </OrderItem>
          ))}
        </OrderItemsList>

        <OrderTotalLarge>
          <span>Total</span>
          <span>{formatPrice(order.totalPrice)}</span>
        </OrderTotalLarge>
      </OrderDetails>

      <ActionsContainer>
        <Link to={routeHelpers.orderTracking(order._id)}>
          <Button variant="primary" size="lg">
            Track Your Order
          </Button>
        </Link>
        <Link to={ROUTES.ORDERS}>
          <Button variant="outline" size="lg">
            View All Orders
          </Button>
        </Link>
        <Link to={ROUTES.HOME}>
          <Button variant="ghost" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </ActionsContainer>
    </SuccessContainer>
  );
};

export default OrderSuccess;