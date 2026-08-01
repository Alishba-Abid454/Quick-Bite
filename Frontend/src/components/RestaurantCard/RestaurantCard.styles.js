/**
 * RestaurantCard Styles
 * Styled components for RestaurantCard component
 */

import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--gray100);
`;

export const CardBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--danger);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
`;

export const CardContent = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  flex: 1;
`;

export const CardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;

  span {
    color: var(--text-muted);
    font-weight: 400;
    font-size: 12px;
  }
`;

export const CardSubtitle = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  margin: 4px 0 12px;
`;

export const CardMeta = styled.div`
  display: flex;
  gap: 16px;
  margin: 8px 0 12px;
  flex-wrap: wrap;
`;

export const CardMetaItem = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CardFooter = styled.div`
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  font-weight: 500;
  color: var(--success);
`;