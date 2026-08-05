/**
 * AdminMenuCreate Styles
 * Styled components for AdminMenuCreate
 */

import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 800px;
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

export const FormTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid var(--border);
`;