/**
 * RestaurantInfo Styles
 * Styled components for RestaurantInfo
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  margin-bottom: 40px;
  max-width: 1500px; /* Poore container ki width 1500px kar di */
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px; /* Kinare se thoda gap */
`;

export const BackLink = styled(Link)`
  display: inline-block;
  font-size: 14px;
  color: #666;
  text-decoration: none;
  margin-bottom: 20px;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start; /* Vertically center karein */

  @media (max-width: 968px) {
    grid-template-columns: 1fr; /* Mobile par ek hi column */
    gap: 24px;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CuisineText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #FF6B35;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

export const RestaurantName = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const DescriptionText = styled.p`
  font-size: 16px;
  color: #555;
  margin: 4px 0 8px 0;
  line-height: 1.5;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 4px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
`;

export const StatIcon = styled.span`
  font-size: 16px;
  color: #FF6B35;
`;

export const StatValue = styled.span`
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export const StatLabel = styled.span`
  font-weight: 400;
  color: #777;
  margin-left: 2px;
`;

export const RightColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end; 
`;

export const RestaurantImage = styled.img`
  width: 90%; 
  height: 450px !important;
  max-width: 700px; 
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: block;
  margin: 0 auto; /* Center mein lane ke liye */

  @media (max-width: 968px) {
    max-width: 100%;
    height: 300px;
  }
`;