/**
 * Rating Styles
 * Styled components for Rating component
 */

import styled, { css } from 'styled-components';

// ============================================
// Sizes
// ============================================
const sizeStyles = {
  sm: css`
    font-size: 14px;

    button {
      font-size: 14px;
    }
  `,
  md: css`
    font-size: 20px;

    button {
      font-size: 20px;
    }
  `,
  lg: css`
    font-size: 28px;

    button {
      font-size: 28px;
    }
  `,
};

// ============================================
// Styled Components
// ============================================
export const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;

  ${({ size }) => sizeStyles[size] || sizeStyles.md}
`;

export const StarButton = styled.button`
  background: none;
  border: none;
  padding: 2px;
  cursor: ${({ readonly }) => (readonly ? 'default' : 'pointer')};
  transition: transform var(--transition-fast);
  color: var(--text-muted);
  line-height: 1;

  &:hover {
    transform: ${({ readonly }) => (readonly ? 'none' : 'scale(1.1)')};
  }
`;

export const StarIcon = styled.span`
  color: ${({ active }) =>
    active ? 'var(--warning)' : 'var(--border)'};
  transition: color var(--transition-fast);
`;

export const RatingText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
`;