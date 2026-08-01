/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */

import React from 'react';
import {
  StyledButton,
  ButtonContent,
  ButtonIcon,
  ButtonSpinner,
} from './Button.styles';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      {...props}
    >
      <ButtonContent>
        {loading && <ButtonSpinner />}
        {!loading && icon && iconPosition === 'left' && (
          <ButtonIcon position="left">{icon}</ButtonIcon>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <ButtonIcon position="right">{icon}</ButtonIcon>
        )}
      </ButtonContent>
    </StyledButton>
  );
};

export default Button;