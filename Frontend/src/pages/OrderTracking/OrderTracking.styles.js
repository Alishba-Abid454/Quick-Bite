/**
 * OrderTracking Styles
 * Styled components for OrderTracking page
 */

import styled, { css } from 'styled-components';

export const TrackingContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 60vh;
`;

export const TrackingHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

export const TrackingTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
`;

export const TrackingSubtitle = styled.div`
  font-size: 16px;
  color: var(--text-muted);
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ status }) => {
    switch (status) {
      case 'delivered':
        return 'var(--success)';
      case 'cancelled':
        return 'var(--danger)';
      case 'pending':
        return 'var(--warning)';
      default:
        return 'var(--primary)';
    }
  }};
  color: white;
`;

export const TimelineContainer = styled.div`
  position: relative;
  padding: 20px 0;
`;

export const TimelineStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  position: relative;
`;

export const TimelineIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: ${({ active, completed }) =>
    active ? 'var(--primary)' : completed ? 'var(--success)' : 'var(--border)'};
  color: white;
  flex-shrink: 0;
  z-index: 1;
  transition: all var(--transition-normal);

  ${({ active }) =>
    active &&
    css`
      box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.2);
      transform: scale(1.1);
    `}
`;

export const TimelineContent = styled.div`
  flex: 1;
  padding-top: 4px;
`;

export const TimelineTitle = styled.div`
  font-size: 16px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  color: ${({ active }) => (active ? 'var(--text)' : 'var(--text-muted)')};
`;

export const TimelineTime = styled.div`
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
`;

export const TimelineConnector = styled.div`
  position: absolute;
  left: 19px;
  top: 52px;
  width: 2px;
  height: 32px;
  background: ${({ active }) => (active ? 'var(--primary)' : 'var(--border)')};
`;

export const OrderInfo = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-top: 32px;
`;

export const OrderInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const OrderInfoItem = styled.div``;

export const OrderInfoLabel = styled.div`
  font-size: 13px;
  color: var(--text-muted);
`;

export const OrderInfoValue = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: var(--text);
  margin-top: 2px;
`;

export const DeliveryPerson = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin-top: 16px;
`;

export const DeliveryPersonAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  flex-shrink: 0;
`;

export const DeliveryPersonInfo = styled.div``;

export const DeliveryPersonName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
`;

export const DeliveryPersonPhone = styled.div`
  font-size: 14px;
  color: var(--text-muted);
`;

export const DeliveryPersonVehicle = styled.div`
  font-size: 14px;
  color: var(--text-muted);
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
  justify-content: center;
`;

export const ActionButton = styled.button`
  padding: 10px 24px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;

  ${({ variant }) => {
    if (variant === 'danger') {
      return css`
        background: var(--danger);
        color: white;
        border: none;

        &:hover {
          background: #c0392b;
        }
      `;
    }
    if (variant === 'outline') {
      return css`
        background: var(--card);
        color: var(--text);
        border: 1px solid var(--border);

        &:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
      `;
    }
    return css`
      background: var(--primary);
      color: white;
      border: none;

      &:hover {
        background: var(--primary-dark);
      }
    `;
  }}
`;