/**
 * AdminOrderDetails Styles
 * Styled components for AdminOrderDetails
 */

import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--card);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: 16px;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
`;

export const OrderId = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
`;

export const OrderStatus = styled.span`
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;

  ${({ status }) => {
    switch (status) {
      case 'delivered':
        return css`
          background: rgba(0, 184, 148, 0.1);
          color: var(--success);
        `;
      case 'cancelled':
        return css`
          background: rgba(225, 112, 85, 0.1);
          color: var(--danger);
        `;
      case 'pending':
        return css`
          background: rgba(253, 203, 110, 0.2);
          color: #f39c12;
        `;
      default:
        return css`
          background: rgba(52, 152, 219, 0.1);
          color: #3498db;
        `;
    }
  }}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      grid-column: 1 / -1;
    `}
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
`;

export const InfoRow = styled.div`
  display: flex;
  padding: 6px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  width: 120px;
  font-size: 13px;
  color: var(--text-muted);
  flex-shrink: 0;
`;

export const InfoValue = styled.span`
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
`;

export const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const ItemRow = styled.tr`
  border-bottom: 1px solid var(--border-light);
`;

export const ItemName = styled.td`
  padding: 8px 0;
  font-size: 14px;
  color: var(--text);
`;

export const ItemQty = styled.td`
  padding: 8px 0;
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
`;

export const ItemPrice = styled.td`
  padding: 8px 0;
  text-align: right;
  font-size: 14px;
  color: var(--text);
`;

export const TotalRow = styled.tr`
  border-top: 1px solid var(--border-light);
`;

export const TotalLabel = styled.td`
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-muted);
`;

export const TotalValue = styled.td`
  padding: 8px 0;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
`;

export const StatusHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

export const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) => (active ? 'var(--primary)' : 'var(--border)')};
  flex-shrink: 0;
`;

export const StatusLabel = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  color: ${({ active }) => (active ? 'var(--text)' : 'var(--text-muted)')};
`;

export const StatusTime = styled.span`
  font-size: 13px;
  color: var(--text-muted);
`;