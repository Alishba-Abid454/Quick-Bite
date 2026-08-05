// src/pages/Admin/AdminUsers/AdminUserEdit.styles.js
import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export const BackLink = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 15px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;

  &:hover {
    color: #1f2937;
  }
`;

export const FormTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 24px 0;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 22px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${({ fullWidth }) => 
    fullWidth ? "1fr" : "1fr 1fr"};
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${({ fullWidth }) => fullWidth && `
    grid-column: 1 / -1;
  `}
`;

export const FormLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: "▼";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    font-size: 12px;
    pointer-events: none;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: #1f2937;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  margin-top: 8px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;