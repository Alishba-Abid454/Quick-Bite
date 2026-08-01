/**
 * Input Component
 * Reusable input with label, error, and icon support
 */

import React, { forwardRef } from 'react';
//forwardRef --- Allows parent components to pass refs to this input
import {
  InputWrapper,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  InputError,
  InputIcon,
  InputHelper,
} from './Input.styles';

const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      name,
      value,
      onChange,
      onBlur,
      placeholder,
      error,
      helper,
      icon,
      iconPosition = 'left',
      required = false,
      disabled = false,
      className = '',
      multiline = false,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputId = `input-${name}-${Math.random().toString(36).substr(2, 9)}`;

    const InputComponent = multiline ? StyledTextarea : StyledInput;

    return (
      <InputWrapper className={className}>
        {label && (    //Only render if label exists
          <StyledLabel htmlFor={inputId}>
            {label}
            {required && <span style={{ color: 'var(--danger)' }}> *</span>}
          </StyledLabel>
        )}

        <InputIcon position={iconPosition}>{icon}</InputIcon>

        <InputComponent
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          hasError={!!error}
          hasIcon={!!icon}
          iconPosition={iconPosition}
          rows={rows}
          {...props}
        />

        {helper && <InputHelper>{helper}</InputHelper>}
        {error && <InputError>{error}</InputError>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;