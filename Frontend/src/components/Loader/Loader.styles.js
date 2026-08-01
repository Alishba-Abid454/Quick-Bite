/**
 * Loader Styles
 * Styled components for Loader component
 */

import styled, { css, keyframes } from 'styled-components';

// Animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Sizes
const sizeStyles = {
  sm: css`
    width: 24px;
    height: 24px;
    border-width: 3px;
  `,
  md: css`
    width: 40px;
    height: 40px;
    border-width: 4px;
  `,
  lg: css`
    width: 56px;
    height: 56px;
    border-width: 5px;
  `,
};

// Styled Components
export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  ${({ fullScreen }) =>
    fullScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(4px);
      z-index: 9999;
    `}
`;

export const LoaderSpinner = styled.div`
  border-radius: 50%;
  border-style: solid;
  border-color: var(--border);
  border-top-color: var(--primary);
  animation: ${spin} 0.8s linear infinite;

  ${({ size }) => sizeStyles[size] || sizeStyles.md}
`;

export const LoaderText = styled.p`
  color: var(--text-muted);
  font-size: 14px;
`;