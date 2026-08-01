/**
 * NotFound Styles
 * Styled components for NotFound page
 */

import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 40px 20px;
`;

export const NotFoundContent = styled.div`
  text-align: center;
  max-width: 480px;
`;

export const NotFoundCode = styled.h1`
  font-size: 80px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 8px;

  @media (max-width: 576px) {
    font-size: 60px;
  }
`;

export const NotFoundTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 12px;
`;

export const NotFoundDescription = styled.p`
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 32px;
  line-height: 1.6;
`;