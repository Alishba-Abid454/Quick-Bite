/**
 * Cart Page
 * Displays cart items, quantities, and totals
 * Users can update quantities, remove items, and proceed to checkout
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import { formatPrice } from '../../helpers/priceHelper';
import { showError, showSuccess } from '../../helpers/notificationHelper';
import { ROUTES } from '../../utils/routes';
import { ShoppingBag } from "lucide-react";
import {
  CartContainer,
  CartHeader,
  CartTitle,
  CartEmpty,
  CartEmptyIcon,
  CartEmptyTitle,
  CartEmptyText,
  CartGrid,
  CartItemsList,
  CartItem,
  CartItemImage,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CartItemQuantity,
  CartItemQuantityBtn,
  CartItemQuantityInput,
  CartItemRemove,
  CartSummary,
  CartSummaryTitle,
  CartSummaryRow,
  CartSummaryTotal,
  CartSummaryLabel,
  CartSummaryValue,
  CartActions,
  ContinueShoppingLink,
} from './Cart.styles';

const Cart = () => {
  const { 
    items, 
    subtotal, 
    deliveryFee, 
    tax, 
    total, 
    itemCount,
    updateQuantity, 
    removeItem, 
    clearCart,
    isEmpty 
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      showSuccess('Item removed from cart');
      return;
    }
    setIsUpdating(true);
    updateQuantity(itemId, newQuantity);
    setIsUpdating(false);
  };

  const handleRemoveItem = (itemId, itemName) => {
    if (window.confirm(`Remove "${itemName}" from cart?`)) {
      removeItem(itemId);
      showSuccess(`${itemName} removed from cart`);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Clear all items from cart?')) {
      clearCart();
      showSuccess('Cart cleared');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      showError('Please login to proceed to checkout');
      navigate(ROUTES.LOGIN);
      return;
    }
    navigate(ROUTES.CHECKOUT);
  };

  if (isEmpty) {
    return (
      <CartContainer>
        <CartEmpty>
          <CartEmptyIcon>
            <ShoppingBag size={38} />
          </CartEmptyIcon>
          <CartEmptyTitle>Your cart is empty</CartEmptyTitle>
          <CartEmptyText>
            Pick a restaurant and add a dish to get started.
          </CartEmptyText>
          <Link to={ROUTES.HOME}>
            <Button>Browse Restaurants</Button>
          </Link>
        </CartEmpty>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <CartTitle>
          Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </CartTitle>
        <button onClick={handleClearCart} style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--danger)',
          fontSize: '14px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          Clear Cart
        </button>
      </CartHeader>

      <CartGrid>
        <CartItemsList>
          {items.map((item) => (
            <CartItem key={item.id}>
              <CartItemImage 
                src={item.image || 'https://via.placeholder.com/80x80'} 
                alt={item.name}
              />
              <CartItemInfo>
                <CartItemName>{item.name}</CartItemName>
                <CartItemPrice>{formatPrice(item.price)}</CartItemPrice>
              </CartItemInfo>
              <CartItemQuantity>
                <CartItemQuantityBtn 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={isUpdating}
                >
                  −
                </CartItemQuantityBtn>
                <CartItemQuantityInput 
                  type="number" 
                  value={item.quantity} 
                  min="1"
                  max="50"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1) {
                      handleQuantityChange(item.id, val);
                    }
                  }}
                  disabled={isUpdating}
                />
                <CartItemQuantityBtn 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  disabled={isUpdating}
                >
                  +
                </CartItemQuantityBtn>
              </CartItemQuantity>
              <CartItemRemove 
                onClick={() => handleRemoveItem(item.id, item.name)}
              >
                ✕
              </CartItemRemove>
            </CartItem>
          ))}
        </CartItemsList>

        <CartSummary>
          <CartSummaryTitle>Order Summary</CartSummaryTitle>
          
          <CartSummaryRow>
            <CartSummaryLabel>Subtotal ({itemCount} items)</CartSummaryLabel>
            <CartSummaryValue>{formatPrice(subtotal)}</CartSummaryValue>
          </CartSummaryRow>
          
          <CartSummaryRow>
            <CartSummaryLabel>Delivery Fee</CartSummaryLabel>
            <CartSummaryValue>
              {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
            </CartSummaryValue>
          </CartSummaryRow>
          
          <CartSummaryRow>
            <CartSummaryLabel>Tax (10%)</CartSummaryLabel>
            <CartSummaryValue>{formatPrice(tax)}</CartSummaryValue>
          </CartSummaryRow>

          <CartSummaryTotal>
            <CartSummaryLabel>Total</CartSummaryLabel>
            <CartSummaryValue>{formatPrice(total)}</CartSummaryValue>
          </CartSummaryTotal>

          <CartActions>
            <Button 
              variant="primary" 
              fullWidth 
              size="lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            <ContinueShoppingLink to={ROUTES.HOME}>
              ← Continue Shopping
            </ContinueShoppingLink>
          </CartActions>
        </CartSummary>
      </CartGrid>
    </CartContainer>
  );
};

export default Cart;