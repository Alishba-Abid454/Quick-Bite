/**
 * Button Styles
 * Styled components for Button component
 */

import styled, { css, keyframes } from 'styled-components';
//keyframes --- Creates CSS animations
//css --- Helper for CSS template literals

// Animations
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Variants
const variantStyles = {
  primary: css`
    background: var(--primary);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
  `,

  secondary: css`
    background: var(--secondary);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: var(--text);
      transform: translateY(-2px);
    }
  `,

  outline: css`
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);

    &:hover:not(:disabled) {
      background: var(--primary);
      color: white;
      transform: translateY(-2px);
    }
  `,

  ghost: css`
    background: transparent;
    color: var(--text);
    border: none;

    &:hover:not(:disabled) {
      background: var(--gray100);
    }
  `,

  danger: css`
    background: var(--danger);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #c0392b;
      transform: translateY(-2px);
    }
  `,

  success: css`
    background: var(--success);
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: #27ae60;
      transform: translateY(-2px);
    }
  `,
};

// Sizes
const sizeStyles = {
  sm: css`
    padding: 8px 16px;
    font-size: 14px;
  border-radius: 999px;
  `,
  md: css`
    padding: 12px 24px;
    font-size: 16px;
  border-radius: 999px;
  `,
  lg: css`
    padding: 16px 32px;
    font-size: 18px;
    border-radius: 999px;
  `,
};

// Styled Components
export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all var(--transition-normal);
  cursor: pointer;
  position: relative;
  
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  min-height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '36px';
      case 'lg':
        return '56px';
      default:
        return '44px';
    }
  }};

  ${({ variant }) => variantStyles[variant] || variantStyles.primary}
  ${({ size }) => sizeStyles[size] || sizeStyles.md}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 1.2em;
  order: ${({ position }) => (position === 'right' ? 1 : -1)};
`;

export const ButtonSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;