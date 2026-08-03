/**
 * MenuItemCard Styles
 * Styled components for MenuItemCard
 */

import styled from 'styled-components';

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 16px; /* Rounded corners like the screenshot */
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); /* Subtle, soft shadow */

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
`;

export const CardContent = styled.div`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px; /* Slight space between lines */
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

export const CardTitle = styled.h4`
  font-size: 17px;
  font-weight: 600;
  color: #222;
  margin: 0;
  line-height: 1.2;
`;

export const AddButton = styled.button`
  background: #f06b3e; /* The exact orange color from your screenshot */
  color: white;
  border: none;
  padding: 5px 16px;
  border-radius: 999px; /* Pill shape */
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  line-height: 1.4;

  &:hover:not(:disabled) {
    background: #d85a30; /* Slightly darker orange on hover */
    transform: scale(1.02);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #666; /* Muted gray text */
  margin: 0;
  line-height: 1.5;
`;

export const CardPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-top: 4px;
`;