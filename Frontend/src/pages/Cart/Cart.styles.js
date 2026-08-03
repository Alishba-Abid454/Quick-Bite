/**
 * Cart Styles
 * Styled components for Cart page
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container
export const CartContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 60vh;
`;

// Header
export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
`;

export const CartTitle = styled.h1`
  font-size: 54px;
  font-weight: 700;
`;

// Empty State
export const CartEmpty = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 90px 40px;
  background: #fff;
  border: 1px dashed #e6e6e6;
  border-radius: 32px;
  text-align: center;
`;

export const CartEmptyIcon = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: #fff3ed;
  color: var(--primary);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 38px;
  margin: 0 auto 24px;
`;

export const CartEmptyTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 14px;
`;

export const CartEmptyText = styled.p`
  font-size: 20px;
  color: var(--text-muted);
  margin-bottom: 35px;
`;

// Grid
export const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 48px;

  @media(max-width:1000px){
    grid-template-columns:1fr;
  }
`;

// Cart Items List
export const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Cart Item
export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 170px 120px 40px;
  align-items: center;
  gap: 24px;

  background: white;

  padding: 24px;

  border-radius: 28px;

  box-shadow:
      0 8px 30px rgba(0,0,0,.06);

  margin-bottom:20px;
`;

export const CartItemImage = styled.img`
  width:120px;
  height:120px;
  object-fit:cover;
  border-radius:18px;
`;

export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CartItemName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
`;

export const CartItemPrice = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: var(--primary);
`;

// Quantity Controls
export const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  @media (max-width: 576px) {
    grid-column: 1 / -1;
    justify-content: flex-start;
  }
`;

export const CartItemQuantityBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gray100);
  color: var(--text);
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--primary);
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CartItemQuantityInput = styled.input`
  width: 48px;
  height: 36px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 500;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
`;

// Remove Button
export const CartItemRemove = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  color: var(--text-muted);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--danger);
    color: white;
  }

  @media (max-width: 576px) {
    justify-self: end;
  }
`;

// Cart Summary
export const CartSummary = styled.div`
  padding: 24px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

export const CartSummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
`;

export const CartSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 15px;
  color: var(--text-muted);
`;

export const CartSummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-top: 8px;
  border-top: 2px solid var(--border);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
`;

export const CartSummaryLabel = styled.span``;

export const CartSummaryValue = styled.span`
  font-weight: 600;
`;

// Actions
export const CartActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

export const ContinueShoppingLink = styled(Link)`
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
  text-decoration: none;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--primary);
  }
`;