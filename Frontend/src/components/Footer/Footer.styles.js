/**
 * Footer Styles
 * Styled components for Footer component
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background: var(--gray100);
  border-top: 1px solid #eadede;
  margin-top: 40px;
`;

export const FooterInner = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 20px 20px;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FooterTitle = styled.h4`
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 8px;
`;

export const FooterLink = styled(Link)`
  color: var(--text-muted);
  font-size: 17px;
  text-decoration: none;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--primary);
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  font-size: 17px;
  color: var(--text-muted);

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
  }
`;

