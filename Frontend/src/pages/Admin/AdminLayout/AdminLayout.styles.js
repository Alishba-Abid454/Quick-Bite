/**
 * AdminLayout Styles
 * Styled components for AdminLayout
 */

import styled from 'styled-components';

export const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--background);
`;

export const AdminMain = styled.div`
  flex: 1;
  margin-left: 50px;
  padding: 24px;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

export const AdminContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;