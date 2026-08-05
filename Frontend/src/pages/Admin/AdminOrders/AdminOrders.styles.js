/**
 * AdminOrders Styles
 * Styled components for AdminOrders
 */

import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 20px 60px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: var(--text);
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterButton = styled.button`
  padding: 6px 20px;
  border-radius: 999px;
  border: 1px solid #E2E8F0;
  background: white;
  color: #1E293B;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all .25s ease;

  &:hover {
    border-color: #FF6B35;
    color: #FF6B35;
  }

  ${({ active }) =>
    active &&
    css`
      background: #FF6B35;
      border-color: #FF6B35;
      color: white;

      &:hover {
        background: #FF6B35;
        color: white;
      }
    `}
`;

export const TableContainer = styled.div`
  background: white;
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
  background: var(--gray100);
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text);
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
`;

export const StatusBadge = styled.span`
  padding: 2px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ color }) => `${color}20` || 'rgba(99, 110, 114, 0.1)'};
  color: ${({ color }) => color || 'var(--text-muted)'};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const ActionButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 14px;

  ${({ variant }) => {
    if (variant === 'view') {
      return css`
        background: rgba(52, 152, 219, 0.1);
        color: #3498db;

        &:hover {
          background: #3498db;
          color: white;
        }
      `;
    }
    return '';
  }}
`;

export const EmptyState = styled.div`
  text-align: flex-start;
  padding: 20px 20px;
  color: var(--text-muted);
  background: white;
  border-radius: 22px;
  width: 1250px;

  p {
    font-size: 16px;
  }
`;