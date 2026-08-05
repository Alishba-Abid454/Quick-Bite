/**
 * AdminReviews Styles
 * Styled components for AdminReviews
 */

import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 20px 60px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
`;

export const TableContainer = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
  background: var(--gray100);
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text);
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border: 1px solid #ddd;
  border-radius: 30px;
  background: white;
  cursor: pointer;
  transition: .3s;
  font-size: 15px;
  font-weight: 500;

  &:hover{
    transform: translateY(-2px);
  }

  ${({ variant }) =>
    variant === "hide" &&
    css`
      color: #444;

      &:hover{
        background:#f5f5f5;
      }
    `}

  ${({ variant }) =>
    variant === "delete" &&
    css`
      width:44px;
      height:44px;
      justify-content:center;
      padding:0;

      color:#dc2626;

      &:hover{
        background:#dc2626;
        color:white;
      }
    `}
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);

  p {
    font-size: 16px;
  }
`;

export const RatingBadge = styled.span`
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;

  ${({ rating }) => {
    if (rating >= 4) {
      return css`
        background: rgba(0, 184, 148, 0.1);
        color: var(--success);
      `;
    }
    if (rating >= 3) {
      return css`
        background: rgba(253, 203, 110, 0.2);
        color: #f39c12;
      `;
    }
    return css`
      background: rgba(225, 112, 85, 0.1);
      color: var(--danger);
    `;
  }}
`;

export const CommentText = styled.div`
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: var(--text);
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SelectFilter = styled.select`
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 14px;
  background: var(--card);
  min-width: 160px;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  @media (max-width: 576px) {
    min-width: 100%;
  }
`;

export const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 1250px;
`;

export const ReviewCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
`;

export const ReviewLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3{
    font-size:28px;
    font-weight:700;
  }

  p{
    font-size:17px;
    color:#555;
  }

  small{
    color:#888;
  }
`;

export const Rating = styled.div`
  color:#ff7a00;
  font-size:18px;
  font-weight:bold;
`;

export const ReviewRight = styled.div`
  display:flex;
  gap:10px;
`;