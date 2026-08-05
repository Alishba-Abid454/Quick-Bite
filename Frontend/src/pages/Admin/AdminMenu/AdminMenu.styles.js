/**
 * AdminMenu Styles
 * Styled components for AdminMenu
 */

import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 20px 0;
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
  margin-bottom: 8px;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 14px;
  min-width: 200px;
  background: var(--card);

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  @media (max-width: 576px) {
    min-width: 100%;
  }
`;

export const TableContainer = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
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

  ${({ available }) =>
    available
      ? css`
          background: rgba(0, 184, 148, 0.1);
          color: var(--success);
        `
      : css`
          background: rgba(225, 112, 85, 0.1);
          color: var(--danger);
        `}
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 14px;

  ${({ variant }) => {
    if (variant === 'edit') {
      return css`
        background: rgba(52, 152, 219, 0.1);
        color: #3498db;

        &:hover {
          background: #3498db;
          color: white;
        }
      `;
    }
    if (variant === 'activate') {
      return css`
        background: rgba(46, 204, 113, 0.1);
        color: #2ecc71;

        &:hover {
          background: #2ecc71;
          color: white;
        }
      `;
    }
    if (variant === 'deactivate') {
      return css`
        background: rgba(241, 196, 15, 0.1);
        color: #f1c40f;

        &:hover {
          background: #f1c40f;
          color: white;
        }
      `;
    }
    if (variant === 'delete') {
      return css`
        background: rgba(231, 76, 60, 0.1);
        color: #e74c3c;

        &:hover:not(:disabled) {
          background: #e74c3c;
          color: white;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;
    }
    return '';
  }}
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;