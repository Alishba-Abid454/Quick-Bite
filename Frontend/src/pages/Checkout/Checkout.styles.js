/**
 * Checkout Styles
 * Styled components for Checkout page
 */

import styled, { css } from 'styled-components';

export const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 60vh;
`;

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const CheckoutSection = styled.div``;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const CheckoutSummary = styled.div`
  padding: 24px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

export const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
`;

export const SummaryItems = styled.div`
  margin-bottom: 16px;
  max-height: 200px;
  overflow-y: auto;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 14px;
  color: var(--text);
  border-bottom: 1px solid var(--border-light);
`;

export const SummaryItemName = styled.span``;

export const SummaryItemPrice = styled.span`
  font-weight: 500;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 15px;
  color: var(--text-muted);
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-top: 8px;
  border-top: 2px solid var(--border);
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
`;

export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PaymentOption = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--card);
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  cursor: pointer;
  transition: all var(--transition-fast);
  width: 100%;

  span {
    font-size: 20px;
  }

  &:hover {
    border-color: var(--primary);
  }

  ${({ active }) =>
    active &&
    css`
      border-color: var(--primary);
      background: rgba(255, 107, 53, 0.05);
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    `}
`;