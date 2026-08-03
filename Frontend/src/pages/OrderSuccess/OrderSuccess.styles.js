/**
 * OrderSuccess Styles
 * Styled components for OrderSuccess page
 */

import styled from 'styled-components';

export const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
`;

export const SuccessTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
`;

export const SuccessSubtitle = styled.p`
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 32px;
  line-height: 1.6;
`;

export const OrderDetails = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: left;
  margin-bottom: 32px;
`;

export const OrderDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

export const OrderDetailLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
`;

export const OrderDetailValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  text-align: right;
`;

export const OrderItemsList = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 14px;
`;

export const OrderItemName = styled.span`
  color: var(--text);
`;

export const OrderItemQty = styled.span`
  color: var(--text-muted);
`;

export const OrderTotalLarge = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  border-top: 2px solid var(--border);
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;