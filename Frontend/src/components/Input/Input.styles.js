/**
 * Input Styles
 * Styled components for Input component
 */

import styled, { css } from 'styled-components';

// Wrapper
export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;

// Label
export const StyledLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
`;

// Base Input Styles
const baseInputStyles = css`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-family: inherit;
  color: var(--text);
  background: #f6f6f6;
  border: 2px solid var(--border);
  border-radius: var(--radius-xl);
  transition: all var(--transition-fast);

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &:disabled {
    background: var(--gray100);
    cursor: not-allowed;
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: var(--danger);

      &:focus {
        border-color: var(--danger);
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
      }
    `}

  ${({ hasIcon, iconPosition }) =>
    hasIcon &&
    css`
      padding-${iconPosition === 'left' ? 'left' : 'right'}: 44px;
    `}
`;

// Input
export const StyledInput = styled.input`
  ${baseInputStyles}
  height: 48px;
`;

// Textarea
export const StyledTextarea = styled.textarea`
  ${baseInputStyles}
  min-height: 100px;
  resize: vertical;
`;

// Error
export const InputError = styled.span`
  display: block;
  font-size: 13px;
  color: var(--danger);
  margin-top: 4px;
`;

// Helper
export const InputHelper = styled.span`
  display: block;
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
`;

// Icon
export const InputIcon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === 'left' ? 'left: 12px;' : 'right: 12px;')}
  color: var(--text-muted);
  font-size: 20px;
  pointer-events: none;

  ${({ position }) =>
    position === 'left'
      ? css`
          left: 12px;
        `
      : css`
          right: 12px;
        `}
`;