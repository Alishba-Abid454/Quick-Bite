/**
 * ReviewCard Styles
 * Styled components for ReviewCard
 */

import styled from 'styled-components';

export const Card = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--primary-light);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--gray100);
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
`;

export const ReviewDate = styled.div`
  font-size: 12px;
  color: var(--text-muted);
`;

export const CardBody = styled.div`
  padding: 8px 0 12px;
`;

export const ReviewText = styled.p`
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
`;

export const SubRatings = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const SubRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;

export const SubRatingLabel = styled.span`
  color: var(--text-muted);
`;

export const SubRatingValue = styled.span`
  font-weight: 600;
  color: var(--text);
`;

export const HelpfulButton = styled.button`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--gray100);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--primary);
    color: white;
  }
`;