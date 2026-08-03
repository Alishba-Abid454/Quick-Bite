/**
 * Orders Styles
 * Styled components for Orders page
 */

import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const OrdersContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px 20px;
  min-height: 60vh;
`;

export const OrdersHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const OrdersTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--text);
  padding-bottom: 4px;
`;

export const OrdersSub = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #777;
`;

export const OrdersFilter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text-muted);

  &:hover {
    border-color: var(--primary);
    color: var(--text);
  }

  ${({ active }) =>
    active &&
    css`
      background: var(--primary);
      color: white;
      border-color: var(--primary);

      &:hover {
        background: var(--primary-dark);
        border-color: var(--primary-dark);
      }
    `}
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderCard = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

export const OrderCardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
`;

export const OrderId = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
`;

export const OrderStatus = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ color }) => color || 'var(--text-muted)'};
`;

export const OrderDate = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  margin-left: auto;

  @media (max-width: 576px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const OrderCardBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 0;
`;

export const OrderRestaurant = styled.div`
  flex: 1;
  min-width: 150px;
`;

export const OrderRestaurantName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
`;

export const OrderRestaurantInfo = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
`;

export const OrderItems = styled.div`
  flex: 2;
  min-width: 150px;
`;

export const OrderItem = styled.div`
  font-size: 14px;
  color: var(--text);
  padding: 2px 0;
`;

export const OrderCardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const OrderTotal = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
`;

export const OrderActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const OrderActionBtn = styled(Link)`
  padding: 8px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-fast);
  text-align: center;

  ${({ variant }) =>
    variant === 'outline'
      ? css`
          border: 1px solid var(--border);
          color: var(--text);

          &:hover {
            border-color: var(--primary);
            color: var(--primary);
          }
        `
      : css`
          background: var(--primary);
          color: white;

          &:hover {
            background: var(--primary-dark);
          }
        `}
`;

export const EmptyOrders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 60px 20px;
  margin-top:80px !important;
  border-radius: 28px;
  width: 80%;
  text-align: center;
  margin: 0 auto;
`;

export const EmptyOrdersIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #FCF2EE; /* Light Peach / Orange background box */
  border-radius: 22px; /* Square with rounded corners */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  border: 1px solid #F8E1D8; /* Very subtle border for depth */

  svg {
    width: 22px !important;
    height: 22px !important;
  }
`;

export const EmptyOrdersTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 8px;
`;

export const EmptyOrdersText = styled.p`
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 32px;
  line-height: 1.6;
`;