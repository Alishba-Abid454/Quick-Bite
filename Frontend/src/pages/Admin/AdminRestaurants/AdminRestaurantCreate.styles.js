/**
 * AdminRestaurantCreate Styles
 * Styled components for AdminRestaurantCreate
 */

import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width:900px;
  margin:auto;
  padding:25px 0;

`;

export const BackLink = styled.button`
  background:none;
  border:none;
  cursor:pointer;
  font-size:18px;
  color:#475569;
  margin-bottom:22px;
`;

export const FormCard = styled.div`
  background:white;
  padding:40px;
  border-radius:30px;
  box-shadow:0 12px 30px rgba(0,0,0,.08);
  margin-top:30px;
`;

export const FormTitle = styled.h1`
  font-size:40px;
  font-weight:600;
  margin-bottom:30px;
`;

export const SaveButton = styled.button`
  margin-top:30px;
  background:#ff6b35;
  color:white;
  border:none;
  padding:10px 30px;
  border-radius:999px;
  font-size:18px;
  font-weight:600;
  cursor:pointer;
  width:200px;
  transition:.3s;

  &:hover{
      background:#f55a22;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

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
  justify-content: start;
  padding-top: 16px;
  border-top: 1px solid var(--border);
`;