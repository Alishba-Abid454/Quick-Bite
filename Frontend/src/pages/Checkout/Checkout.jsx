/**
 * Checkout Page
 * User confirms order, selects address and payment method
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { formatPrice } from '../../helpers/priceHelper';
import { showError, showSuccess, showLoading, updateToast } from '../../helpers/notificationHelper';
import { ROUTES } from '../../utils/routes';
import {
  CheckoutContainer,
  CheckoutGrid,
  CheckoutForm,
  CheckoutSection,
  SectionTitle,
  FormGroup,
  CheckoutSummary,
  SummaryTitle,
  SummaryRow,
  SummaryTotal,
  PaymentOptions,
  PaymentOption,
  SummaryItems,
  SummaryItem,
  SummaryItemName,
  SummaryItemPrice,
} from './Checkout.styles';

const Checkout = () => {
  const { items, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
    phone: user?.phone || '',
    paymentMethod: 'cash_on_delivery',
    notes: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If cart is empty, redirect to home
    if (items.length === 0) {
      navigate(ROUTES.HOME);
    }
  }, [items, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.address || !formData.city || !formData.phone) {
      showError('Please fill in all required fields');
      return;
    }

    const toastId = showLoading('Placing your order...');

    try {
      setLoading(true);

      const orderData = {
        restaurantId: items[0]?.restaurantId,
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || '',
        })),
        deliveryAddress: {
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        deliveryPhone: formData.phone,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      };

      const result = await placeOrder(orderData);

      if (result.success) {
        updateToast(toastId, 'Order placed successfully!', 'success');
        clearCart();
        navigate(`${ROUTES.ORDER_SUCCESS}/${result.order.orderId}`);
      } else {
        updateToast(toastId, result.error || 'Failed to place order', 'error');
      }
    } catch (error) {
      updateToast(toastId, error.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutGrid>
        {/* Form */}
        <CheckoutForm onSubmit={handleSubmit}>
          <CheckoutSection>
            <SectionTitle>Delivery Information</SectionTitle>

            <FormGroup>
              <Input
                label="Street Address *"
                name="address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="City *"
                name="city"
                placeholder="Lahore"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="ZIP Code"
                name="zipCode"
                placeholder="54000"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Phone Number *"
                name="phone"
                type="tel"
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </CheckoutSection>

          <CheckoutSection>
            <SectionTitle>Payment Method</SectionTitle>

            <PaymentOptions>
              <PaymentOption
                active={formData.paymentMethod === 'cash_on_delivery'}
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'cash_on_delivery' }))}
              >
                <span>💵</span>
                Cash on Delivery
              </PaymentOption>
              <PaymentOption
                active={formData.paymentMethod === 'card'}
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
              >
                <span>💳</span>
                Card Payment
              </PaymentOption>
              <PaymentOption
                active={formData.paymentMethod === 'online_banking'}
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'online_banking' }))}
              >
                <span>🏦</span>
                Online Banking
              </PaymentOption>
            </PaymentOptions>
          </CheckoutSection>

          <CheckoutSection>
            <SectionTitle>Special Instructions</SectionTitle>
            <FormGroup>
              <Input
                label="Notes (optional)"
                name="notes"
                placeholder="Ring doorbell twice, leave at reception, etc."
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </FormGroup>
          </CheckoutSection>

          <Button type="submit" fullWidth size="lg" loading={loading}>
            Place Order
          </Button>
        </CheckoutForm>

        {/* Summary */}
        <CheckoutSummary>
          <SummaryTitle>Order Summary</SummaryTitle>

          <SummaryItems>
            {items.map((item) => (
              <SummaryItem key={item.id}>
                <SummaryItemName>
                  {item.name} × {item.quantity}
                </SummaryItemName>
                <SummaryItemPrice>{formatPrice(item.price * item.quantity)}</SummaryItemPrice>
              </SummaryItem>
            ))}
          </SummaryItems>

          <SummaryRow>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </SummaryRow>

          <SummaryRow>
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
          </SummaryRow>

          <SummaryRow>
            <span>Tax (10%)</span>
            <span>{formatPrice(tax)}</span>
          </SummaryRow>

          <SummaryTotal>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </SummaryTotal>
        </CheckoutSummary>
      </CheckoutGrid>
    </CheckoutContainer>
  );
};

export default Checkout;